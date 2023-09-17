import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
export function OverviewTinyProductivityChart({ userId }: { userId: string }) {
  const [data, setData] = useState([
    {
      productivityScore: 12,
    },
    {
      productivityScore: 2,
    },
    {
      productivityScore: 13,
    },
    {
      productivityScore: 2,
    },
    {
      productivityScore: 5,
    },
    {
      productivityScore: 7,
    },
    // Add a new data point from api here
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
            dataKey="productivityScore"
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
            formatter={(value) => [`${value}`, "Points"]}
            labelFormatter={(label) => ``}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
