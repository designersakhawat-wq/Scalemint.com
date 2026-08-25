"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useSiteConfig } from "@/context/SiteConfigContext";

const defaultContent = `1. Acceptance of Terms\nBy accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.\n\n2. Provision of Services\nScaleminte provides digital marketing, web development, and design services. We reserve the right to modify or discontinue services with or without notice.\n\n3. Client Responsibilities\nYou agree to provide us with everything needed to complete the project, including assets, text, images, and other information in a timely manner.\n\n4. Intellectual Property\nAll custom deliverables created for the client become client property upon full payment completion, while Scaleminte retains rights to showcase work in its portfolio.`;

export default function TermsAndConditionPage() {
  const { settings } = useSiteConfig();
  const terms = settings?.legalPages?.termsAndConditions || {
    title: "Terms and Condition",
    lastUpdated: "October 2026",
    content: defaultContent,
  };

  const title = terms?.title || "Terms and Condition";
  const lastUpdated = terms?.lastUpdated || "October 2026";
  const contentStr = typeof terms?.content === "string" && terms.content.trim().length > 0 ? terms.content : defaultContent;
  const paragraphs = contentStr.split("\n\n");

  return (
    <main className="min-h-screen bg-[#040822]">
      <Navbar />
      
      <div className="pt-40 pb-32 px-8 max-w-4xl mx-auto">
        <h1 data-aos="fade-up" className="text-4xl md:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        <p data-aos="fade-up" data-aos-delay="100" className="text-white/60 mb-12">
          Last Updated: {lastUpdated}
        </p>
        
        <div data-aos="fade-up" data-aos-delay="200" className="space-y-6">
          {paragraphs.map((p, idx) => {
            const lines = p.split("\n");
            if (lines.length > 1 && /^\d+\./.test(lines[0])) {
              return (
                <div key={idx} className="bg-[#0b1138] border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-2">{lines[0]}</h2>
                  <p className="text-slate-400 leading-relaxed text-sm">{lines.slice(1).join(" ")}</p>
                </div>
              );
            }
            return (
              <div key={idx} className="bg-[#0b1138] border border-white/10 rounded-2xl p-6">
                <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-line">{p}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
