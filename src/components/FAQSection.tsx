"use client";

import React, { useState, useEffect } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { API_BASE_URL } from "@/lib/api";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
  {
    id: "faq_1",
    question: "How Quickly Can We Launch Our Marketing Campaign?",
    answer: "Most digital marketing and advertising campaigns are strategized, configured, and launched within 3 to 7 business days following our initial kickoff call and asset collection."
  },
  {
    id: "faq_2",
    question: "Do You Provide Transparent Weekly Reports?",
    answer: "Absolutely. We provide real-time dashboard access alongside structured weekly and monthly performance analysis detailing ROI, CPA, conversions, and revenue impact."
  },
  {
    id: "faq_3",
    question: "Can I Customize Or Upgrade My Package Anytime?",
    answer: "Yes, you can easily scale up, downgrade, or request custom deliverables anytime as your business requirements evolve."
  },
  {
    id: "faq_4",
    question: "Do You Handle Everything For Me?",
    answer: "Yes! We offer end-to-end digital marketing and design solutions, so you can focus on running your business while we handle the creative and technical work."
  }
];

export default function FAQSection() {
  const { settings } = useSiteConfig();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);

  useEffect(() => {
    fetch(`${API_BASE_URL}/faqs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setFaqs(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const faqImage = settings.faqSection?.image || "/images/corporate.jpg";
  const headline = settings.faqSection?.headline || "Frequently Asked Questions";
  const subtitle = settings.faqSection?.subtitle || "Powerful Digital Marketing Features That Drive Business Growth";

  return (
    <section className="bg-[#040822] py-24 px-8 relative z-10 text-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 items-start">
        
        {/* Left Column: FAQ Accordion */}
        <div className="flex-1 w-full space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={faq.id || idx} 
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="border border-white/10 rounded-3xl bg-[#0a0f2c] overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button 
                className="w-full px-8 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl font-light text-brand-electric">{openIndex === idx ? "-" : "+"}</span>
                  <span className="font-semibold text-lg text-white">{faq.question}</span>
                </div>
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === idx ? "max-h-60 pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-slate-400 pl-8 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Text & Image */}
        <div data-aos="fade-left" className="flex-1 w-full">
          <p className="text-sm font-bold uppercase tracking-widest mb-4 text-brand-electric">( FAQ&apos;S )</p>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-white">
            {headline} <br />
            <span className="bg-brand-electric text-white px-4 py-1 mt-2 inline-block rounded-lg shadow-[0_0_20px_rgba(27,67,255,0.4)]">
              {settings.siteName || "Scaleminte"}
            </span>
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            {subtitle}
          </p>

          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-2xl mt-8 border border-white/10 bg-slate-900">
            <img 
              src={faqImage} 
              alt="Scaleminte FAQ Banner" 
              className="w-full h-full object-cover"
            />
            
            {/* Floating Contact Card */}
            <div className="absolute bottom-6 left-6 bg-[#0a0f2c]/90 backdrop-blur-md text-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-brand-electric flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight">Contact Us Now!</h4>
                <p className="text-slate-400 text-sm">{settings.contactEmail || "hello@scaleminte.com"}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
