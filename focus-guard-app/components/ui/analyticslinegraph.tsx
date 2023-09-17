import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  {
    revenue: 10400,
    name: "Jan",
    subscription: 240,
  },
  {
    revenue: 14405,
    name: "Feb",
    subscription: 300,
  },
  {
    revenue: 9400,
    name: "Mar",
    subscription: 200,
  },
  {
    revenue: 8200,
    name: "Apr",
    subscription: 278,
  },
  {
    revenue: 7000,
    name: "May",
    subscription: 189,
  },
  {
    revenue: 9600,
    name: "Jun",
    subscription: 239,
  },
  {
    revenue: 11244,
    name: "Jul",
    subscription: 278,
  },
  {
    revenue: 26475,
    name: "Aug",
    subscription: 189,
  },
];

export function AnalyticsLineGraph() {
  return (
    <ResponsiveContainer width="100%" height={110}>
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
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
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
  );
}
