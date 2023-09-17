"use client";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/ui/overview";
import { RecentSales } from "@/components/ui/recent-sales";
import { AnalyticsTLineGraph } from "@/components/ui/analyticstlinegraph";
import { AnalyticsStackedGraph } from "@/components/ui/analyticstackedgraph";
import { AnalyticsLineGraph } from "@/components/ui/analyticslinegraph";
import { AnalyticsTable } from "@/components/ui/analyticstable";
import React from "react";
import dynamic from "next/dynamic";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AlertDialog = dynamic(
  () => import("@/components/ui/alert-dialog").then((mod) => mod.AlertDialog),
  {
    ssr: false,
  }
);
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
export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchData = async () => {
    if (isLoaded && userId && isSignedIn) {
      localStorage.setItem("user_id", userId);
      setIsLoading(true);
      try {
        const res = await fetch(`/api/checkCategory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ extension_user_id: userId }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        if (data.exists === false) {
          const btn = document.getElementById("triggerBtn");
          btn?.click();
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };
  // if user is signed in, add a key user_id to the local storage with the value of the user id
  React.useEffect(() => {
    fetchData();
  }, [isLoaded, userId, isSignedIn]);

  return (
    <>
      {isLoading && (
        <main className="flex w-full items-center justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button id="triggerBtn"></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add your first category !🤗</AlertDialogTitle>
                <AlertDialogDescription>
                  To get started, add your first category. This will help you to
                  track your productivity.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <>
            <div className=" flex-col flex w-full max-w-7xl">
              <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Dashboard
                    <br />
                    <span className="text-sm font-medium">
                      Hello, {user?.firstName} welcome to Focus Guard
                    </span>
                  </h2>

                  {/* <h2 className="text-sm font-medium tracking-tight">
                  Hello, {userId} your current active session is {sessionId}
                </h2> */}
                  <div className="flex items-center space-x-2">
                    <UserButton afterSignOutUrl="/delete-user-key " />
                  </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings" disabled>
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Productivity Score
                          </CardTitle>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+2350</div>
                          <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                          </p>
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
                                    boxShadow:
                                      "0px 4px 16px rgba(0, 0, 0, 0.1)",
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
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Tabs blocked
                          </CardTitle>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                          </svg>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+573</div>
                          <p className="text-xs text-muted-foreground">
                            +201 since last hour
                          </p>
                          <div className="mt-4 h-[80px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={data}>
                                <Bar
                                  dataKey="subscription"
                                  fill="#000"
                                  radius={[4, 4, 0, 0]}
                                />
                                <Tooltip
                                  cursor={{ fill: "transparent" }}
                                  contentStyle={{
                                    backgroundColor: "#FEFEFE",
                                    border: "none",
                                    boxShadow:
                                      "0px 4px 16px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "8px",
                                    zIndex: 9999,
                                  }}
                                  labelFormatter={(label) => ``}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Distraction Score
                          </CardTitle>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                          </svg>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+12,234</div>
                          <p className="text-xs text-muted-foreground">
                            +19% from last month
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                      <Card
                        className="
                  md:col-span-1
                  lg:col-span-4"
                      >
                        <CardHeader>
                          <CardTitle>Productivity Score</CardTitle>
                          <CardDescription>
                            Learn more about your productivity score.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                          <Overview />
                        </CardContent>
                      </Card>
                      <Card
                        className="
                   md:col-span-1
                  lg:col-span-3"
                      >
                        <CardHeader>
                          <div className="w-full flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <CardTitle>Add a new category</CardTitle>
                              <CardDescription>
                                Add new distractions categories to your list.
                              </CardDescription>
                            </div>
                            <Button variant="outline" size="icon">
                              <PlusIcon />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {userId && <RecentSales userId={userId} />}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                      <Card className="col-span-1">
                        <CardHeader>
                          <CardTitle>Productivity Score</CardTitle>
                          <CardDescription>
                            Learn more about your productivity score.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                          <AnalyticsTLineGraph />
                        </CardContent>
                      </Card>
                      <div className="col-span-1 flex flex-col gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Productivity Score</CardTitle>
                            <CardDescription>
                              Learn more about your productivity score.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pl-2">
                            <AnalyticsLineGraph />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Productivity Score</CardTitle>
                            <CardDescription>
                              Learn more about your productivity score.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pl-2">
                            <AnalyticsStackedGraph />
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Productivity Score</CardTitle>
                        <CardDescription>
                          Learn more about your productivity score.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AnalyticsTable />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </>
        </main>
      )}
    </>
  );
}
