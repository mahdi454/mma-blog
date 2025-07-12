"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { YouTubePlayer } from "./youtubePlayer";

export interface User {
  username: string;
  avatar: string;
  verified: boolean;
}

export interface BaseStory {
  id: number;
  user: User;
  caption: string;
  timestamp: string;
}

export interface YouTubeStory extends BaseStory {
  type: "youtube";
  videoId: string;
}




export default function YoutubeStoryCarousel() {

const stories: YouTubeStory[] = useMemo(
    () => [
      {
        id: 1,
        type: "youtube",
        videoId: "TS9CQRZWa6k",
        user: {
          username: "creator_one",
          avatar: "👨‍🎨",
          verified: true,
        },
        caption: "Amazing YouTube Short! 🔥",
        timestamp: "2h",
      },
      {
        id: 2,
        type: "youtube",
        videoId: "mKdHxZd60vM",
        user: {
          username: "creator_five",
          avatar: "🚀",
          verified: false,
        },
        caption: "Tech content! 💻",
        timestamp: "10h",
      },
      {
        id: 3,
        type: "youtube",
        videoId: "CHVecA8GBjw",
        user: {
          username: "creator_three",
          avatar: "🎵",
          verified: true,
        },
        caption: "Music vibes on YouTube! 🎶",
        timestamp: "6h",
      },
      {
        id: 4,
        type: "youtube",
        videoId: "TS9CQRZWa6k",
        user: {
          username: "creator_one",
          avatar: "👨‍🎨",
          verified: true,
        },
        caption: "Amazing YouTube Short! 🔥",
        timestamp: "2h",
      },
      {
        id: 5,
        type: "youtube",
        videoId: "mKdHxZd60vM",
        user: {
          username: "creator_five",
          avatar: "🚀",
          verified: false,
        },
        caption: "Tech content! 💻",
        timestamp: "10h",
      },
    ],
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextStory = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % stories.length);
  }, [stories]);

  const prevStory = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + stories.length) % stories.length);
  }, [stories]);

  const handleVideoEnd = useCallback(() => {
    nextStory();
  }, [nextStory]);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientY);
  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientY);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) nextStory();
    if (dist < -50) prevStory();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowRight"].includes(e.key)) nextStory();
      if (["ArrowDown", "ArrowLeft"].includes(e.key)) prevStory();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextStory, prevStory]);

  const carouselIndices = useMemo(() => {
    const prev = (currentIndex - 1 + stories.length) % stories.length;
    const next = (currentIndex + 1) % stories.length;
    return [prev, currentIndex, next];
  }, [currentIndex, stories]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="relative w-full max-w-md md:max-w-6xl">
        <div className="flex gap-1 mb-4 px-2">
          {stories.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full ${
                i === currentIndex
                  ? "bg-white"
                  : i < currentIndex
                    ? "bg-white/60"
                    : "bg-white/20"
              }`}
            />
          ))}
        </div>

        <div
          className="relative w-full h-[90vh] rounded-xl overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Desktop */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center gap-8">
            {carouselIndices.map((index, pos) => {
              const story = stories[index];
              const isCenter = pos === 1;
              return (
                <div
                  key={story.id}
                  className={`aspect-[9/16] ${
                    isCenter
                      ? "w-80 scale-100 z-20"
                      : "w-64 scale-75 opacity-60 z-10"
                  }`}
                  style={{ pointerEvents: isCenter ? "auto" : "none" }}
                >
                  {story.type === "youtube" && (
                    <YouTubePlayer
                      videoId={story.videoId}
                      isActive={isCenter}
                      onVideoEnd={handleVideoEnd}
                    />
                  ) }
                </div>
              );
            })}
          </div>

          <div className="absolute left-0 top-0 w-1/3 h-full z-30" onClick={prevStory} />
          <div className="absolute right-0 top-0 w-1/3 h-full z-30" onClick={nextStory} />
        </div>
      </div>
    </div>
  );
}
