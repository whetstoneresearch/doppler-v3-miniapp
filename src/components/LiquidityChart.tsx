import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { formatEther } from "viem";

interface Position {
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
}

interface LiquidityChartProps {
  positions: Position[];
  currentTick: number;
  width?: number;
  height?: number;
}

function LiquidityChart({
  positions,
  currentTick,
  width = 800,
  height = 450,
}: LiquidityChartProps) {
  const data = positions
    .reduce<{ tick: number; liquidity: number }[]>((acc, position) => {
      acc.push({
        tick: position.tickLower,
        liquidity: 0,
      });
      acc.push({
        tick: position.tickLower,
        liquidity: Number(formatEther(position.liquidity)),
      });
      acc.push({
        tick: position.tickUpper,
        liquidity: Number(formatEther(position.liquidity)),
      });
      acc.push({
        tick: position.tickUpper,
        liquidity: 0,
      });

      return acc;
    }, [])
    .sort((a, b) => a.tick - b.tick);

  const tickRange =
    Math.max(...positions.map((p) => p.tickUpper)) -
    Math.min(...positions.map((p) => p.tickLower));
  const buffer = tickRange * 0.2;
  const minTick = Math.min(...positions.map((p) => p.tickLower)) - buffer;
  const maxTick = Math.max(...positions.map((p) => p.tickUpper)) + buffer;

  const maxLiquidity = Math.ceil(
    Math.max(...data.map((d) => d.liquidity)) * 1.3
  );

  return (
    <AreaChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 20, right: 50, left: 50, bottom: 30 }}
    >
      <CartesianGrid />
      <XAxis
        dataKey="tick"
        type="number"
        domain={[minTick, maxTick]}
        label={{ value: "Tick", position: "bottom" }}
        tick={{ fontSize: 12 }}
      />
      <YAxis
        label={{ value: "Liquidity", angle: -90, position: "insideLeft" }}
        domain={[0, maxLiquidity]}
        tick={{ fontSize: 12 }}
      />
      <Tooltip />
      <Area
        type="stepAfter"
        dataKey="liquidity"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.3}
      />
      <ReferenceLine
        x={currentTick}
        stroke="red"
        label={{ value: "Current Tick", position: "top" }}
      />
    </AreaChart>
  );
}

export default LiquidityChart;
