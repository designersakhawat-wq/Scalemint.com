"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import BeautifulForm from "@/components/BeautifulForm";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-[#040822]">
      <Navbar />
      
      <div className="pt-40 pb-32 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Let&apos;s <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-cyan-400">talk</span> about your project.</h1>
          <p className="text-white/80 text-xl mb-16 max-w-lg leading-relaxed">
            Ready to drive growth for your brand? Get in touch with our team of experts to start your next big digital transformation.
          </p>
          
          <div className="space-y-10">
            <div className="flex items-center gap-6 group cursor-pointer">
               <div className="w-16 h-16 rounded-full bg-brand-electric/10 flex items-center justify-center shrink-0 group-hover:bg-brand-electric group-hover:text-[#040822] transition-colors duration-500 text-brand-electric">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               </div>
               <div>
                  <h4 className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-1">Email Us</h4>
                  <p className="text-white font-bold text-xl group-hover:text-brand-electric transition-colors">hello@scaleminte.com</p>
               </div>
            </div>
            <div className="flex items-center gap-6 group cursor-pointer">
               <div className="w-16 h-16 rounded-full bg-brand-electric/10 flex items-center justify-center shrink-0 group-hover:bg-brand-electric group-hover:text-[#040822] transition-colors duration-500 text-brand-electric">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               </div>
               <div>
                  <h4 className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-1">Visit Us</h4>
                  <p className="text-white font-bold text-xl group-hover:text-brand-electric transition-colors">123 Creative Avenue, NY 10001</p>
               </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-xl relative">
          {/* Subtle glow effect behind the form on contact page */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-electric/10 blur-[120px] rounded-full pointer-events-none"></div>
          <BeautifulForm />
        </div>
      </div>
    </main>
  );
}
