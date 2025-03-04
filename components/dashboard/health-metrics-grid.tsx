"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Lungs, 
  Activity, 
  Thermometer, 
  BarChart2, 
  TrendingUp, 
  TrendingDown,
  MoreHorizontal
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const heartRateData = [
  { time: "12 AM", value: 62 },
  { time: "3 AM", value: 58 },
  { time: "6 AM", value: 65 },
  { time: "9 AM", value: 78 },
  { time: "12 PM", value: 82 },
  { time: "3 PM", value: 76 },
  { time: "6 PM", value: 74 },
  { time: "9 PM", value: 68 },
  { time: "Now", value: 64 },
];

const bloodPressureData = [
  { time: "12 AM", systolic: 118, diastolic: 76 },
  { time: "3 AM", systolic: 115, diastolic: 74 },
  { time: "6 AM", systolic: 120, diastolic: 78 },
  { time: "9 AM", systolic: 125, diastolic: 82 },
  { time: "12 PM", systolic: 128, diastolic: 84 },
  { time: "3 PM", systolic: 126, diastolic: 82 },
  { time: "6 PM", systolic: 124, diastolic: 80 },
  { time: "9 PM", systolic: 120, diastolic: 78 },
  { time: "Now", systolic: 118, diastolic: 76 },
];

const oxygenData = [
  { time: "12 AM", value: 97 },
  { time: "3 AM", value: 96 },
  { time: "6 AM", value: 97 },
  { time: "9 AM", value: 98 },
  { time: "12 PM", value: 98 },
  { time: "3 PM", value: 97 },
  { time: "6 PM", value: 97 },
  { time: "9 PM", value: 96 },
  { time: "Now", value: 97 },
];

const respiratoryRateData = [
  { time: "12 AM", value: 14 },
  { time: "3 AM", value: 13 },
  { time: "6 AM", value: 14 },
  { time: "9 AM", value: 16 },
  { time: "12 PM", value: 17 },
  { time: "3 PM", value: 16 },
  { time: "6 PM", value: 15 },
  { time: "9 PM", value: 14 },
  { time: "Now", value: 14 },
];

const temperatureData = [
  { time: "12 AM", value: 98.2 },
  { time: "3 AM", value: 98.0 },
  { time: "6 AM", value: 97.8 },
  { time: "9 AM", value: 98.4 },
  { time: "12 PM", value: 98.6 },
  { time: "3 PM", value: 98.8 },
  { time: "6 PM", value: 98.6 },
  { time: "9 PM", value: 98.4 },
  { time: "Now", value: 98.2 },
];

const activityData = [
  { day: "Mon", steps: 8245 },
  { day: "Tue", steps: 7890 },
  { day: "Wed", steps: 9120 },
  { day: "Thu", steps: 8670 },
  { day: "Fri", steps: 7650 },
  { day: "Sat", steps: 10240 },
  { day: "Sun", steps: 6780 },
];

export function HealthMetricsGrid() {
  const [timeRange, setTimeRange] = useState("day");
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Health Metrics</h2>
        <Tabs defaultValue="day" value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Heart Rate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Heart Rate</CardTitle>
                    <CardDescription>Beats per minute</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold">64 BPM</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingDown className="mr-1 h-4 w-4 text-destructive" />
                    <span>4 BPM lower than yesterday</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Range</div>
                  <div className="text-sm text-muted-foreground">58-82 BPM</div>
                </div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={heartRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      domain={[50, 90]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      formatter={(value) => [`${value} BPM`, "Heart Rate"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Blood Pressure Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-chart-2/10 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-chart-2" />
                  </div>
                  <div>
                    <CardTitle>Blood Pressure</CardTitle>
                    <CardDescription>Systolic/Diastolic</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold">118/76 mmHg</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingDown className="mr-1 h-4 w-4 text-success" />
                    <span>Normal range</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Status</div>
                  <div className="text-sm text-success">Healthy</div>
                </div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      domain={[70, 140]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      formatter={(value, name) => {
                        return [
                          `${value} mmHg`, 
                          name === "systolic" ? "Systolic" : "Diastolic"
                        ];
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1000}
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Oxygen Saturation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-chart-3/10 flex items-center justify-center">
                    <Lungs className="h-4 w-4 text-chart-3" />
                  </div>
                  <div>
                    <CardTitle>Oxygen Saturation</CardTitle>
                    <CardDescription>SpO2 percentage</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold">97%</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="mr-1 h-4 w-4 text-success" />
                    <span>Normal range</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Status</div>
                  <div className="text-sm text-success">Healthy</div>
                </div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={oxygenData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      domain={[94, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      formatter={(value) => [`${value}%`, "Oxygen"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-3))"
                      fill="hsl(var(--chart-3)/0.2)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Respiratory Rate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-chart-4/10 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-chart-4" />
                  </div>
                  <div>
                    <CardTitle>Respiratory Rate</CardTitle>
                    <CardDescription>Breaths per minute</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold">14 BPM</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingDown className="mr-1 h-4 w-4 text-success" />
                    <span>Normal range</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Range</div>
                  <div className="text-sm text-muted-foreground">13-17 BPM</div>
                </div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={respiratoryRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      domain={[12, 18]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      formatter={(value) => [`${value} BPM`, "Respiratory Rate"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Temperature Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-chart-5/10 flex items-center justify-center">
                    <Thermometer className="h-4 w-4 text-chart-5" />
                  </div>
                  <div>
                    <CardTitle>Body Temperature</CardTitle>
                    <CardDescription>Fahrenheit</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold">98.2°F</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingDown className="mr-1 h-4 w-4 text-success" />
                    <span>Normal range</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Status</div>
                  <div className="text-sm text-success">Normal</div>
                </div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      domain={[97, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      formatter={(value) => [`${value}°F`, "Temperature"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-5))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Activity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Physical Activity</CardTitle>
                    <CardDescription>Steps per day</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold">6,780</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingDown className="mr-1 h-4 w-4 text-destructive" />
                    <span>1,220 less than yesterday</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Goal</div>
                  <div className="text-sm text-muted-foreground">10,000 steps</div>
                </div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      formatter={(value) => [`${value.toLocaleString()}`, "Steps"]}
                    />
                    <Bar
                      dataKey="steps"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}