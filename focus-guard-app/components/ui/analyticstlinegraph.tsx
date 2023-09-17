import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const data = [
  {
    average: 400,
    today: 240,
    cat3: 140,
    name: "Jan",
  },
  {
    average: 300,
    today: 139,
    cat3: 320,
    name: "Feb",
  },
  {
    average: 200,
    today: 980,
    cat3: 150,
    name: "Mar",
  },
  {
    average: 278,
    today: 390,
    cat3: 920,
    name: "Apr",
  },
  {
    average: 189,
    today: 480,
    cat3: 520,
    name: "May",
  },
  {
    average: 239,
    today: 380,
    cat3: 220,
    name: "Jun",
  },
  {
    average: 349,
    today: 430,
    cat3: 320,
    name: "Jul",
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Fortnite Videos
            </span>
            <span className="font-bold ">{payload[0].value}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Political News
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[1].value}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Posts from Ryan
            </span>
            <span className="font-bold">{payload[2].value}</span>
          </div>
        </div>
      </div>
    );
  }
};
export function AnalyticsTLineGraph() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
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
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="average"
          activeDot={{
            r: 6,
            style: { fill: "#adfa1d", opacity: 0.25 },
          }}
          style={
            {
              stroke: "#adfa1d",
              opacity: 0.25,
              "--theme-primary": "#adfa1d",
            } as React.CSSProperties
          }
        />
        <Line
          type="monotone"
          dataKey="today"
          strokeWidth={2}
          activeDot={{
            r: 8,
            style: { fill: "#adfa1d", opacity: 0.5 },
          }}
          style={
            {
              stroke: "#adfa1d",
              opacity: 0.5,
              "--theme-primary": "#adfa1d",
            } as React.CSSProperties
          }
        />
        <Line
          type="monotone"
          dataKey="cat3"
          strokeWidth={2}
          activeDot={{
            r: 8,
            style: { fill: "#adfa1d", opacity: 1 },
          }}
          style={
            {
              stroke: "#adfa1d",
              opacity: 1,
              "--theme-primary": "#adfa1d",
            } as React.CSSProperties
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
