"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Stethoscope, Heart, Lungs, Activity } from "lucide-react";

export function RecentActivities() {
  const activities = [
    {
      id: 1,
      type: "heart",
      title: "Heart Sound Recording",
      time: "Today, 9:41 AM",
      icon: Heart,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: 2,
      type: "lung",
      title: "Lung Sound Analysis",
      time: "Yesterday, 8:15 PM",
      icon: Lungs,
      iconColor: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      id: 3,
      type: "activity",
      title: "Exercise Session",
      time: "Yesterday, 6:30 AM",
      icon: Activity,
      iconColor: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      id: 4,
      type: "heart",
      title: "ECG Recording",
      time: "2 days ago, 10:22 AM",
      icon: Stethoscope,
      iconColor: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activities</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Your latest health recordings and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className={`h-10 w-10 rounded-full ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}