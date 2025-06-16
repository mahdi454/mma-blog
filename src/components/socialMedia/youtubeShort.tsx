"use client";
import { useCallback, useEffect, useState } from "react";
import YouTubePlayer from "./youtubeCarousel";
import InstagramEmbed from "./insta";
const stories = [
    {
      id: 1,
      type: 'youtube',
      videoId: 'TS9CQRZWa6k',
      user: {
        username: 'creator_one',
        avatar: '👨‍🎨',
        verified: true
      },
      caption: 'Amazing YouTube Short! 🔥',
      timestamp: '2h'
    },
    {
      id: 2,
      type: 'instagram',
      videoUrl: 'https://www.instagram.com/reel/DGTibEMIkxp/',
      user: {
        username: 'creator_two',
        avatar: '👩‍💼',
        verified: false
      },
      caption: 'Check out this Instagram Reel! ✨',
      timestamp: '4h'
    },
    {
      id: 3,
      type: 'youtube',
      videoId: 'CHVecA8GBjw',
      user: {
        username: 'creator_three',
        avatar: '🎵',
        verified: true
      },
      caption: 'Music vibes on YouTube! 🎶',
      timestamp: '6h'
    },
    {
      id: 4,
      type: 'instagram',
      videoUrl: 'https://www.instagram.com/reel/DF8KUflJlts/',
      user: {
        username: 'creator_four',
        avatar: '🎭',
        verified: true
      },
      caption: 'Creative content here! 🎨',
      timestamp: '8h'
    },
    {
      id: 5,
      type: 'youtube',
      videoId: 'mKdHxZd60vM',
      user: {
        username: 'creator_five',
        avatar: '🚀',
        verified: false
      },
      caption: 'Tech content! 💻',
      timestamp: '10h'
    }
  ];
export default function InstagramStoryYouTube() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // const stories = ['TS9CQRZWa6k', 'DQeVLlJfj-w', 'mKdHxZd60vM', 'CHVecA8GBjw'];

  const nextStory = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % stories.length);
  }, [stories.length]);

  const prevStory = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + stories.length) % stories.length);
  }, [stories.length]);

  const handleVideoEnd = useCallback(() => {
    nextStory();
  }, [nextStory]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      nextStory();
    }
    if (isDownSwipe) {
      prevStory();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        nextStory();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        prevStory();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStory, prevStory]);

// ...existing code...

  // Helper to get indices for carousel
  const getCarouselIndices = () => {
    const prev = (currentIndex - 1 + stories.length) % stories.length;
    const next = (currentIndex + 1) % stories.length;
    return [prev, currentIndex, next];
  };

  // ...existing code...

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative  w-full">
        {/* Story indicators */}
        <div className="flex gap-1 mb-4 px-2">
          {stories.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : index < currentIndex 
                    ? 'bg-white/60' 
                    : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Main story container */}
        <div 
          className="relative w-full h-[90vh]  rounded-xl overflow-hidden shadow-2xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Desktop carousel */}
          <div className="hidden md:flex absolute inset-0 w-full h-full items-center justify-evenly gap-12 transition-transform duration-300">
            {stories.map((video, i) => (
              video.type === 'youtube' ? (
              <div
                key={video.id}
                className={`
                  basis-1/3 aspect-[9/16] flex-shrink-0 flex-grow-0
                  transition-transform duration-300
                  ${i === 1 ? 'scale-100 z-20' : 'scale-75 opacity-60 z-10'}
                  mx-[-8%]
                `}
                style={{ pointerEvents: i === 1 ? 'auto' : 'none' }}
              >
                <YouTubePlayer
                  videoId={video.videoId || ''}
                  isActive={i === 1}
                  onVideoEnd={handleVideoEnd}
                />
              </div>):( <InstagramEmbed key={video.id}  />)
            ))}
            {/* Click areas for navigation */}
            <div 
              className="absolute left-0 top-0 w-1/3 h-full z-30 cursor-pointer"
              onClick={prevStory}
            />
            <div 
              className="absolute right-0 top-0 w-1/3 h-full z-30 cursor-pointer"
              onClick={nextStory}
            />
          </div>

          {/* Mobile: single video */}
          <div className="md:hidden absolute inset-0 w-full h-full">
            {stories.map((video, index) => (
              <div
                key={video.id}
                className={`absolute inset-0 transition-transform duration-300 ${
                  index === currentIndex 
                    ? 'translate-x-0' 
                    : index < currentIndex 
                      ? '-translate-x-full' 
                      : 'translate-x-full'
                }`}
              >
                <YouTubePlayer
                  videoId={video.videoId || ''}
                  isActive={index === currentIndex}
                  onVideoEnd={handleVideoEnd}
                />
              </div>
            ))}
            {/* Click areas for navigation */}
            <div 
              className="absolute left-0 top-0 w-1/3 h-full z-30 cursor-pointer"
              onClick={prevStory}
            />
            <div 
              className="absolute right-0 top-0 w-1/3 h-full z-30 cursor-pointer"
              onClick={nextStory}
            />
          </div>

          {/* Story info overlay */}
          {/* <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="text-white">
              <div className="text-sm opacity-80">
                {currentIndex + 1} of {stories.length}
              </div>
            </div>
          </div> */}
        </div>

        {/* Navigation hints */}
        {/* <div className="mt-4 text-center text-white/60 text-sm">
          <p>👆 Tap sides to navigate • ⬆️ Swipe up for next</p>
          <p>Use arrow keys on desktop</p>
        </div> */}
      </div>
    </div>
  );
}