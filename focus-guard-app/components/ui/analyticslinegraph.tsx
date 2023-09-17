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
    blocked: 12,
    name: "1pm",
    subscription: 240,
  },
  {
    blocked: 32,
    name: "2pm",
    subscription: 300,
  },
  {
    blocked: 2,
    name: "2:30pm",
    subscription: 200,
  },
  {
    blocked: 10,
    name: "4pm",
    subscription: 278,
  },
  {
    blocked: 2,
    name: "4:15pm",
    subscription: 189,
  },
  {
    blocked: 5,
    name: "5pm",
    subscription: 239,
  },
  {
    blocked: 54,
    name: "6pm",
    subscription: 278,
  },
  {
    blocked: 2,
    name: "7pm",
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
          dataKey="blocked"
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
          // tickFormatter={(value) => `$${value}`}
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
          formatter={(value) => value}
          labelFormatter={(label) => ``}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
