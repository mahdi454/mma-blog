"use client";

import React, { useMemo, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useCarousel } from "@/hooks/useCarousel";
import { Pause, Play } from "lucide-react";

// Types

interface User {
  username: string;

  avatar: string;

  verified: boolean;
}

interface BaseStory {
  id: number;

  user: User;

  caption: string;

  timestamp: string;
}

interface YouTubeStory extends BaseStory {
  type: "youtube";

  videoId: string;
}

interface InstagramStory extends BaseStory {
  type: "instagram";

  videoUrl: string;
}

type Story = YouTubeStory | InstagramStory;

function NewYoutubeShort() {
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

  const [hover, setHover] = useState(false);

  const {
    setApi,

    handleNext,

    stopAutoplay,

    startAutoplay,

    handlePrevious,

    current,
  } = useCarousel({
    autoplay: true,

    interval: 5000,
  });

  return (
    <div className="w-full relative pt-6 data-lenis-prevent">
      <div className="flex justify-between text-white pb-2">
        <div className="bg-emerald-700 px-3 py-1 relative clip-arrow w-32 font-semibold rounded-l-sm">
          Top Videos
        </div>
      </div>

      <Carousel
        setApi={setApi}
        className="w-full"
        onMouseEnter={() => {
          stopAutoplay();
        }}
        onMouseLeave={() => {
          startAutoplay();
        }}
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContent className="flex ">
          {stories.map((story) => (
            <CarouselItem
              key={story.id}
              className="flex basis-1/4 rounded-lg shadow "
            >
              <div className="relative aspect-[9/16] w-full mb-2">
                {story.type === "youtube" && (
                  <>
                    <iframe
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      width="100%"
                      height="100%"
                      className="rounded"
                      src={`https://www.youtube.com/embed/${story.videoId}?autoplay=1&mute=0&controls=0&modestbranding=0&loop=1`}
                      title="YouTube video player"
                      allowFullScreen
                    ></iframe>

                    {/* Overlays */}
                    {/* <div className="absolute top-0 left-0 w-full h-[50%]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[40%]"></div>
                    <div className="absolute top-0 left-0 h-full w-[40%]"></div>
                    <div className="absolute top-0 right-0 h-full w-[40%]"></div> */}

                    
                  </>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          onClick={handlePrevious}
          className="left-1 cursor-pointer -translate-y-6"
          aria-label="Previous Slide"
        />

        <CarouselNext
          onClick={handleNext}
          className="right-1 cursor-pointer -translate-y-6 "
          aria-label="Next Slide"
        />

        <div className="absolute flex gap-3 lg:bottom-0 top-1/2 lg:top-auto -translate-y-2 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-400">
          {stories.map((_, idx) => (
            <div key={idx} className="w-6 sm:w-6">
              <div className="w-full bg-gray-400 h-1 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    idx + 1 === current
                      ? "bg-emerald-500 ease-linear"
                      : "bg-gray-400"
                  }`}
                  style={{
                    width: idx + 1 === current ? `100%` : "100%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
}

export default NewYoutubeShort;

