"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "gsap/dist/gsap"; // Optional: for Next.js to ensure client-side only

gsap.registerPlugin(ScrollSmoother);

const DynamicGrid = () => {
  const smootherContainer = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

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
      className={`${card.color} rounded-lg p-6 mb-4 h-96 shadow-lg transition-transform duration-75 hover:scale-105 hover:shadow-xl`}
    >
      <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
      <p className="text-white/90">{card.content}</p>
    </div>
  );

  useEffect(() => {
    if (smootherContainer.current) {
      smootherRef.current = ScrollSmoother.create({
        content: smootherContainer.current,
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
    <div ref={smootherContainer} id="smooth-content">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Smooth Dynamic Grid
          </h1>
          <p className="text-gray-600">
            Scroll down to watch shorter columns (2 & 4) align smoothly.
          </p>
        </div>

        {/* Grid */}
<div className="grid grid-cols-4 gap-6">
  {/* Column 1 */}
  <div className="space-y-4">
    {column1Cards.map((card) => (
      <Card key={card.id} card={card} />
    ))}
  </div>

  {/* Column 2 - Parallax */}
  <div className="space-y-4" data-speed="1.15">
    {column2Cards.map((card) => (
      <Card key={card.id} card={card} />
    ))}
  </div>

  {/* Column 3 */}
  <div className="space-y-4">
    {column3Cards.map((card) => (
      <Card key={card.id} card={card} />
    ))}
  </div>

  {/* Column 4 - Parallax */}
  <div className="space-y-4" data-speed="1.25">
    {column4Cards.map((card) => (
      <Card key={card.id} card={card} />
    ))}
  </div>
</div>

        {/* Footer */}
        <div className="bg-white p-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How it works</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Scroll down: shorter columns scroll slightly faster</li>
            <li>Scroll up: they smoothly realign with taller columns</li>
            <li>ScrollTrigger ties animation directly to scroll position</li>
            <li>Ultra smooth – no transform jumpiness</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DynamicGrid;