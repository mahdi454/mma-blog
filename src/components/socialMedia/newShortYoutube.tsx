"use client"
import React, { useCallback, useEffect, useState, useMemo } from 'react';

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
  type: 'youtube';
  videoId: string;
}

interface InstagramStory extends BaseStory {
  type: 'instagram';
  videoUrl: string;
}

type Story = YouTubeStory | InstagramStory;

// YouTube Player Component
const YouTubePlayer = React.memo(({ 
  videoId, 
  isActive, 
  onVideoEnd 
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

  // Load YouTube API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
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
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn('Error destroying YouTube player:', e);
        }
      }
    };
  }, [videoId]);

  const initializePlayer = useCallback(() => {
    if (!containerRef.current || playerRef.current) return;

    try {
      playerRef.current = new window.YT.Player(playerId, {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setIsReady(true);
            if (isActive) {
              playerRef.current?.playVideo();
            }
          },
          onStateChange: (event: any) => {
            const state = event.data;
            setIsPlaying(state === window.YT.PlayerState.PLAYING);
            
            if (state === window.YT.PlayerState.ENDED) {
              onVideoEnd();
            }
          },
          onError: (error: any) => {
            console.error('YouTube player error:', error);
          }
        },
      });
    } catch (error) {
      console.error('Failed to initialize YouTube player:', error);
    }
  }, [videoId, playerId, isActive, onVideoEnd]);

  // Handle active state changes
  useEffect(() => {
    if (!isReady || !playerRef.current) return;

    try {
      if (isActive) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (error) {
      console.error('Error controlling YouTube player:', error);
    }
  }, [isActive, isReady]);

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error('Error toggling YouTube player:', error);
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
      <div 
        ref={containerRef}
        id={playerId}
        className="w-full h-full"
      />
      
      {/* Play/Pause Overlay */}
      <div 
        className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
        onClick={togglePlayPause}
      >
        {!isPlaying && isReady && (
          <div className="bg-black/50 rounded-full p-4 transition-opacity hover:bg-black/70">
            <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-1" />
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
});


// Story Info Component
// const StoryInfo = React.memo(({ story }: { story: Story }) => (
//   <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
//     <div className="text-white space-y-2">
//       <div className="flex items-center gap-2">
//         <span className="text-2xl">{story.user.avatar}</span>
//         <span className="font-semibold">{story.user.username}</span>
//         {story.user.verified && <span className="text-blue-400">✓</span>}
//         <span className="text-white/60 text-sm ml-auto">{story.timestamp}</span>
//       </div>
//       <p className="text-sm opacity-90">{story.caption}</p>
//     </div>
//   </div>
// ));

// Main Story Carousel Component
export default function SocialStoryCarousel() {
  const stories: YouTubeStory[] = useMemo(() => [
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
      id: 3,
      type: 'youtube',
      videoId: 'mKdHxZd60vM',
      user: {
        username: 'creator_five',
        avatar: '🚀',
        verified: false
      },
      caption: 'Tech content! 💻',
      timestamp: '10h'
    },
    {
      id: 4,
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
  ], []);

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [touchStart, setTouchStart] = useState<number | null>(null);
  // const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // const nextStory = useCallback(() => {
  //   setCurrentIndex(prev => (prev + 1) % stories.length);
  // }, [stories.length]);

  // const prevStory = useCallback(() => {
  //   setCurrentIndex(prev => (prev - 1 + stories.length) % stories.length);
  // }, [stories.length]);

  // const handleVideoEnd = useCallback(() => {
  //   nextStory();
  // }, [nextStory]);

  // // Touch handlers
  // const onTouchStart = useCallback((e: React.TouchEvent) => {
  //   setTouchEnd(null);
  //   setTouchStart(e.targetTouches[0].clientY);
  // }, []);

  // const onTouchMove = useCallback((e: React.TouchEvent) => {
  //   setTouchEnd(e.targetTouches[0].clientY);
  // }, []);

  // const onTouchEnd = useCallback(() => {
  //   if (!touchStart || !touchEnd) return;
    
  //   const distance = touchStart - touchEnd;
  //   const isUpSwipe = distance > 50;
  //   const isDownSwipe = distance < -50;

  //   if (isUpSwipe) {
  //     nextStory();
  //   } else if (isDownSwipe) {
  //     prevStory();
  //   }
  // }, [touchStart, touchEnd, nextStory, prevStory]);

  // // Keyboard navigation
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     switch (e.key) {
  //       case 'ArrowUp':
  //       case 'ArrowRight':
  //         e.preventDefault();
  //         nextStory();
  //         break;
  //       case 'ArrowDown':
  //       case 'ArrowLeft':
  //         e.preventDefault();
  //         prevStory();
  //         break;
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => window.removeEventListener('keydown', handleKeyDown);
  // }, [nextStory, prevStory]);

  // // Get carousel indices for desktop view
  // const getCarouselIndices = useCallback(() => {
  //   const prev = (currentIndex - 1 + stories.length) % stories.length;
  //   const next = (currentIndex + 1) % stories.length;
  //   return [prev, currentIndex, next];
  // }, [currentIndex, stories.length]);

  // const carouselIndices = getCarouselIndices();
  // const currentStory = stories[currentIndex];

  // return (
  //   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
  //     <div className="relative w-full max-w-md md:max-w-6xl">
  //       {/* Story Progress Indicators */}
  //       <div className="flex gap-1 mb-4 px-2">
  //         {stories.map((_, index) => (
  //           <div
  //             key={index}
  //             className={`flex-1 h-1 rounded-full transition-all duration-300 ${
  //               index === currentIndex 
  //                 ? 'bg-white shadow-lg' 
  //                 : index < currentIndex 
  //                   ? 'bg-white/60' 
  //                   : 'bg-white/20'
  //             }`}
  //           />
  //         ))}
  //       </div>

  //       {/* Main Story Container */}
  //       <div 
  //         className="relative w-full h-[90vh] rounded-xl overflow-hidden shadow-2xl"
  //         onTouchStart={onTouchStart}
  //         onTouchMove={onTouchMove}
  //         onTouchEnd={onTouchEnd}
  //       >
  //         {/* Desktop Carousel View */}
  //         <div className="hidden md:flex absolute inset-0 items-center justify-center gap-8">
  //           {carouselIndices.map((storyIndex, position) => {
  //             const story = stories[storyIndex];
  //             const isCenter = position === 1;
              
              return (
                <div
                  key={story.id}
                  className={`
                    aspect-[9/16] transition-all duration-500 ease-out
                    ${isCenter 
                      ? 'w-80 scale-100 z-20 shadow-2xl' 
                      : 'w-64 scale-75 opacity-60 z-10'
                    }
                  `}
                  style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
                >
                  {story.type === 'youtube' && (
                    <YouTubePlayer
                      videoId={story.videoId}
                      isActive={isCenter}
                      onVideoEnd={handleVideoEnd}
                    />
                  )}
                </div>
              );
          //   })}
          // </div>

          {/* Mobile Single Story View */}
          {/* <div className="md:hidden absolute inset-0">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className={`absolute inset-0 transition-transform duration-300 ${
                  index === currentIndex 
                    ? 'translate-x-0' 
                    : index < currentIndex 
                      ? '-translate-x-full' 
                      : 'translate-x-full'
                }`}
              >
                {story.type === 'youtube' ? (
                  <YouTubePlayer
                    videoId={story.videoId}
                    isActive={index === currentIndex}
                    onVideoEnd={handleVideoEnd}
                  />
                ) : (
                  <InstagramEmbed
                    videoUrl={story.videoUrl}
                    isActive={index === currentIndex}
                  />
                )}
                {index === currentIndex && <StoryInfo story={currentStory} />}
              </div>
            ))}
          </div> */}

          {/* Navigation Areas */}
  //         <div 
  //           className="absolute left-0 top-0 w-1/3 h-full z-30 cursor-pointer"
  //           onClick={prevStory}
  //           aria-label="Previous story"
  //         />
  //         <div 
  //           className="absolute right-0 top-0 w-1/3 h-full z-30 cursor-pointer"
  //           onClick={nextStory}
  //           aria-label="Next story"
  //         />
  //       </div>

  //       {/* Navigation Hints */}
  //       <div className="mt-4 text-center text-white/60 text-sm space-y-1">
  //         <p className="hidden md:block">← → Arrow keys or click sides to navigate</p>
  //         <p className="md:hidden">👆 Tap sides • ⬆️ Swipe up/down to navigate</p>
  //       </div>
  //     </div>
  //   </div>
  // );
}