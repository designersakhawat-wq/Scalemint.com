"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { initialFaqs } from "@/data/initialData";
import { API_BASE_URL } from "@/lib/api";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const { settings } = useSiteConfig();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_faqs");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return initialFaqs;
  });

  const fetchFaqs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/faqs`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setFaqs(data.data);
          if (typeof window !== "undefined") {
            localStorage.setItem("scaleminte_faqs", JSON.stringify(data.data));
          }
        }
      }
    } catch {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("scaleminte_faqs");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) setFaqs(parsed);
          } catch {}
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchFaqs();

    const handleUpdate = () => {
      fetchFaqs();
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("scaleminte_faqs");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) setFaqs(parsed);
          } catch {}
        }
      }
    };

    window.addEventListener("scaleminte_faqs_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("scaleminte_faqs_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [fetchFaqs]);

  const faqImage = settings.faqSection?.image || "/images/corporate.jpg";
  const headline = settings.faqSection?.headline || "Frequently Asked Questions";
  const subtitle = settings.faqSection?.subtitle || "Powerful Digital Marketing Features That Drive Business Growth";

  return (
    <section className="bg-[#040822] py-24 px-8 relative z-10 text-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 items-start">
        
        {/* Left Column: FAQ Accordion */}
        <div className="lg:w-3/5 w-full flex flex-col justify-center">
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={faq.id || idx}
                  className={`border border-white/10 rounded-2xl p-6 transition-all duration-300 ${
                    isOpen ? "bg-white/5 border-brand-electric/40 shadow-[0_0_20px_rgba(27,67,255,0.15)]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-lg md:text-xl text-white gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-brand-electric text-white" : "text-slate-400"}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-white/10 text-slate-300 leading-relaxed text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Title & Image */}
        <div className="lg:w-2/5 w-full flex flex-col">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-6 w-fit shadow-[0_0_15px_rgba(27,67,255,0.2)]">
            <span>Support & Clarity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {headline}
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            {subtitle}
          </p>
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 group">
            <img 
              src={faqImage} 
              alt="FAQ Support" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040822] via-transparent to-transparent opacity-60"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
