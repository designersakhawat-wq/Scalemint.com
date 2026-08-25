"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { API_BASE_URL } from "@/lib/api";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([
    {
      id: "b1",
      title: "10 Graphic Design Trends to Watch in 2024",
      category: "Graphic Design",
      date: "Jan 12, 2024",
      image: "/images/startup.jpg",
      excerpt: "Stay ahead of the curve. Discover the top visual trends that are capturing audience attention and elevating brand identities this year.",
      content: "Visual storytelling is evolving faster than ever. In 2024, minimalist brand identities combined with high-contrast electric accents and 3D elements dominate the design landscape. Brands prioritizing clean typography and bold layouts are seeing significant improvements in brand recall and trust."
    },
    {
      id: "b2",
      title: "The Ultimate Guide to Modern Web Development",
      category: "Web Development",
      date: "Feb 05, 2024",
      image: "/images/corporate.jpg",
      excerpt: "From headless CMS to edge computing, learn how modern web development frameworks are ensuring lightning-fast and scalable websites.",
      content: "Fast load times directly correlate with higher conversion rates. By utilizing server-side rendering, component-driven architectures, and modern CSS practices, fast-growing companies build frictionless user journeys that turn casual visitors into loyal paying customers."
    },
    {
      id: "b3",
      title: "Why Video Editing is Crucial for Social Media Success",
      category: "Video Editing",
      date: "Feb 18, 2024",
      image: "/images/ecommerce.jpg",
      excerpt: "Short-form video is dominating the internet. Learn how professional video editing can dramatically increase your engagement and retention rates.",
      content: "Hooking your viewer within the first 3 seconds is the key to viral engagement. Fast cuts, punchy sound design, and animated kinetic typography keep audiences glued to your videos, significantly boosting watch time and organic algorithm reach."
    },
    {
      id: "b4",
      title: "Maximizing ROI with Targeted Meta Ads",
      category: "Meta Ads",
      date: "Mar 02, 2024",
      image: "/images/storefront.jpg",
      excerpt: "Stop wasting ad spend. Here is our step-by-step framework for setting up highly profitable Facebook and Instagram ad campaigns.",
      content: "Profitable advertising isn't luck—it's structured testing. By implementing Conversions API (CAPI), high-converting creative angles, and tiered retargeting funnels, brands consistently lower Cost Per Acquisition while scaling monthly revenue."
    },
    {
      id: "b5",
      title: "How to Lower Your Google Ads CPC in 30 Days",
      category: "Google Ads",
      date: "Mar 15, 2024",
      image: "/images/startup.jpg",
      excerpt: "Are your search campaigns too expensive? Learn actionable strategies to improve your Quality Score and drive down your Cost Per Click.",
      content: "Improving Quality Score is the fastest way to slash ad costs. By aligning search keyword intent with laser-targeted landing page copy, your ads achieve higher ad rank at lower bids, maximizing ROI on every dollar spent."
    },
    {
      id: "b6",
      title: "The Psychology Behind High-Converting UI/UX Design",
      category: "UI/UX Design",
      date: "Mar 28, 2024",
      image: "/images/storefront.jpg",
      excerpt: "Great design isn't just about looking good—it's about directing user behavior. Uncover the psychological principles that drive conversions.",
      content: "Visual hierarchy guides the user's subconscious eye. By placing prominent call-to-action buttons, maintaining generous whitespace, and utilizing trust badges, web experiences remove friction and accelerate buying decisions."
    }
  ]);

  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) {
          const items = Array.isArray(data.data) ? data.data : data.data.items;
          if (Array.isArray(items) && items.length > 0) {
            setBlogs(items);
          }
        }
      })
      .catch(() => {});
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogs.map((blog, idx) => (
            <div key={blog.id || idx} data-aos="fade-up" data-aos-delay={idx * 100} className="bg-[#0a0f2c] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(48,255,151,0.05)] flex flex-col group hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(48,255,151,0.15)] hover:border-brand-electric/30 transition-all duration-300">
              <div className="w-full h-72 overflow-hidden relative cursor-pointer" onClick={() => setSelectedArticle(blog)}>
                <img src={blog.image || "/images/startup.jpg"} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                   <span className="bg-brand-electric/10 border border-brand-electric/20 text-sky-400 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(27,67,255,0.2)]">{blog.category || "Strategy"}</span>
                   <span className="text-slate-400 text-sm">{blog.date || "Recent"}</span>
                </div>
                <h3 onClick={() => setSelectedArticle(blog)} className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-brand-electric transition-colors cursor-pointer leading-tight">
                  {blog.title}
                </h3>
                <p className="text-slate-400 mb-8 flex-1 leading-relaxed text-base">{blog.excerpt}</p>
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
          ))}
        </div>
      </div>

      {/* READ ARTICLE FULL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0f2c] border border-white/10 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <div className="w-full h-64 rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/10">
              <img src={selectedArticle.image || "/images/startup.jpg"} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-brand-electric text-white text-xs font-bold px-3 py-1 rounded-full">{selectedArticle.category || "Article"}</span>
              <span className="text-slate-400 text-xs">{selectedArticle.date || "Scaleminte Insights"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{selectedArticle.title}</h2>
            <div className="text-slate-300 text-sm leading-relaxed space-y-4">
              <p className="font-semibold text-sky-400 text-base">{selectedArticle.excerpt}</p>
              <p>{selectedArticle.content || selectedArticle.excerpt}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs text-slate-500">Written by Scaleminte Strategy Team</span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-brand-electric text-white font-bold rounded-xl text-xs cursor-pointer hover:bg-blue-600"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
