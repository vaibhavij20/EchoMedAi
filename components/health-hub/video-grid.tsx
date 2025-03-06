"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoCard } from "./video-card";
import { type YouTubeVideo, type YouTubeApiResponse } from "@/lib/youtubeApi";

interface VideoGridProps {
  fetchVideos: (pageToken?: string) => Promise<YouTubeApiResponse>;
  title: string;
  emptyMessage?: string;
}

export function VideoGrid({ fetchVideos, title, emptyMessage = "No videos found" }: VideoGridProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>(undefined);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadVideos = async (pageToken?: string, reset = false) => {
    try {
      setLoadingMore(!!pageToken && !reset);
      if (!pageToken) setLoading(true);
      
      const response = await fetchVideos(pageToken);
      
      setVideos(prev => reset ? response.videos : [...prev, ...response.videos]);
      setNextPageToken(response.nextPageToken);
      setPrevPageToken(response.prevPageToken);
      setError(null);
    } catch (err) {
      setError("Failed to load videos. Please try again.");
      console.error("Failed to load videos:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleLoadMore = () => {
    if (nextPageToken) {
      loadVideos(nextPageToken);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading {title.toLowerCase()}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => loadVideos(undefined, true)}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {videos.map((video, index) => (
          <VideoCard 
            key={`${video.id}-${index}`} 
            video={video} 
            priority={index < 4} 
          />
        ))}
      </motion.div>

      {nextPageToken && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleLoadMore} 
            disabled={loadingMore} 
            className="min-w-[150px]"
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Loading
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
} 