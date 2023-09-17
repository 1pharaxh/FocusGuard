"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Jan",
    total2: Math.floor(Math.random() * 5000) + 1000,
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total2: Math.floor(Math.random() * 5000) + 1000,

    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total2: Math.floor(Math.random() * 5000) + 1000,

    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total2: Math.floor(Math.random() * 5000) + 1000,

    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total2: Math.floor(Math.random() * 5000) + 1000,

    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total2: Math.floor(Math.random() * 5000) + 1000,

    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total2: Math.floor(Math.random() * 5000) + 1000,

    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total2: Math.floor(Math.random() * 5000) + 1000,

    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total2: Math.floor(Math.random() * 5000) + 1000,

    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total2: Math.floor(Math.random() * 5000) + 1000,
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total2: Math.floor(Math.random() * 5000) + 1000,
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total2: Math.floor(Math.random() * 5000) + 1000,
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function AnalyticsStackedGraph() {
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
          formatter={(value) => [`$${value}`, "Total"]}
          labelFormatter={(label) => `Month of ${label}`}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
