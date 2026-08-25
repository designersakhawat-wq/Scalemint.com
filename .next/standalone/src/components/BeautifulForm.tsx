"use client";

import React, { useState } from "react";
import { submitContactMessage } from "@/lib/api";

export default function BeautifulForm() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await submitContactMessage(formData);
      setStatusMessage({
        type: "success",
        text: response.message || "Thanks for your message! Our team will get back to you within 24 hours.",
      });
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0a0f2c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
      {/* Subtle glow effect behind the form */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-electric/20 blur-[100px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-150"></div>
      
      <h3 className="text-3xl font-bold text-white mb-2">Send us a message</h3>
      <p className="text-slate-400 mb-8">Fill out the form below and we&apos;ll be in touch shortly.</p>
      
      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-2xl border text-sm font-medium transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">First Name</label>
            <input 
              type="text" 
              required
              disabled={isSubmitting}
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full bg-[#040822]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all shadow-inner disabled:opacity-50"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Last Name</label>
            <input 
              type="text" 
              required
              disabled={isSubmitting}
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full bg-[#040822]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all shadow-inner disabled:opacity-50"
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Email Address</label>
          <input 
            type="email" 
            required
            disabled={isSubmitting}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-[#040822]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all shadow-inner disabled:opacity-50"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Msg Note</label>
          <textarea 
            required
            rows={4}
            disabled={isSubmitting}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-[#040822]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all shadow-inner resize-none disabled:opacity-50"
            placeholder="Tell us about your project or goals..."
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-brand-electric to-cyan-400 text-[#040822] font-black text-lg rounded-2xl py-4 mt-4 hover:shadow-[0_0_30px_rgba(48,255,151,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-[#040822]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}
