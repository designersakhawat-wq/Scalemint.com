"use client";

import React, { useState } from "react";

interface FAQ {
  title: string;
  content: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="border-b border-white/10 py-6 cursor-pointer group"
            onClick={() => toggleOpen(index)}
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${isOpen ? "text-brand-electric" : "text-white group-hover:text-slate-300"}`}>
                {faq.title}
              </h4>
              <div className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                <svg className={`w-6 h-6 ${isOpen ? "text-brand-electric" : "text-slate-500 group-hover:text-slate-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
            >
              <p className="text-slate-400 text-lg leading-relaxed pr-8">
                {faq.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
