"use client";

import React from "react";
import { Button } from "./ui/Button";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Hero() {
  const { settings } = useSiteConfig();
  const siteName = settings.siteName || "Scaleminte";
  const tagline = settings.tagline || "We Build Brands That Drive Growth";

  return (
    <section className="relative pt-32 pb-48 px-4 overflow-hidden bg-brand-navy hero-pattern flex flex-col items-center justify-center text-center">
      
      <div className="flex flex-col items-center mt-12 z-10">
        <div data-aos="fade-down" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <div className="w-4 h-4 rounded-full bg-brand-electric flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-white/90 text-sm font-medium">{siteName} • Creative Support Agency</span>
        </div>

        <h1 data-aos="zoom-in" data-aos-delay="200" className="text-white text-5xl md:text-7xl font-bold max-w-4xl leading-tight tracking-tight mb-8">
          {tagline ? (
            tagline
          ) : (
            <>
              We <span className="font-serif italic font-normal text-brand-electric/90">Build</span> Brands That <br className="hidden md:block" />
              <span className="font-serif italic font-normal text-brand-electric/90">Drive</span> Growth
            </>
          )}
        </h1>

        <div data-aos="fade-up" data-aos-delay="400" className="flex items-center gap-4 mb-10">
          <div className="flex -space-x-3">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-slate-300 border-2 border-brand-navy overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-white text-sm font-medium">
            <span>5.0</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="ml-1 opacity-80">100+</span>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="500" className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact-us" variant="primary" className="text-base px-8 py-4">
            Get in Touch!
          </Button>
          <Button href="/packages" variant="secondary" className="text-base px-8 py-4">
            View Packages
          </Button>
        </div>
      </div>

    </section>
  );
}
