"use client";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type data = { score: number; date: string }[];
type demoData = { productivityScore: number; date: string };

const demoData: demoData[] = [
  {
    productivityScore: 12,
    date: "Sep 1, 2023",
  },
  {
    productivityScore: 2,
    date: "Sep 2, 2023",
  },
  {
    productivityScore: 13,
    date: "Sep 3, 2023",
  },
  {
    productivityScore: 2,
    date: "Sep 4, 2023",
  },
  {
    productivityScore: 5,
    date: "Sep 5, 2023",
  },
  {
    productivityScore: 7,
    date: "Sep 6, 2023",
  },
];
export function OverviewProductivityBigChart({
  data = [],
  loading,
}: {
  data: data;
  loading: boolean;
}) {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (loading === false) setLoader(false);
  }, [loading]);
  var finalData = [];
  for (var i = 0; i < data.length; i++) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      new Date(data[i].date)
    );
    finalData.push({
      productivityScore: data[i].score,
      date: formattedDate,
    });
  }
  return (
    <>
      {data && !loader && (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={finalData}>
            <XAxis
              dataKey="date"
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
            <Bar
              dataKey="productivityScore"
              fill="#adfa1d"
              radius={[4, 4, 0, 0]}
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
              formatter={(value) => [`Score: ${value}`]}
              labelFormatter={(label) => `Day: ${label}`}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {!data && !loader && (
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="absolute flex flex-col items-center justify-center z-50">
            <LockClosedIcon className="w-8 h-8 text-slate-300" />
            <p className="text-center text-muted-foreground text-sm mt-2">
              Sorry we are still collecting data
            </p>
          </div>

          <div className=" h-full blur-[3px] bg-slate-50 rounded-xl">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={demoData}>
                <XAxis
                  dataKey="date"
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
                <Bar
                  dataKey="productivityScore"
                  fill="#adfa1d"
                  radius={[4, 4, 0, 0]}
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
                  formatter={(value) => [`Score: ${value}`]}
                  labelFormatter={(label) => `Day: ${label}`}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {loader && (
        <div className="h-[80px] w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-5 border-b-2 border-[#adfa1d]"></div>
        </div>
      )}
    </>
  );
}
