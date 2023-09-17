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
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
export function OverviewTinyTabsBlockedChart({ userId }: { userId: string }) {
  return (
    <div className="mt-4 h-[80px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <Bar dataKey="subscription" fill="#000" radius={[4, 4, 0, 0]} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#FEFEFE",
              border: "none",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              zIndex: 9999,
            }}
            labelFormatter={(label) => ``}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
