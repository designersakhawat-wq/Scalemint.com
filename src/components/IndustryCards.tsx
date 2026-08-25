"use client";

import React from "react";
import { Button } from "./ui/Button";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function IndustryCards() {
  const { settings } = useSiteConfig();
  const cardImages = settings.images?.industryCards || {
    startup: { url: "/images/startup.jpg" },
    smallBusiness: { url: "/images/storefront.jpg" },
    ecommerce: { url: "/images/ecommerce.jpg" },
    localBusiness: { url: "/images/storefront.jpg" },
    corporate: { url: "/images/corporate.jpg" },
  };

  const renderCardImage = (imgUrl: string, alt: string) => {
    return (
      <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 relative bg-slate-900">
        <img
          src={imgUrl}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
      </div>
    );
  };

  return (
    <section className="bg-transparent pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Startup Card */}
        <div className="bg-[#0a0f2c] border border-white/10 rounded-[2.5rem] p-6 md:p-10 flex flex-col hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(48,255,151,0.1)] hover:border-brand-electric/30 transition-all duration-300 group">
          {renderCardImage(cardImages.startup?.url || "/images/startup.jpg", "Startups")}
          <h3 className="text-2xl font-bold mb-4 text-white">Startups</h3>
          <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
            Turn your startup idea into a strong, scalable business with the right strategy, branding, and digital presence. Build a solid foundation and grow with confidence.
          </p>
          <div className="mt-auto">
            <Button variant="primary" href="/services/graphics-design" className="w-full sm:w-auto">Learn More!</Button>
          </div>
        </div>

        {/* Small Business */}
        <div className="bg-[#0a0f2c] border border-white/10 rounded-[2.5rem] p-6 md:p-10 flex flex-col hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(48,255,151,0.1)] hover:border-brand-electric/30 transition-all duration-300 group">
          {renderCardImage(cardImages.smallBusiness?.url || "/images/storefront.jpg", "Small Business")}
          <h3 className="text-2xl font-bold mb-4 text-white">Small Business</h3>
          <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
            Strengthen your small business with smart branding, creative solutions, and effective digital strategies designed to attract customers and drive steady growth.
          </p>
          <div className="mt-auto">
            <Button variant="primary" href="/services/meta-ads" className="w-full sm:w-auto">Learn More!</Button>
          </div>
        </div>

        {/* E-commerce */}
        <div className="bg-[#0a0f2c] border border-white/10 rounded-[2.5rem] p-6 md:p-10 flex flex-col hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(48,255,151,0.1)] hover:border-brand-electric/30 transition-all duration-300 group">
          {renderCardImage(cardImages.ecommerce?.url || "/images/ecommerce.jpg", "E-commerce")}
          <h3 className="text-2xl font-bold mb-4 text-white">E-commerce</h3>
          <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
            Scale your online store with high-converting ads, optimized user experiences, and tailored digital marketing campaigns that maximize your ROI.
          </p>
          <div className="mt-auto">
            <Button variant="primary" href="/services/meta-ads" className="w-full sm:w-auto">Learn More!</Button>
          </div>
        </div>

        {/* Local Business */}
        <div className="bg-[#0a0f2c] border border-white/10 rounded-[2.5rem] p-6 md:p-10 flex flex-col hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(48,255,151,0.1)] hover:border-brand-electric/30 transition-all duration-300 group">
          {renderCardImage(cardImages.localBusiness?.url || "/images/storefront.jpg", "Local Business")}
          <h3 className="text-2xl font-bold mb-4 text-white">Local Business</h3>
          <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
            Attract more local customers, improve your search visibility, and establish a strong presence in your community with hyper-targeted marketing.
          </p>
          <div className="mt-auto">
            <Button variant="primary" href="/services/google-ads" className="w-full sm:w-auto">Learn More!</Button>
          </div>
        </div>

      </div>

      {/* Corporate / Enterprise Card */}
      <div className="mt-6 bg-[#0a0f2c] border border-white/10 rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(48,255,151,0.1)] hover:border-brand-electric/30 transition-all duration-300 group">
        <div className="w-full md:w-1/2 aspect-video md:aspect-auto md:h-80 rounded-3xl overflow-hidden relative bg-slate-900">
          <img
            src={cardImages.corporate?.url || "/images/corporate.jpg"}
            alt="Corporate and Enterprise"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-4 text-white">Corporate & Enterprise</h3>
          <p className="text-slate-400 mb-8 leading-relaxed text-base">
            Drive high-level business growth with custom enterprise solutions, advanced brand positioning, and comprehensive digital strategies tailored for large-scale operations.
          </p>
          <div>
            <Button variant="primary" href="/services/website-developing">Learn More!</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
