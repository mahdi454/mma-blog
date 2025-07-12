"use client";
import React, { useCallback, useEffect, useState } from "react";

export const YouTubePlayer = React.memo(
  ({
    videoId,
    isActive,
    onVideoEnd,
  }: {
    videoId: string;
    isActive: boolean;
    onVideoEnd: () => void;
  }) => {
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = React.useRef<any>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const playerId = `yt-player-${videoId}-${Date.now()}`;

    useEffect(() => {
      if (window.YT && window.YT.Player) {
        initializePlayer();
        return;
      }

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }

      const checkAPI = () => {
        if (window.YT && window.YT.Player) {
          initializePlayer();
        } else {
          setTimeout(checkAPI, 100);
        }
      };

      window.onYouTubeIframeAPIReady = checkAPI;
      checkAPI();

      return () => {
        playerRef.current?.destroy?.();
      };
    }, [videoId]);

    const initializePlayer = useCallback(() => {
      if (!containerRef.current || playerRef.current) return;

      playerRef.current = new window.YT.Player(playerId, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setIsReady(true);
            if (isActive) playerRef.current?.playVideo();
          },
          onStateChange: (event: any) => {
            const state = event.data;
            setIsPlaying(state === window.YT.PlayerState.PLAYING);
            if (state === window.YT.PlayerState.ENDED) onVideoEnd();
          },
        },
      });
    }, [playerId, videoId, isActive, onVideoEnd]);

    useEffect(() => {
      if (!isReady || !playerRef.current) return;
      if (isActive) playerRef.current.playVideo();
      else playerRef.current.pauseVideo();
    }, [isActive, isReady]);

    const toggle = () => {
      if (isPlaying) playerRef.current?.pauseVideo();
      else playerRef.current?.playVideo();
    };

    return (
      <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
        <div ref={containerRef} id={playerId} className="w-full h-full" />

        {/* Overlay */}
        <div
          onClick={toggle}
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
        >
          {!isPlaying && isReady && (
            <div className="bg-black/50 rounded-full p-4">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-1" />
            </div>
          )}
        </div>

        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
          </div>
        )}
      </div>
    );
  }
);
