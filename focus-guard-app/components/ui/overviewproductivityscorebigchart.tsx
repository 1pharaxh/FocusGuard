"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function OverviewProductivityBigChart({ userId }: { userId: string }) {
  const [data, setData] = useState([
    {
      productivityScore: 12,
      name: "Mon",
    },
    {
      productivityScore: 2,
      name: "Tue",
    },
    {
      productivityScore: 13,
      name: "Wed",
    },
    {
      productivityScore: 2,
      name: "Thu",
    },
    {
      productivityScore: 5,
      name: "Fri",
    },
    {
      productivityScore: 7,
      name: "Sat",
    },
    // Add new data point from api here
  ]);

  const fetchData = async () => {
    if (userId) {
      try {
        const res = await fetch(`/api/productivityScore`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ extension_user_id: userId, date: new Date() }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.others && data.notOthers) {
          setData((prevData) => [
            ...prevData,
            {
              productivityScore: data.others,
              name: "Sun",
            },
          ]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [userId]);
  return (
    <ResponsiveContainer width="100%" height={350}>
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
          // tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="productivityScore" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: "#FEFEFE",
            border: "none",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 9999,
          }}
          formatter={(value) => [`Score: ${value}`]}
          labelFormatter={(label) => `Day: ${label}`}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
