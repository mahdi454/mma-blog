"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  isActive: boolean;
  onVideoEnd: () => void;
}

function YouTubePlayer({ videoId, isActive, onVideoEnd }: YouTubePlayerProps) {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerId = `yt-player-${videoId}`;

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        return;
      }
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    };

    if (!window.YT) {
      loadYouTubeAPI();
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    function createPlayer() {
      if (playerRef.current) {
        const ytPlayer = new window.YT.Player(playerId, {
          videoId: videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            modestbranding: 1,
            autoplay: isActive ? 1 : 0,
            mute: 0,
            rel: 0,
            controls: 0,
            loop: 0,
            showinfo: 0,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target);
              if (isActive) {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                onVideoEnd();
              }
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            },
          },
        });
      }
    }
  }, [videoId, playerId]);

  useEffect(() => {
    if (player) {
      if (isActive) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }, [isActive, player]);

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  return (
    <div className="relative w-full aspect-[9/16] bg-black rounded-xl overflow-hidden">
      <div id={playerId} ref={playerRef} className="w-full h-full" />

      <div
        className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
        onClick={togglePlayPause}
      >
        {!isPlaying && (
          <div className="rounded-full p-4">
            <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-1" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function InstagramStoryYouTube() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const EMBED_URLS = ['TS9CQRZWa6k', 'V2xVBj-4VMA', 'basbX3Aj4CY', 'GPciCGzqTtw'];

  const handleClick = (index: number) => {
    setCurrentIndex(index === currentIndex ? null : index);
  };

  const handleVideoEnd = () => {
    if (currentIndex === null) return;
    const next = (currentIndex + 1) % EMBED_URLS.length;
    setCurrentIndex(next);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center p-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
      {EMBED_URLS.map((videoId, index) => (
        <div
          key={videoId}
          className="basis-1/3 flex flex-col items-center cursor-pointer"
          onClick={() => handleClick(index)}
        >
          <YouTubePlayer
            videoId={videoId}
            isActive={index === currentIndex}
            onVideoEnd={handleVideoEnd}
          />
          <p className="mt-2 text-white">{videoId}</p>
        </div>
      ))}
    </div>
  );
}
