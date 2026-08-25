"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AutoScrollCarousel({ children, speed = 1 }: { children: React.ReactNode, speed?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstBlockRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    const firstBlock = firstBlockRef.current;
    if (!el || !firstBlock) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused && !isDragging) {
        el.scrollLeft += speed;
        
        // 24px is for gap-6
        const jumpDistance = firstBlock.clientWidth + 24; 
        
        if (el.scrollLeft >= jumpDistance) {
          el.scrollLeft -= jumpDistance;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseUpOrLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      className={`flex gap-6 overflow-x-auto w-full pb-8 pt-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <div ref={firstBlockRef} className="flex gap-6 shrink-0">
        {children}
      </div>
      <div className="flex gap-6 shrink-0">
        {children}
      </div>
    </div>
  );
}
