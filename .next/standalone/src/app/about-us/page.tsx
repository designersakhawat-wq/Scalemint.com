"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function AboutUsPage() {
  const { settings } = useSiteConfig();
  const siteName = settings.siteName || "Scaleminte";
  const tagline = settings.tagline || "We Build Brands That Drive Growth";

  return (
    <main className="min-h-screen bg-[#040822]">
      <Navbar />
      
      <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto text-center relative z-10">
        <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-bold mb-6 text-white">
          We are <span className="font-serif italic text-brand-electric">{siteName}</span>
        </h1>
        <p data-aos="fade-up" data-aos-delay="100" className="text-white/80 text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
          {settings.heroSubtitle || tagline}
        </p>
      </div>

      <div className="bg-white rounded-tl-[4rem] rounded-tr-[4rem] px-8 py-24 relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div data-aos="fade-right" className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img src="/images/startup.jpg" alt="Our Team" className="w-full h-full object-cover" />
            </div>
            <div data-aos="zoom-in" data-aos-delay="300" className="absolute -bottom-8 -right-8 bg-brand-electric text-white p-8 rounded-[2rem] shadow-xl z-20 max-w-[200px]">
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-sm font-semibold opacity-90 uppercase tracking-wide">Years of Experience</div>
            </div>
          </div>

          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Driven by Creativity, <br/> Fueled by Data.</h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              At {siteName}, we don&apos;t just design beautiful graphics or build functional websites. We engineer growth. 
              Our team consists of passionate strategists, designers, and developers who work collaboratively to ensure every touchpoint of your brand is impactful.
            </p>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed">
              Whether you are a startup looking to make your mark or a large corporation needing a digital overhaul, we have the expertise to elevate your brand to the next level.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button href="/contact-us" variant="primary" className="py-4 px-8">
                Work With Us
              </Button>
              <Button href="/portfolio" variant="outline" className="py-4 px-8">
                View Portfolio
              </Button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
