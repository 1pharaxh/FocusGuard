"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
interface Data {
  name: string;
  total: number;
  total2: number;
}
const data: Data[] = [
  {
    name: "Mon",
    total2: Math.floor(Math.random() * 10) + 4,
    total: Math.floor(Math.random() * 10) + 4,
  },
  {
    name: "Tue",
    total2: Math.floor(Math.random() * 10) + 4,

    total: Math.floor(Math.random() * 10) + 4,
  },
  {
    name: "Wed",
    total2: Math.floor(Math.random() * 10) + 4,

    total: Math.floor(Math.random() * 10) + 4,
  },
  {
    name: "Thu",
    total2: Math.floor(Math.random() * 10) + 4,

    total: Math.floor(Math.random() * 10) + 4,
  },
  {
    name: "Fri",
    total2: Math.floor(Math.random() * 10) + 4,

    total: Math.floor(Math.random() * 10) + 4,
  },
  {
    name: "Sat",
    total2: Math.floor(Math.random() * 10) + 4,

    total: Math.floor(Math.random() * 10) + 4,
  },
  {
    name: "Sun",
    total2: Math.floor(Math.random() * 10) + 4,

    total: Math.floor(Math.random() * 10) + 4,
  },
];

export function AnalyticsStackedGraph() {
  if (data.length === 0)
    return (
      <div>
        <p>No data</p>
      </div>
    );
  return (
    <ResponsiveContainer width="100%" height={110}>
      <BarChart data={data}>
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
        <Bar
          dataKey="total2"
          stackId="a"
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
        />
        <Bar dataKey="total" stackId="a" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: "#FEFEFE",
            border: "none",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 9999,
          }}
          formatter={(value, name) => {
            return [value, name === "total" ? "Allowed" : "Blocked"];
          }}
          labelFormatter={(label) => `Day: ${label}`}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
