"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { API_BASE_URL } from "@/lib/api";

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([
    {
      id: "pkg_1",
      name: "Starter",
      price: "$999",
      description: "Perfect for small businesses looking to establish a digital presence.",
      isPopular: false,
      badgeText: "Starter Choice",
      buttonText: "Choose Starter Plan",
      buttonLink: "/contact-us?plan=Starter",
      features: [
        "Brand Identity (Logo & Guidelines)",
        "Basic Website (Up to 5 Pages)",
        "1 Month SEO Setup",
        "Social Media Templates"
      ]
    },
    {
      id: "pkg_2",
      name: "Professional",
      price: "$2,499",
      description: "Comprehensive solutions for growing brands needing a competitive edge.",
      isPopular: true,
      badgeText: "MOST POPULAR",
      buttonText: "Choose Professional Plan",
      buttonLink: "/contact-us?plan=Professional",
      features: [
        "Advanced Brand Identity",
        "E-Commerce or Custom Web App",
        "3 Months SEO & Content Strategy",
        "Google & Meta Ads Setup",
        "Priority Support"
      ]
    },
    {
      id: "pkg_3",
      name: "Enterprise",
      price: "Custom",
      description: "Tailored full-scale digital transformation for large corporations.",
      isPopular: false,
      badgeText: "Enterprise Grade",
      buttonText: "Choose Enterprise Plan",
      buttonLink: "/contact-us?plan=Enterprise",
      features: [
        "Full-Scale Rebranding",
        "Complex Web Platform Development",
        "Ongoing Marketing Management",
        "Dedicated Account Manager",
        "24/7 Premium Support"
      ]
    }
  ]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/packages`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPackages(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-[#040822]">
      <Navbar />
      
      <div className="pt-40 pb-32 px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
          Our <span className="font-serif italic text-brand-electric">Pricing</span> Packages
        </h1>
        <p className="text-white/80 text-xl max-w-2xl mx-auto mb-16">
          Transparent pricing for premium creative and digital support services. Choose the plan that fits your growth goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {packages.map((pkg, idx) => {
            const btnLink = pkg.buttonLink || `/contact-us?plan=${encodeURIComponent(pkg.name)}`;
            const btnText = pkg.buttonText || `Choose ${pkg.name} Plan`;
            const badge = pkg.badgeText || "MOST POPULAR";

            return (
              <div
                key={pkg.id || idx}
                className={`relative bg-white rounded-[2rem] p-8 shadow-xl flex flex-col justify-between transition-all duration-300 ${
                  pkg.isPopular
                    ? "border-4 border-brand-electric transform md:-translate-y-4 shadow-[0_20px_50px_rgba(27,67,255,0.2)]"
                    : "border border-transparent hover:-translate-y-1"
                }`}
              >
                <div>
                  {pkg.isPopular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-electric text-white px-5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-brand-electric/40">
                      {badge}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">{pkg.description}</p>
                  <div className="text-5xl font-bold text-brand-navy mb-8 tracking-tight">{pkg.price}</div>
                  
                  <ul className="space-y-4 mb-8">
                    {pkg.features?.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-start gap-3 text-slate-700 text-sm">
                        <svg className="w-5 h-5 text-brand-electric shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  href={btnLink} 
                  variant={pkg.isPopular ? "primary" : "outline"} 
                  className="w-full py-4 font-bold text-sm"
                >
                  {btnText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
