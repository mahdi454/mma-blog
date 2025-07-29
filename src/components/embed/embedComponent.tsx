"use client";
import React from "react";

interface EmbedProps {
  type: string;
  src: string;
  title?: string;
}

export default function EmbedComponent({ type, src, title }: EmbedProps) {
  switch (type) {
    case "youtube": {
      const result = extractYouTubeId(src);
      if (!result) return <div className="text-red-500">Invalid YouTube URL</div>;
      const { id: youtubeId, isShorts } = result;
      
      return (
        <figure className={`w-full ${isShorts ? "aspect-[9/16]" : "aspect-video"}`}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-md"
            // No special handling needed - GSAP handles it automatically!
          />
          {title && (
            <figcaption className="text-center text-xs text-gray-500 mt-1 italic">
              {title}
            </figcaption>
          )}
        </figure>
      );
    }

    case "twitter":
      return (
        <figure className="w-full max-w-lg mx-auto bg-white rounded-md shadow overflow-hidden">
          <blockquote className="twitter-tweet" data-dnt="true">
            <a href={src} target="_blank" rel="noopener noreferrer">
              {title || "View on Twitter"}
            </a>
          </blockquote>
          {title && (
            <figcaption className="text-center text-xs text-gray-500 mt-1 italic">
              {title}
            </figcaption>
          )}
          <TwitterScript />
        </figure>
      );

    case "instagram":
      return (
        <figure className="instagram-embed w-full max-w-lg mx-auto">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={src}
            data-instgrm-version="14"
            data-instgrm-captioned
          >
            <a href={src} target="_blank" rel="noopener noreferrer">
              {title || "View on Instagram"}
            </a>
          </blockquote>
          {title && (
            <figcaption className="text-center text-xs text-gray-500 mt-1 italic">
              {title}
            </figcaption>
          )}
          <InstagramScript />
        </figure>
      );

    default:
      return <div className="text-red-500">Unsupported embed type</div>;
  }
}

// Helper functions
type YouTubeIdResult = { id: string; isShorts: boolean; } | null;

function extractYouTubeId(url: string): YouTubeIdResult {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id.length === 11) return { id, isShorts: false };
    }
    const vParam = u.searchParams.get("v");
    if (vParam && vParam.length === 11) return { id: vParam, isShorts: false };
    const paths = u.pathname.split("/").filter(Boolean);
    const idx = paths.findIndex((p) => ["embed", "v", "shorts"].includes(p));
    if (idx !== -1 && paths[idx + 1] && paths[idx + 1].length === 11) {
      const isShorts = paths[idx] === "shorts";
      return { id: paths[idx + 1], isShorts };
    }
    return null;
  } catch {
    return null;
  }
}

const TwitterScript = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);
  return null;
};

const InstagramScript = () => {
  React.useEffect(() => {
    const process = () => {
      if (window.instgrm?.Embeds) window.instgrm.Embeds.process();
    };
    const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (existing) {
      process();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = process;
    document.head.appendChild(script);
  }, []);
  return null;
};