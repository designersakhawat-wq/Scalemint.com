"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { API_BASE_URL } from "@/lib/api";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([
    { id: "p1", title: "EduTech App Rebrand", category: "Graphic Design", image: "/images/startup.jpg", description: "Complete brand visual overhaul for an emerging education platform." },
    { id: "p2", title: "Brand Growth Strategy", category: "Social Media Management", image: "/images/storefront.jpg", description: "Omnichannel social media campaign scaling engagement by 340%." },
    { id: "p3", title: "Aurora & Co. E-commerce", category: "Web Development", image: "/images/ecommerce.jpg", description: "High-performance headless Shopify storefront with custom interactive 3D elements." },
    { id: "p4", title: "Nexus Plaza Corporate", category: "Video Editing", image: "/images/corporate.jpg", description: "Cinematic commercial video production and motion graphics series." },
    { id: "p5", title: "Social Media Campaign", category: "Meta Ads", image: "/images/startup.jpg", description: "High-converting Facebook & Instagram funnel generating 4.8x ROAS." },
    { id: "p6", title: "Local Artisan Reach", category: "Google Ads", image: "/images/storefront.jpg", description: "Laser-targeted Google Search and Local Services campaign." },
    { id: "p7", title: "Channel Optimization", category: "YouTube Video SEO", image: "/images/corporate.jpg", description: "Complete channel audit, thumbnail revamp, and SEO optimization." }
  ]);

  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/portfolio`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
        }
      })
      .catch(() => {});
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={project.id || idx} 
              data-aos="fade-up" 
              data-aos-delay={idx * 100} 
              onClick={() => setSelectedProject(project)}
              className="bg-[#0a0f2c] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(48,255,151,0.05)] group hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(48,255,151,0.15)] hover:border-brand-electric/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-brand-navy overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="bg-brand-electric text-white px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">View Project</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-sky-400 font-semibold text-sm mb-2 uppercase tracking-wider">{project.category}</p>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0f2c] border border-white/10 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/10">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-brand-electric text-white text-xs font-bold px-3 py-1 rounded-full">{selectedProject.category}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{selectedProject.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedProject.description || "Comprehensive creative delivery crafted with strategic intent to accelerate business growth."}
            </p>
            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs cursor-pointer hover:bg-white/20"
              >
                Close
              </button>
              <a 
                href={`/contact-us?project=${encodeURIComponent(selectedProject.title)}`}
                className="px-5 py-2 bg-brand-electric text-white font-bold rounded-xl text-xs cursor-pointer hover:bg-blue-600 flex items-center gap-1.5"
              >
                Start a Similar Project →
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
