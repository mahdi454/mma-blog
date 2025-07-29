"use client";

import { lenis } from "@/app/context/smoothScroll";
import React, { useEffect, useRef } from "react";

export default function GridGallery() {
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const animationFrame = useRef<number>(0);

  useEffect(() => {
    if (!lenis) return;

const speeds = [ 0.09, -0.05, 0.1];

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      currentY.current = lerp(currentY.current, targetY.current, 0.09);

      columnsRef.current.forEach((col, i) => {
        if (!col) return;
        const speed = speeds[i];
        const yPos = currentY.current * speed;
        col.style.transform = `translateY(${yPos}px)`;
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    const updateScroll = () => {
      targetY.current = lenis!.scroll; // 👈 use global Lenis scroll
    };

    lenis.on("scroll", updateScroll);

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      lenis?.off("scroll", updateScroll);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const columns = [
    ["2-1", "2-2", "2-3", "2-4", "2-5"],
    ["1-1", "1-2", "1-3", "1-4"],
    ["4-1", "4-2", "4-3", "4-4", "4-5"],
  ];

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-8 overflow-hidden justify-center px-8 pt-12">
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
    </main>
  );
}
