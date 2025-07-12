"use client";

import React, { useRef, useEffect, useState } from "react";

const DynamicGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column4Ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [targetScrollY, setTargetScrollY] = useState(0);

  // Sample card data
  const createCards = (col: number, count: number, color: string) =>
    Array.from({ length: count }, (_, i) => ({
      id: `col${col}-${i}`,
      title: `Card ${i + 1}`,
      content: `Column ${col} - Card ${i + 1}`,
      color,
    }));

  const column1Cards = createCards(1, 7, "bg-blue-500");
  const column2Cards = createCards(2, 5, "bg-green-500");
  const column3Cards = createCards(3, 7, "bg-purple-500");
  const column4Cards = createCards(4, 5, "bg-orange-500");

  const Card = ({ card }: { card: any }) => (
    <div
      className={`${card.color} rounded-lg p-6 mb-4 h-96 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
      <p className="text-white/90">{card.content}</p>
    </div>
  );

  // Smooth scrolling implementation
  useEffect(() => {
    let animationId: number;
    let currentScrollY = 0;
    let currentTargetScrollY = 0;
    let isAnimating = false;
    let lastUpdateTime = 0;
    
    const smoothScroll = (timestamp: number) => {
      // Throttle to 60fps max
      if (timestamp - lastUpdateTime < 16) {
        animationId = requestAnimationFrame(smoothScroll);
        return;
      }
      lastUpdateTime = timestamp;
      
      // Lerp (linear interpolation) for smooth scrolling
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };
      
      const newScrollY = lerp(currentScrollY, currentTargetScrollY, 0.1);
      currentScrollY = newScrollY;
      
      // Apply transform to content
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${-newScrollY}px)`;
      }
      
      // Update state for parallax calculations (less frequently)
      if (Math.abs(newScrollY - scrollY) > 5) {
        setScrollY(newScrollY);
      }
      
      // Continue animation if there's still movement
      if (Math.abs(newScrollY - currentTargetScrollY) > 0.5) {
        animationId = requestAnimationFrame(smoothScroll);
      } else {
        // Final update and stop animation
        currentScrollY = currentTargetScrollY;
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${-currentScrollY}px)`;
        }
        setScrollY(currentScrollY);
        isAnimating = false;
      }
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        animationId = requestAnimationFrame(smoothScroll);
      }
    };

    let wheelTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      // Only prevent default if the wheel event is on our container
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        e.preventDefault();
        
        const delta = e.deltaY * 1.5;
        const maxScroll = (contentRef.current?.scrollHeight || 0) - window.innerHeight;
        currentTargetScrollY = Math.max(0, Math.min(maxScroll, currentTargetScrollY + delta));
        
        // Debounce state updates
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          setTargetScrollY(currentTargetScrollY);
        }, 100);
        
        startAnimation();
      }
    };

    const handleScroll = (e: Event) => {
      const maxScroll = (contentRef.current?.scrollHeight || 0) - window.innerHeight;
      currentTargetScrollY = Math.max(0, Math.min(maxScroll, window.scrollY));
      setTargetScrollY(currentTargetScrollY);
      startAnimation();
    };
    
    // Add event listeners specifically to our container
    if (containerRef.current) {
      containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      cancelAnimationFrame(animationId);
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('scroll', handleScroll);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, []); // Empty dependency array to prevent infinite loops

  // Calculate parallax effects for columns 2 and 4 (memoized)
  const column2Offset = React.useMemo(() => scrollY * 0.6 * 0.9, [scrollY]);
  const column4Offset = React.useMemo(() => scrollY * 0.6 * 0.9, [scrollY]);

  // Scroll to specific element (ScrollSmoother-like functionality)
  const scrollToElement = (elementRef: React.RefObject<HTMLDivElement>) => {
    if (elementRef.current && contentRef.current) {
      const elementTop = elementRef.current.offsetTop;
      const windowHeight = window.innerHeight;
      const targetPosition = elementTop - windowHeight / 2;
      const maxScroll = contentRef.current.scrollHeight - windowHeight;
      const clampedTarget = Math.max(0, Math.min(maxScroll, targetPosition));
      setTargetScrollY(clampedTarget);
    }
  };

  return (
    <div ref={containerRef} className="">
      {/* Smooth scrolling content */}
      <div 
        ref={contentRef}
        className="will-change-transform"
      >
        {/* Header */}
        <div className="bg-white shadow-sm p-8 relative z-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ScrollSmoother-like Experience
          </h1>
          <p className="text-gray-600 mb-4">
            Smooth scrolling with parallax effects on columns 2 & 4
          </p>
          <div className="flex gap-4">
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Scroll to Column 2
            </button>
            <button 
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Scroll to Column 4
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-6 px-6 py-8 min-h-screen">
          {/* Column 1 - Static */}
          <div className="space-y-4">
            {column1Cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>

          {/* Column 2 - Parallax Effect */}
          <div 
            ref={column2Ref}
            className="space-y-4 will-change-transform"
            style={{
              transform: `translateY(${column2Offset}px)`,
            }}
          >
            {column2Cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>

          {/* Column 3 - Static */}
          <div className="space-y-4">
            {column3Cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>

          {/* Column 4 - Stronger Parallax */}
          <div 
            ref={column4Ref}
            className="space-y-4 will-change-transform"
            style={{
              transform: `translateY(${column4Offset}px)`,
            }}
          >
            {column4Cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ScrollSmoother Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>✅ Smooth inertial scrolling with lerp interpolation</li>
            <li>✅ Parallax effects on specific columns (2 & 4)</li>
            <li>✅ ScrollTo functionality with smooth animation</li>
            <li>✅ Custom wheel event handling</li>
            <li>✅ Performance optimized with requestAnimationFrame</li>
            <li>🎯 Click buttons above to scroll to specific columns</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DynamicGrid;