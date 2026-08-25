"use client";
import React, { useState, useEffect, useRef } from "react";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isIntersecting, end, duration]);

  return { count, ref };
}

function StatCard({ stat, delay }: { stat: any; delay: number }) {
  const { count, ref } = useCountUp(parseInt(stat.number), 2500);

  return (
    <div ref={ref} data-aos="fade-up" data-aos-delay={delay} className="flex flex-col">
      <div className="flex items-baseline gap-1 mb-4">
        <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tight">{count}</h3>
        <span className="text-3xl font-semibold text-brand-electric">{stat.suffix}</span>
      </div>
      
      <div className="w-24 h-[2px] bg-white/10 mb-6 relative">
        <div className="absolute top-0 left-0 h-full bg-brand-electric w-1/3" />
      </div>

      <h4 className="text-xl font-bold text-white mb-2">{stat.title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">
        {stat.desc}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      number: "350",
      suffix: "+",
      title: "Projects Completed",
      desc: "Successfully delivered tailored digital solutions across diverse industries."
    },
    {
      number: "250",
      suffix: "+",
      title: "Global Clients",
      desc: "Building trusted, long-term partnerships with businesses worldwide."
    },
    {
      number: "99",
      suffix: "%",
      title: "Satisfaction Rate",
      desc: "Committed to exceeding client expectations with premium quality work."
    },
    {
      number: "5",
      suffix: "+",
      title: "Years Experience",
      desc: "Proven track record in digital strategy, marketing, and creative design."
    }
  ];

  return (
    <section className="bg-[#040822] py-24 px-8 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} delay={idx * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
