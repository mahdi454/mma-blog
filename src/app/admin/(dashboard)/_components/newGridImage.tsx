"use client";
import React, { useEffect, useRef } from "react";

export default function GridGallery() {
  const columnsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      
      columnsRef.current.forEach((col, i) => {
        if (!col) return;
        
        // Different parallax speeds for each column
        let speed = 0;
        switch (i) {
          case 0: speed = 0; break;      // Static
          case 1: speed = 0.2; break;    // Slow
          case 2: speed = 0; break;      // Static  
          case 3: speed = 0.2; break;   // Reverse direction
        }
        
        const yPos = scrollY * speed;
        col.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const columns = [
    // Column 0 - Static
    ["2-1", "2-2", "2-3", "2-4", "2-5"],
    // Column 1 - Moves down slowly
    ["1-1", "1-2", "1-3", "1-4"],
    // Column 2 - Static
    ["4-1", "4-2", "4-3", "4-4", "4-5"],
    // Column 3 - Moves up (reverse)
    ["5-1", "5-2", "5-3", "5-4"],
  ];

  return (

      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4  gap-8 overflow-hidden justify-center px-8 pt-12">
        {columns.map((images, i) => (
          <div
            key={i}
            ref={(el) => {
              columnsRef.current[i] = el!;
            }}
            className="grid gap-8 content-start will-change-transform"
          >
            {images.map((id) => (
              <img
                key={id}
                src={`https://picsum.photos/500/700?random=${id}`}
                alt=""
                className="w-full aspect-[5/7] bg-muted"
              />
            ))}
          </div>
        ))}
      </div>

  );
}