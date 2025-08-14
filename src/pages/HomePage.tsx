import { Link } from "react-router-dom";
import TokenName from "../components/TokenName";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createClient, eq, gt, sql, sum } from "@ponder/client";
import * as schema from "../ponder.schema";
import { formatEther } from "viem";

function HomePage() {
  const client = createClient(
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (import.meta as any).env?.VITE_PONDER_SQL || "https://add-15-min-ohlc-buckets-doppler-sdk-s1ck.marble.live/sql"
  );

  const [sortBy, setSortBy] = useState<"percentChangeUsd" | "volumeUsd">(
    "percentChangeUsd"
  );
  
  const { data: topPools, isLoading: isPoolsLoading } = useQuery({
    queryKey: ["ponder", "top-pools-24h", sortBy],
    queryFn: async () => {
      const db: any = (client as any).db;

      const mostRecentMinuteId = await db.select({
        minuteId: schema.fifteenMinuteBucketUsd.minuteId,
      }).from(schema.fifteenMinuteBucketUsd as any)
      .orderBy((schema.fifteenMinuteBucketUsd as any).minuteId, "desc")
      .limit(1);

      const mostRecentMinuteIdResult = mostRecentMinuteId?.[0]?.minuteId;

      const pools = await db
        .select({
          pool: schema.fifteenMinuteBucketUsd.pool,
          volumeUsd: sql`SUM(${schema.fifteenMinuteBucketUsd.volumeUsd})`.as("volume"),
          chainId: schema.fifteenMinuteBucketUsd.chainId,
          dollarLiquidity: schema.pool.dollarLiquidity,
          marketCapUsd: schema.pool.marketCapUsd,
          holderCount: schema.pool.holderCount,
          baseTokenName: schema.token.name,
          baseTokenSymbol: schema.token.symbol,
        })
        .from(schema.fifteenMinuteBucketUsd)
        .where(sql`${schema.fifteenMinuteBucketUsd.minuteId} > ${mostRecentMinuteIdResult - 86400}`)
        .innerJoin(
          schema.pool,
          sql`${schema.fifteenMinuteBucketUsd.pool} = ${schema.pool.address} AND ${schema.fifteenMinuteBucketUsd.chainId} = ${schema.pool.chainId}`
        )
        .innerJoin(
          schema.token,
          sql`${schema.token.address} = ${schema.pool.baseToken}`
        )
        .groupBy(
          schema.fifteenMinuteBucketUsd.pool,
          schema.fifteenMinuteBucketUsd.chainId,
          schema.pool.dollarLiquidity,
          schema.pool.marketCapUsd,
          schema.pool.holderCount,
          schema.token.name,
          schema.token.symbol,
        )
        .orderBy(sql`volume desc`)
        .limit(25);

      // const pools = await db
      //   .select({
      //     address: schema.pool.address,
      //     chainId: schema.pool.chainId,
      //     marketCapUsd: schema.pool.marketCapUsd,
      //     dollarLiquidity: schema.pool.dollarLiquidity,
      //     holderCount: schema.pool.holderCount,
      //     baseToken: schema.pool.baseToken,
      //     type: schema.pool.type,
      //     baseTokenName: schema.token.name,
      //     baseTokenSymbol: schema.token.symbol,
      //   })
      //   .from(schema.pool)
      //   .orderBy(sql`${schema.pool.marketCapUsd} desc`)
      //   .where(sql`${schema.pool.marketCapUsd} > 0 AND ${schema.pool.holderCount} > 100 AND ${schema.pool.type} = 'zora'`)
      //   .innerJoin(schema.token, sql`${schema.token.address} = ${schema.pool.baseToken}`)
      //   .limit(25);

        console.log(pools);

        return pools;
    }
  });

  const pools = topPools;

  return (
    <div className="home-page p-6 max-w-6xl mx-auto">
      <div className="doppler-actions">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Explore</h2>
          <Separator />

          {isPoolsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (pools?.length || 0) === 0 ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <p className="text-muted-foreground">No markets found</p>
              <Button asChild>
                <Link to="/create">Create New Market</Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4">Token</th>
                    <th className="text-right p-4">Mcap</th>
                    <th
                      className={`text-right p-4 cursor-pointer ${sortBy === "percentChangeUsd" ? "underline" : ""}`}
                      onClick={() => setSortBy("percentChangeUsd")}
                    >
                      24H
                    </th>
                    <th className="text-right p-4">Age</th>
                    <th className="text-right p-4">Holders</th>
                    <th
                      className={`text-right p-4 cursor-pointer ${sortBy === "volumeUsd" ? "underline" : ""}`}
                      onClick={() => setSortBy("volumeUsd")}
                    >
                      Volume
                    </th>
                    <th className="text-right p-4">Liquidity</th>
                    <th className="text-right p-4">Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {pools?.map((pool) => {
                    const changeValue = Number.isFinite(pool.percentChangeUsd)
                      ? pool.percentChangeUsd
                      : 0;
                    const isPositive = changeValue >= 0;
                    return (
                      <tr
                        key={pool?.baseToken?.address || pool.address}
                        className="border-t"
                      >
                        <td className="p-4">
                          <Link
                            to={`/doppler/${pool?.baseToken?.address || pool.address}`}
                            className="block hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <TokenName
                                name={pool?.baseTokenName || ""}
                                symbol={pool?.baseTokenSymbol || ""}
                                showSymbol={false}
                              />
                              <div>
                                <div className="font-medium">
                                  {pool?.baseToken?.symbol || ""}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {pool?.baseToken?.name || ""}
                                </div>
                              </div>
                            </div>
                            <Progress
                              value={60}
                              className="h-1.5 mt-2 w-[200px]"
                            />
                          </Link>
                        </td>
                        <td className="text-right p-4">${Number(formatEther(pool.marketCapUsd)).toFixed(2)}</td>
                        <td className={`text-right p-4 ${isPositive ? "text-green-500" : "text-red-500"}`}>
                          {changeValue.toFixed(2)}%
                        </td>
                        <td className="text-right p-4">2 days</td>
                        <td className="text-right p-4">{pool.holderCount}</td>
                        <td className="text-right p-4">${Number(formatEther(pool.volumeUsd ?? 0n)).toFixed(2)}</td>
                        <td className="text-right p-4">${Number(formatEther(pool.dollarLiquidity)).toFixed(2)}</td>
                        <td className="text-right p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            // onClick={() => setSidebarOpen(true)}
                          >
                            Trade
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

function formatCount(value: number | undefined): string {
  if (!value) return "0";
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
}
