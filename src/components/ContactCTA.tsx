"use client";

import React from "react";
import BeautifulForm from "./BeautifulForm";

export default function ContactCTA() {
  return (
    <section className="bg-[#040822] py-24 relative z-40 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Background Decorative Glow */}
        <div className="absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand-electric opacity-10 blur-[150px]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text */}
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              Let&apos;s Create <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-cyan-400 italic font-serif pr-4">Something Amazing</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-12 max-w-md">
              Ready to take your brand to the next level? Drop us a message and our team will get back to you with a custom strategy within 24 hours.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6 text-white group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-brand-electric/10 flex items-center justify-center text-brand-electric group-hover:bg-brand-electric group-hover:text-[#040822] transition-colors duration-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-xl font-bold group-hover:text-brand-electric transition-colors">hello@scaleminte.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Beautiful Form */}
          <div className="relative">
            <BeautifulForm />
          </div>

        </div>
      </div>
    </section>
  );
}
