"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { initialPackages } from "@/data/initialData";
import { API_BASE_URL } from "@/lib/api";

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>(initialPackages);
  const [mounted, setMounted] = useState(false);

  const fetchPackages = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/packages`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPackages(json.data);
          if (typeof window !== "undefined") {
            localStorage.setItem("scaleminte_packages", JSON.stringify(json.data));
          }
          return;
        }
      }
    } catch {}

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_packages");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPackages(parsed);
          }
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchPackages();

    const handleUpdate = () => {
      fetchPackages();
    };

    window.addEventListener("scaleminte_packages_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("scaleminte_packages_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [fetchPackages]);

  const displayPackages = Array.isArray(packages) && packages.length > 0 ? packages : initialPackages;

  return (
    <main className="min-h-screen bg-[#040822]">
      <div className="bg-[#040822] pb-32">
        <Navbar />
        <div className="pt-40 px-8 max-w-4xl mx-auto text-center">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-6">Our Pricing Packages</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Transparent, ROI-focused solutions designed to scale your business smoothly at every growth stage.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 -mt-20 relative z-10 pb-32">
        {displayPackages.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-lg">
            No pricing packages available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPackages.map((pkg, idx) => {
              const pkgName = pkg?.name || `Package #${idx + 1}`;
              const features = Array.isArray(pkg?.features) ? pkg.features : [];
              const buttonHref = pkg?.buttonLink || `/contact-us?plan=${encodeURIComponent(pkgName)}`;

              return (
                <div 
                  key={pkg?.id || idx} 
                  className={`bg-[#0a0f2c] border rounded-[2.5rem] p-10 flex flex-col relative transition-all duration-300 ${
                    pkg?.isPopular ? 'border-brand-electric shadow-[0_0_50px_rgba(27,67,255,0.25)] -translate-y-2' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {pkg?.isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-electric text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                      {pkg?.badgeText || "Most Popular"}
                    </span>
                  )}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkgName}</h3>
                    <p className="text-slate-400 text-sm">{pkg?.description || ""}</p>
                  </div>
                  <div className="mb-8">
                    <span className="text-5xl font-extrabold text-white">{pkg?.price || "Custom"}</span>
                    {pkg?.price && pkg.price !== "Custom" && <span className="text-slate-400 text-sm ml-2">/ month</span>}
                  </div>
                  <div className="flex-1 mb-10">
                    <p className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-4">Included Features:</p>
                    <ul className="space-y-4">
                      {features.map((feat: any, fIdx: number) => {
                        const featText = typeof feat === "string" ? feat : feat?.title || feat?.name || "Feature included";
                        return (
                          <li key={fIdx} className="flex items-center gap-3 text-slate-300 text-sm">
                            <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{featText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <Button 
                    href={buttonHref} 
                    variant={pkg?.isPopular ? 'primary' : 'outline'} 
                    className="w-full py-4 text-center justify-center font-bold"
                  >
                    {pkg?.buttonText || `Get Started with ${pkgName}`}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
