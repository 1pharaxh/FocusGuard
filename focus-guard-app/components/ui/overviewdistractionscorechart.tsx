const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
];
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
export function OverViewDistractionScoreChart({ userId }: { userId: string }) {
  return (
    <div className="h-[80px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <Area
            type="monotone"
            stroke="#adfa1d"
            fill="#adfa1d"
            strokeWidth={2}
            dataKey="revenue"
            activeDot={{
              r: 6,
              style: {
                fill: "#adfa1d",
                opacity: 0.25,
              },
            }}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#FEFEFE",
              border: "none",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              zIndex: 9999,
            }}
            itemStyle={{
              color: "#659D0A",
            }}
            labelFormatter={(label) => ``}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
