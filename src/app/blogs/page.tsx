"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { initialBlogs } from "@/data/initialData";
import { API_BASE_URL } from "@/lib/api";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>(initialBlogs);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const items = Array.isArray(json.data) ? json.data : json.data.items;
          if (Array.isArray(items) && items.length > 0) {
            setBlogs(items);
            if (typeof window !== "undefined") {
              localStorage.setItem("scaleminte_blogs", JSON.stringify(items));
            }
            return;
          }
        }
      }
    } catch {}

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_blogs");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBlogs(parsed);
          }
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    fetchBlogs();

    const handleUpdate = () => {
      fetchBlogs();
    };

    window.addEventListener("scaleminte_blogs_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("scaleminte_blogs_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [fetchBlogs]);

  const displayBlogs = Array.isArray(blogs) && blogs.length > 0 ? blogs : initialBlogs;

  return (
    <main className="min-h-screen bg-[#040822]">
      <div className="bg-[#040822] pb-32">
        <Navbar />
        <div className="pt-40 px-8 max-w-4xl mx-auto text-center">
          <h1 data-aos="fade-up" className="text-white text-5xl md:text-6xl font-bold mb-6">Our Blog & Insights</h1>
          <p data-aos="fade-up" data-aos-delay="100" className="text-white/80 text-xl max-w-2xl mx-auto">
            Thoughts, tips, and strategies on design, digital marketing, and business growth.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 -mt-20 relative z-10 pb-32">
        {displayBlogs.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-lg">
            No blog articles published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {displayBlogs.map((blog, idx) => {
              const blogImg = blog?.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
              const blogTitle = blog?.title || `Article #${idx + 1}`;
              const blogCategory = blog?.category || "Strategy";
              const blogDate = blog?.date || "Recent";
              const blogExcerpt = blog?.excerpt || "";

              return (
                <div 
                  key={blog?.id || idx} 
                  data-aos="fade-up" 
                  data-aos-delay={idx * 100} 
                  className="bg-[#0a0f2c] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(48,255,151,0.05)] flex flex-col group hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(48,255,151,0.15)] hover:border-brand-electric/30 transition-all duration-300"
                >
                  <div className="w-full h-72 overflow-hidden relative cursor-pointer" onClick={() => setSelectedArticle(blog)}>
                    <img 
                      src={blogImg} 
                      alt={blogTitle} 
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                  <div className="p-8 md:p-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-5">
                       <span className="bg-brand-electric/10 border border-brand-electric/20 text-sky-400 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(27,67,255,0.2)]">{blogCategory}</span>
                       <span className="text-slate-400 text-sm">{blogDate}</span>
                    </div>
                    <h3 onClick={() => setSelectedArticle(blog)} className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-brand-electric transition-colors cursor-pointer leading-tight">
                      {blogTitle}
                    </h3>
                    <p className="text-slate-400 mb-8 flex-1 leading-relaxed text-base">{blogExcerpt}</p>
                    <div className="mt-auto">
                      <button 
                        onClick={() => setSelectedArticle(blog)} 
                        className="inline-flex items-center gap-2 font-bold text-brand-electric hover:text-white transition-colors cursor-pointer text-sm"
                      >
                        Read Article 
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0a0f2c] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 relative shadow-2xl">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <span className="text-sky-400 font-bold uppercase tracking-wider text-xs bg-brand-electric/10 px-3 py-1 rounded-full border border-brand-electric/20 inline-block mb-4">
              {selectedArticle?.category || "Article"}
            </span>
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">{selectedArticle?.title}</h2>
            <div className="w-full h-80 rounded-2xl overflow-hidden mb-6">
              <img 
                src={selectedArticle?.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"} 
                alt={selectedArticle?.title || "Article Image"} 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="text-slate-300 leading-relaxed space-y-4 text-lg">
              <p>{selectedArticle?.excerpt}</p>
              <p>{selectedArticle?.content}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
