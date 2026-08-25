"use client";

import React from "react";
import AutoScrollCarousel from "./AutoScrollCarousel";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function ProjectCarousel() {
  const { settings } = useSiteConfig();
  const carouselProjects = settings.images?.heroCarousel || [
    { id: "c1", title: "Educational Design", url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80", position: "center" },
    { id: "c2", title: "SaaS Dashboard", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", position: "center" },
    { id: "c3", title: "E-Commerce App", url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80", position: "center" },
    { id: "c4", title: "Corporate Identity", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", position: "center" },
    { id: "c5", title: "Social Media Platform", url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80", position: "center" },
  ];

  const config = settings.carouselConfig || {
    cardWidth: "480px",
    aspectRatio: "16/10",
    radius: "rounded-[2rem]",
  };

  const getAspectClass = (ar?: string) => {
    if (ar === "16/9") return "aspect-video";
    if (ar === "1/1") return "aspect-square";
    if (ar === "4/5") return "aspect-[4/5]";
    if (ar === "4/3") return "aspect-[4/3]";
    return "aspect-[16/10]";
  };

  return (
    <div data-aos="fade-up" data-aos-delay="600" className="relative -mt-24 z-20 w-full overflow-hidden pb-16 group mask-image-gradient">
      {/* Fade overlays for smooth marquee edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#040822] to-transparent z-30 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#040822] to-transparent z-30 pointer-events-none"></div>

      <AutoScrollCarousel speed={1}>
        {carouselProjects.map((project, idx) => (
          <div 
            key={project.id || idx} 
            style={{
              width: config.cardWidth || undefined,
            }}
            className={`flex-none ${getAspectClass(config.aspectRatio)} ${config.radius || "rounded-[2rem]"} transition-transform duration-500 hover:-translate-y-3 shadow-2xl shadow-brand-navy/50 relative overflow-hidden bg-slate-900 border border-white/10`}
          >
            {/* Pure 100% Edge-to-Edge Image with configurable position */}
            <img
              src={project.url}
              alt={project.title}
              style={{
                objectPosition: (project.position as any) || "center",
              }}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Gradient Overlay & Title */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040822]/90 via-[#040822]/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <span className="text-white font-bold text-lg drop-shadow-lg">{project.title}</span>
            </div>
          </div>
        ))}
      </AutoScrollCarousel>
    </div>
  );
}
