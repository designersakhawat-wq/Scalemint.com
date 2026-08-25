"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { initialPortfolio } from "@/data/initialData";
import { API_BASE_URL } from "@/lib/api";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>(initialPortfolio);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProjects(json.data);
          if (typeof window !== "undefined") {
            localStorage.setItem("scaleminte_portfolio", JSON.stringify(json.data));
          }
          return;
        }
      }
    } catch {}

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_portfolio");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjects(parsed);
          }
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    fetchProjects();

    const handleUpdate = () => {
      fetchProjects();
    };

    window.addEventListener("scaleminte_portfolio_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("scaleminte_portfolio_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [fetchProjects]);

  const displayProjects = Array.isArray(projects) && projects.length > 0 ? projects : initialPortfolio;

  return (
    <main className="min-h-screen bg-[#040822]">
      <div className="bg-[#040822] pb-32">
        <Navbar />
        <div className="pt-40 px-8 max-w-4xl mx-auto text-center">
          <h1 data-aos="fade-up" className="text-white text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
          <p data-aos="fade-up" data-aos-delay="100" className="text-white/80 text-xl max-w-2xl mx-auto">
            A showcase of our best work. We build brands that drive real, measurable growth.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 -mt-20 relative z-10 pb-32">
        {displayProjects.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-lg">
            No portfolio projects published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, idx) => {
              const projImg = project?.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
              const projTitle = project?.title || `Project #${idx + 1}`;
              const projCategory = project?.category || "Showcase";
              const projDesc = project?.description || "A custom project developed and delivered for measurable business growth.";

              return (
                <div 
                  key={project?.id || idx} 
                  data-aos="fade-up" 
                  data-aos-delay={idx * 100} 
                  onClick={() => setSelectedProject(project)}
                  className="bg-[#0a0f2c] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(48,255,151,0.05)] group hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(48,255,151,0.15)] hover:border-brand-electric/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] bg-brand-navy overflow-hidden relative">
                    <img 
                      src={projImg} 
                      alt={projTitle} 
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="bg-brand-electric text-white px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">View Project</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-sky-400 font-semibold text-sm mb-2 uppercase tracking-wider">{projCategory}</p>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-electric transition-colors">{projTitle}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{projDesc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0a0f2c] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 relative shadow-2xl">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <span className="text-sky-400 font-bold uppercase tracking-wider text-xs bg-brand-electric/10 px-3 py-1 rounded-full border border-brand-electric/20 inline-block mb-4">
              {selectedProject?.category || "Project"}
            </span>
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">{selectedProject?.title}</h2>
            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6">
              <img 
                src={selectedProject?.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"} 
                alt={selectedProject?.title || "Project Image"} 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="text-slate-300 leading-relaxed space-y-4 text-base">
              <p>{selectedProject?.description || "A strategic creative and marketing campaign executed for measurable conversion growth and brand identity elevation."}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
