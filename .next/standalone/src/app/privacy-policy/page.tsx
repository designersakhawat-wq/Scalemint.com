"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useSiteConfig } from "@/context/SiteConfigContext";

const defaultContent = `1. Information We Collect\nWe collect information you provide directly to us when contacting our agency, requesting quotes, or signing up for consultations.\n\n2. How We Use Information\nWe use information to provide our services, process requests, improve client experience, and communicate strategy updates.\n\n3. Data Protection & Security\nWe employ industry-standard encryption and security protocols to safeguard your personal data and business information from unauthorized access.\n\n4. Contact Us About Privacy\nIf you have questions about this policy, please reach out to us at our official contact email.`;

export default function PrivacyPolicyPage() {
  const { settings } = useSiteConfig();
  const privacy = settings?.legalPages?.privacyPolicy || {
    title: "Privacy Policy",
    lastUpdated: "October 2026",
    content: defaultContent,
  };

  const title = privacy?.title || "Privacy Policy";
  const lastUpdated = privacy?.lastUpdated || "October 2026";
  const contentStr = typeof privacy?.content === "string" && privacy.content.trim().length > 0 ? privacy.content : defaultContent;
  const paragraphs = contentStr.split("\n\n");

  return (
    <main className="min-h-screen bg-[#040822]">
      <Navbar />
      
      <div className="pt-40 pb-32 px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-white/60 mb-12">
          Last Updated: {lastUpdated}
        </p>
        
        <div className="space-y-6">
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
