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
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
export function OverviewTinyProductivityChart({ userId }: { userId: string }) {
  return (
    <div className="h-[80px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="revenue"
            activeDot={{
              r: 6,
              style: {
                fill: "var(--theme-primary)",
                opacity: 0.25,
              },
            }}
            style={
              {
                stroke: "var(--theme-primary)",
                "--theme-primary": "#adfa1d",
              } as React.CSSProperties
            }
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
