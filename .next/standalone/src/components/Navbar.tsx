"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";

const getNavIcon = (iconName?: string) => {
  switch (iconName) {
    case "search":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />;
    case "link":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />;
    case "chat":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />;
    case "video":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />;
    case "image":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />;
    case "edit":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />;
    case "code":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />;
    default:
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />;
  }
};

export default function Navbar({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const { settings } = useSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLight = theme === 'light';
  const textColor = isLight ? 'text-slate-900' : 'text-white';
  const logoSrc = settings.logoUrl || '/images/logo.png';
  const siteName = settings.siteName || 'Scaleminte'; 

  const menuConfig = settings.navbarMenu?.servicesDropdown || {
    navLabel: "Services",
    sidebarLabel: "SERVICES",
    sidebarDescription: "Discover our comprehensive suite of digital marketing and creative services designed to scale your brand.",
    items: [
      { id: "s1", title: "Google Ads Management", subtitle: "Maximize your search visibility", link: "/services/google-ads", icon: "search" },
      { id: "s2", title: "Meta Ads Management", subtitle: "Targeted social media campaigns", link: "/services/meta-ads", icon: "link" },
      { id: "s3", title: "Social Media Management", subtitle: "Build and engage your audience", link: "/services/social-media-management", icon: "chat" },
      { id: "s4", title: "YouTube Video SEO", subtitle: "Rank higher on video search", link: "/services/youtube-video-seo", icon: "video" },
      { id: "s5", title: "Graphics Design", subtitle: "Crafting timeless visual identities", link: "/services/graphics-design", icon: "image" },
      { id: "s6", title: "Video Editing", subtitle: "Compelling visual storytelling", link: "/services/video-editing", icon: "edit" },
      { id: "s7", title: "Website Developing", subtitle: "Functional and modern web solutions", link: "/services/website-developing", icon: "code" },
    ],
  };

  const meetingConfig = settings.navbarMenu?.bookMeeting || {
    enabled: settings.showMeetingButton ?? true,
    buttonText: settings.meetingButtonText || "Book a Meeting",
    calendlyUrl: settings.calendlyUrl || "https://calendly.com",
  };

  const calendlyLink = meetingConfig.calendlyUrl || settings.calendlyUrl || "https://calendly.com";
  const isMeetingEnabled = meetingConfig.enabled !== false;

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 sm:px-8 py-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/" className={`${textColor} font-bold text-xl tracking-wide flex items-center gap-2.5`}>
          <img
            src={logoSrc}
            alt={`${siteName} Logo`}
            width={32}
            height={32}
            style={{ width: "32px", height: "32px", maxWidth: "32px", maxHeight: "32px" }}
            className="w-8 h-8 object-contain shrink-0"
          />
          <span>{siteName}</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-7 ${isLight ? 'text-slate-700' : 'text-white/90'} font-medium text-sm`}>
          <div className="group py-2">
            <Link href="#services" className={`hover:${isLight ? 'text-brand-electric' : 'text-white'} transition-colors flex items-center gap-1`}>
              {menuConfig.navLabel || "Services"}
              <svg className="w-4 h-4 opacity-70 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-0 right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 px-8">
              <div className="bg-white rounded-3xl shadow-2xl p-8 flex gap-8 border border-slate-100 relative before:absolute before:-top-2 before:left-32 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-t before:border-slate-100">
                
                {/* Left sidebar / title */}
                <div className="w-48 shrink-0 border-r border-slate-100 pr-8">
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-6">{menuConfig.sidebarLabel || "SERVICES"}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-left">
                    {menuConfig.sidebarDescription || "Discover our comprehensive suite of digital marketing and creative services designed to scale your brand."}
                  </p>
                </div>

                {/* Grid of services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 flex-1">
                  {menuConfig.items?.map((service, idx) => (
                    <Link 
                      key={service.id || idx} 
                      href={service.link} 
                      className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group/item text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover/item:text-brand-electric group-hover/item:bg-brand-electric/10 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {getNavIcon(service.icon)}
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover/item:text-brand-electric transition-colors flex items-center gap-2">
                          {service.title} 
                          <span className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-sm">&rarr;</span>
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 font-normal">{service.subtitle}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
          
          <Link href="/about-us" className={`hover:${isLight ? 'text-brand-electric' : 'text-white'} transition-colors`}>About Us</Link>
          <Link href="/portfolio" className={`hover:${isLight ? 'text-brand-electric' : 'text-white'} transition-colors`}>Portfolio</Link>
          <Link href="/packages" className={`hover:${isLight ? 'text-brand-electric' : 'text-white'} transition-colors`}>Packages</Link>
          <Link href="/blogs" className={`hover:${isLight ? 'text-brand-electric' : 'text-white'} transition-colors`}>Blogs</Link>
          
          {/* Normal menu item for Contact Us */}
          <Link href="/contact-us" className={`hover:${isLight ? 'text-brand-electric' : 'text-white'} transition-colors`}>Contact Us</Link>

          {/* ULTRA-MODERN HIGHLIGHTED PRIMARY CTA: Book a Meeting */}
          {isMeetingEnabled && (
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(27,67,255,0.45)] hover:shadow-[0_0_35px_rgba(0,210,255,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/25 cursor-pointer ml-1"
            >
              {/* Pulsing Live Dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>

              {/* Text */}
              <span className="tracking-wide font-extrabold text-white drop-shadow-sm">
                {meetingConfig.buttonText || "Book a Meeting"}
              </span>

              {/* Arrow */}
              <svg className="w-3.5 h-3.5 text-cyan-200 group-hover:text-white group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
        
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition ${textColor}`}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-6 rounded-3xl bg-[#0b1138]/95 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-white/90">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-brand-electric transition"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-brand-electric transition"
            >
              About Us
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-brand-electric transition"
            >
              Portfolio
            </Link>
            <Link
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-brand-electric transition"
            >
              Packages
            </Link>
            <Link
              href="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-brand-electric transition"
            >
              Blogs
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-brand-electric transition"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            {isMeetingEnabled && (
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white py-3.5 rounded-2xl font-extrabold text-xs shadow-[0_0_25px_rgba(27,67,255,0.4)] border border-white/25 active:scale-95 transition"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>{meetingConfig.buttonText || "Book a Meeting"}</span>
                <svg className="w-3.5 h-3.5 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
