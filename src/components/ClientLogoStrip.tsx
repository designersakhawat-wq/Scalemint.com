"use client";
import React from "react";

export default function ClientLogoStrip() {
  return (
    <div className="bg-[#040822] py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h3 className="text-2xl font-bold text-white mb-12 text-center tracking-wide">Trusted by 250+ Global Brands</h3>
        
        <div className="relative w-full overflow-hidden flex flex-col gap-10 opacity-80 mask-image-gradient">
          {/* Fade overlays for smooth marquee edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#040822] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#040822] to-transparent z-10 pointer-events-none"></div>

          {/* Row 1 */}
          <div className="flex gap-16 w-max animate-marquee hover:[animation-play-state:paused] items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg> Vercel
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> Supabase
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-[#5e6ad2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2L2 22h20L12 2z"/></svg> Linear
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4z"/></svg> Retool
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l8 8-8 8V4zm8 8l8 8V4l-8 8z"/></svg> Gorgias
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12h5v8h10v-8h5L12 2z"/></svg> DocShipper
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3 pr-16">
                  <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/></svg> Tamara
                </span>
              </div>
            ))}
          </div>
          
          {/* Row 2 */}
          <div className="flex gap-16 w-max animate-marquee-reverse hover:[animation-play-state:paused] items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="6" r="4"/><circle cx="18" cy="6" r="4"/><circle cx="6" cy="18" r="4"/><circle cx="18" cy="18" r="4"/></svg> Loom
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 18H2z"/></svg> Raycast
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-teal-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Klaviyo
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4z"/></svg> Attentive
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> Deel
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Gusto
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3 pr-16">
                  <svg className="w-8 h-8 text-[#ff6b6b]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> Peel
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
