"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  Heart, 
  Pill, 
  Brain, 
  Apple, 
  Baby, 
  Activity, 
  Dumbbell, 
  Microscope, 
  Globe, 
  Stethoscope,
  Bandage,
  Leaf,
  User
} from "lucide-react";

// Health topic categories with icons
const HEALTH_TOPICS = [
  { id: "all", label: "All Topics", icon: Globe },
  { id: "heart-health", label: "Heart Health", icon: Heart },
  { id: "medications", label: "Medications", icon: Pill },
  { id: "mental-health", label: "Mental Health", icon: Brain },
  { id: "nutrition", label: "Nutrition", icon: Apple },
  { id: "pediatrics", label: "Pediatrics", icon: Baby },
  { id: "fitness", label: "Fitness", icon: Dumbbell },
  { id: "research", label: "Medical Research", icon: Microscope },
  { id: "first-aid", label: "First Aid", icon: Bandage },
  { id: "holistic", label: "Holistic Health", icon: Leaf },
  { id: "physical-therapy", label: "Physical Therapy", icon: User },
  { id: "diagnostics", label: "Diagnostics", icon: Stethoscope },
  { id: "vital-signs", label: "Vital Signs", icon: Activity },
];

interface TopicFilterProps {
  onSelectTopic: (topicId: string) => void;
  selectedTopic?: string;
}

export function TopicFilter({ onSelectTopic, selectedTopic = "all" }: TopicFilterProps) {
  return (
    <div className="w-full mb-8">
      <ScrollArea className="w-full">
        <div className="flex space-x-2 p-1">
          {HEALTH_TOPICS.map((topic) => {
            const isSelected = selectedTopic === topic.id;
            const Icon = topic.icon;
            
            return (
              <motion.div
                key={topic.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "px-3 py-2 rounded-full",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-background",
                    "transition-all duration-200 flex items-center gap-1.5"
                  )}
                  onClick={() => onSelectTopic(topic.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{topic.label}</span>
                  
                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-current rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
} 