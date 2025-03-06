"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Youtube, 
  GraduationCap, 
  PlayCircle, 
  BookOpen, 
  Flame,
  TrendingUp,
  Search as SearchIcon,
  RefreshCcw
} from "lucide-react";

import { 
  fetchHealthVideos, 
  fetchHealthCourses, 
  fetchVideosByTopic,
  type YouTubeApiResponse
} from "@/lib/youtubeApi";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

// Health Hub components
import { SearchBar } from "@/components/health-hub/search-bar";
import { VideoGrid } from "@/components/health-hub/video-grid";
import { TopicFilter } from "@/components/health-hub/topic-filter";
import { SectionHeader } from "@/components/health-hub/section-header";

// Topic mapping to better search queries
const TOPIC_TO_SEARCH_QUERY: Record<string, string> = {
  "all": "",
  "heart-health": "heart health medical advice",
  "medications": "medication guidance healthcare",
  "mental-health": "mental health therapy techniques",
  "nutrition": "nutrition medical advice diet",
  "pediatrics": "pediatric health children medical",
  "fitness": "fitness exercise medical guidance",
  "research": "medical research breakthroughs",
  "first-aid": "first aid medical emergency training",
  "holistic": "holistic medicine natural remedies",
  "physical-therapy": "physical therapy rehabilitation techniques",
  "diagnostics": "medical diagnostics procedures",
  "vital-signs": "vital signs monitoring healthcare"
};

export default function HealthHubPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialTab = searchParams.get("tab") || "videos";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Function to handle search query changes
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Reset topic filter when searching
    setSelectedTopic("all");
  }, []);

  // Function to handle topic selection
  const handleTopicSelect = useCallback((topicId: string) => {
    setSelectedTopic(topicId);
    // Clear search query when selecting a topic
    setSearchQuery("");
  }, []);

  // Function to refresh the content
  const refreshContent = useCallback(() => {
    setRefreshKey(prev => prev + 1);
    toast.success("Content refreshed");
  }, []);

  // Functions for fetching different types of content
  const fetchVideosWithQuery = useCallback(
    (pageToken?: string) => {
      if (searchQuery) {
        return fetchVideosByTopic(searchQuery, pageToken);
      } else if (selectedTopic !== "all") {
        const topicQuery = TOPIC_TO_SEARCH_QUERY[selectedTopic] || selectedTopic;
        return fetchVideosByTopic(topicQuery, pageToken);
      }
      return fetchHealthVideos(pageToken);
    },
    [searchQuery, selectedTopic]
  );

  const fetchCoursesWithQuery = useCallback(
    (pageToken?: string) => {
      if (searchQuery) {
        return fetchVideosByTopic(`${searchQuery} course tutorial`, pageToken);
      } else if (selectedTopic !== "all") {
        const topicQuery = TOPIC_TO_SEARCH_QUERY[selectedTopic] || selectedTopic;
        return fetchVideosByTopic(`${topicQuery} course tutorial`, pageToken);
      }
      return fetchHealthCourses(pageToken);
    },
    [searchQuery, selectedTopic]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Health Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the latest health videos, medical courses, and expert advice to improve your wellbeing
        </p>
      </motion.div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <TopicFilter onSelectTopic={handleTopicSelect} selectedTopic={selectedTopic} />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {searchQuery && (
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
              <span>Results for: <span className="font-medium">{searchQuery}</span></span>
            </div>
          )}
          
          {selectedTopic !== "all" && !searchQuery && (
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>Topic: <span className="font-medium">{TOPIC_TO_SEARCH_QUERY[selectedTopic] ? selectedTopic.replace("-", " ") : selectedTopic}</span></span>
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1" 
          onClick={refreshContent}
        >
          <RefreshCcw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>

      <Tabs 
        defaultValue={activeTab} 
        onValueChange={handleTabChange}
        className="space-y-8"
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            <span>Health Videos</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Medical Courses</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-8">
          <SectionHeader
            title="Health Videos"
            description="Learn about medical topics, treatments, and wellness tips from health professionals"
            icon={<Youtube className="h-5 w-5" />}
          />
          
          <VideoGrid 
            key={`videos-${refreshKey}-${searchQuery}-${selectedTopic}`} 
            fetchVideos={fetchVideosWithQuery}
            title="Health Videos"
            emptyMessage={searchQuery ? `No videos found for "${searchQuery}"` : "No videos found for this topic"}
          />
        </TabsContent>

        <TabsContent value="courses" className="space-y-8">
          <SectionHeader
            title="Medical Courses"
            description="Comprehensive educational content on healthcare topics and medical training"
            icon={<BookOpen className="h-5 w-5" />}
          />
          
          <VideoGrid 
            key={`courses-${refreshKey}-${searchQuery}-${selectedTopic}`} 
            fetchVideos={fetchCoursesWithQuery}
            title="Medical Courses"
            emptyMessage={searchQuery ? `No courses found for "${searchQuery}"` : "No courses found for this topic"}
          />
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <SectionHeader
          title="Trending Health Topics"
          description="Popular health and medical topics people are searching for right now"
          icon={<Flame className="h-5 w-5" />}
        />

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {Object.entries(TOPIC_TO_SEARCH_QUERY)
            .filter(([key]) => key !== "all")
            .slice(0, 6)
            .map(([key, value]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => handleTopicSelect(key)}
              >
                {key.replace("-", " ")}
              </Button>
            ))
          }
        </div>
      </motion.div>
    </div>
  );
} 