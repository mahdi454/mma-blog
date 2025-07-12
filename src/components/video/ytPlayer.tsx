"use client";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  videoId: string;
  isActive: boolean;
  onEnded: () => void;
}

export const YouTubePlayer: React.FC<Props> = ({ videoId, isActive, onEnded }) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const playerId = `yt-${videoId}`;

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
      window.onYouTubeIframeAPIReady = init;
    }

    function init() {
      playerRef.current = new window.YT.Player(playerId, {
        videoId,
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.ENDED) onEnded();
          },
        },
        playerVars: {
          autoplay: 0,
          controls: 0,
          mute: 0,
        },
      });
    }

    return () => playerRef.current?.destroy();
  }, [videoId, playerId, onEnded]);

  useEffect(() => {
    if (!isReady || !playerRef.current) return;
    if (isActive) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [isActive, isReady]);

  return <div ref={containerRef} id={playerId} className="w-full h-full rounded" />;
};
