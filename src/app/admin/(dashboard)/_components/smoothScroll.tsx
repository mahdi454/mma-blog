"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin( ScrollSmoother);

const SmootherWrapper = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      smootherRef.current = ScrollSmoother.create({
        content: containerRef.current,
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });
    }
    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} id="smooth-content">
      {children}
    </div>
  );
};

export default SmootherWrapper;