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
    (import.meta as any).env?.VITE_PONDER_SQL || "https://doppler-zora-multichain.marble.live/sql"
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

      // const cutoff = mostRecentMinuteIdResult - 86400;

      // const percentChangeExpr = sql`
      //   ((c.close - o.open)::double precision) / NULLIF(o.open, 0)::double precision
      // `;

      // const pools = await db
      //   .select({
      //     pool: sql`agg.pool`,
      //     chainId: sql`agg.chainId`,
      //     percentChangeUsd: percentChangeExpr.as("percentChange"),
      //     volumeUsd: sql`agg.volume_24h`.as("volume"),
      //     dollarLiquidity: schema.pool.dollarLiquidity,
      //     marketCapUsd: schema.pool.marketCapUsd,
      //     holderCount: schema.pool.holderCount,
      //     baseTokenName: schema.token.name,
      //     baseTokenSymbol: schema.token.symbol,
      //     createdAt: schema.pool.createdAt,
      //     open: sql`o.open`,
      //     close: sql`c.close`,
      //     openTimestamp: sql`agg.openMinuteId`,
      //     closeTimestamp: sql`agg.closeMinuteId`,
      //   })
      //   .from(sql`
      //     (
      //       SELECT
      //         ${schema.fifteenMinuteBucketUsd.pool}   AS pool,
      //         ${schema.fifteenMinuteBucketUsd.chainId} AS chainId,
      //         MIN(${schema.fifteenMinuteBucketUsd.minuteId}) AS openMinuteId,
      //         MAX(${schema.fifteenMinuteBucketUsd.minuteId}) AS closeMinuteId,
      //         SUM(${schema.fifteenMinuteBucketUsd.volumeUsd}) AS volume_24h
      //       FROM ${schema.fifteenMinuteBucketUsd}
      //       INNER JOIN ${schema.pool}
      //         ON ${schema.pool.address} = ${schema.fifteenMinuteBucketUsd.pool}
      //        AND ${schema.pool.chainId} = ${schema.fifteenMinuteBucketUsd.chainId}
      //       WHERE ${schema.fifteenMinuteBucketUsd.minuteId} > ${cutoff}
      //         AND ${schema.fifteenMinuteBucketUsd.volumeUsd} > 0
      //         AND ${schema.pool.type} = 'zora'
      //       GROUP BY ${schema.fifteenMinuteBucketUsd.pool}, ${schema.fifteenMinuteBucketUsd.chainId}
      //     ) agg
      //   `)
      //   // Point lookups for the two boundary rows (fast via PK on (address, minuteId, chainId))
      //   .innerJoin(
      //     sql`${schema.fifteenMinuteBucketUsd} o`,
      //     sql`${schema.fifteenMinuteBucketUsd.pool} = agg.pool AND ${schema.fifteenMinuteBucketUsd.chainId} = agg.chainId AND ${schema.fifteenMinuteBucketUsd.minuteId} = agg.openMinuteId`
      //   )
      //   .innerJoin(
      //     sql`${schema.fifteenMinuteBucketUsd} c`,
      //     sql`${schema.fifteenMinuteBucketUsd.pool} = agg.pool AND ${schema.fifteenMinuteBucketUsd.chainId} = agg.chainId AND ${schema.fifteenMinuteBucketUsd.minuteId} = agg.closeMinuteId`
      //   )
      //   .innerJoin(schema.pool, sql`${schema.pool.address} = agg.pool AND ${schema.pool.chainId} = agg.chainId`)
      //   .innerJoin(schema.token, sql`${schema.token.address} = ${schema.pool.baseToken}`)
      //   .where(sql`(agg.closeMinuteId - agg.openMinuteId) BETWEEN 0 AND 86400`)
      //   .orderBy(
      //     sortBy === "percentChangeUsd"
      //       ? sql`"percentChange" DESC`
      //       : sql`agg.volume_24h DESC`
      //   )
      //   .limit(25);

      const cutoff = mostRecentMinuteIdResult - 86400;
      const percentChangeExpr = sql`((cur.close - ref.open)::double precision) / NULLIF(ref.open, 0)::double precision`;

      const pools = await db
        .select({
          pool: sql`cur.pool`,
          chainId: sql`cur.chainId`,
          percentChangeUsd: percentChangeExpr.as("percentChange"),
          volumeUsd: sql`COALESCE(vol.volume_24h, 0)`.as("volume"),
          dollarLiquidity: schema.pool.dollarLiquidity,
          marketCapUsd: schema.pool.marketCapUsd,
          holderCount: schema.pool.holderCount,
          baseTokenName: schema.token.name,
          baseTokenSymbol: schema.token.symbol,
          createdAt: schema.pool.createdAt,
          baseTokenAddress: schema.pool.baseToken,
          open: sql`ref.open`,
          close: sql`cur.close`,
          openTimestamp: sql`ref.openMinuteId`,
          closeTimestamp: sql`cur.closeMinuteId`,
        })
        .from(sql`
          (
            SELECT DISTINCT ON (${schema.fifteenMinuteBucketUsd.pool}, ${schema.fifteenMinuteBucketUsd.chainId})
              ${schema.fifteenMinuteBucketUsd.pool} AS pool,
              ${schema.fifteenMinuteBucketUsd.chainId} AS chainId,
              ${schema.fifteenMinuteBucketUsd.minuteId} AS closeMinuteId,
              ${schema.fifteenMinuteBucketUsd.close} AS close
            FROM ${schema.fifteenMinuteBucketUsd}
            WHERE ${schema.fifteenMinuteBucketUsd.minuteId} > ${cutoff} AND ${schema.fifteenMinuteBucketUsd.volumeUsd} > 0
            ORDER BY ${schema.fifteenMinuteBucketUsd.pool}, ${schema.fifteenMinuteBucketUsd.chainId}, ${schema.fifteenMinuteBucketUsd.minuteId} DESC
          ) cur
        `)
        .innerJoin(
          sql`
            (
              SELECT DISTINCT ON (${schema.fifteenMinuteBucketUsd.pool}, ${schema.fifteenMinuteBucketUsd.chainId})
                ${schema.fifteenMinuteBucketUsd.pool} AS pool,
                ${schema.fifteenMinuteBucketUsd.chainId} AS chainId,
                ${schema.fifteenMinuteBucketUsd.minuteId} AS openMinuteId,
                ${schema.fifteenMinuteBucketUsd.open} AS open
              FROM ${schema.fifteenMinuteBucketUsd}
              WHERE ${schema.fifteenMinuteBucketUsd.minuteId} > ${cutoff} AND ${schema.fifteenMinuteBucketUsd.volumeUsd} > 0
              ORDER BY ${schema.fifteenMinuteBucketUsd.pool}, ${schema.fifteenMinuteBucketUsd.chainId}, ${schema.fifteenMinuteBucketUsd.minuteId} ASC
            ) ref
          `,
          sql`cur.pool = ref.pool AND cur.chainId = ref.chainId`
        )
        .innerJoin(
          sql`
            (
              SELECT
                ${schema.fifteenMinuteBucketUsd.pool} AS pool,
                ${schema.fifteenMinuteBucketUsd.chainId} AS chainId,
                SUM(${schema.fifteenMinuteBucketUsd.volumeUsd}) AS volume_24h
              FROM ${schema.fifteenMinuteBucketUsd}
              WHERE ${schema.fifteenMinuteBucketUsd.minuteId} > ${cutoff} AND ${schema.fifteenMinuteBucketUsd.volumeUsd} > 0
              GROUP BY ${schema.fifteenMinuteBucketUsd.pool}, ${schema.fifteenMinuteBucketUsd.chainId}
            ) vol
          `,
          sql`vol.pool = cur.pool AND vol.chainId = cur.chainId`
        )
        .innerJoin(schema.pool, sql`cur.pool = ${schema.pool.address} AND cur.chainId = ${schema.pool.chainId}`)
        .innerJoin(schema.token, sql`${schema.token.address} = ${schema.pool.baseToken}`)
        .where(sql`
          ${percentChangeExpr} > 0
          AND ${schema.pool.type} = 'zora'`
        )
        .orderBy(sql`${percentChangeExpr} DESC`)
        .limit(25);

        console.log("pools", pools);



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
                          {(changeValue * 100).toFixed(2)}%
                        </td>
                        <td className="text-right p-4">{Number(pool.createdAt)}</td>
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
