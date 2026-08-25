"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSiteConfig } from '@/context/SiteConfigContext';

const getSocialIcon = (platformOrIcon?: string) => {
  const p = platformOrIcon?.toLowerCase() || "";
  if (p.includes("facebook")) {
    return (
      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
    );
  }
  if (p.includes("twitter") || p.includes("x")) {
    return (
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
    );
  }
  if (p.includes("linkedin")) {
    return (
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    );
  }
  if (p.includes("instagram")) {
    return (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    );
  }
  return (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
  );
};

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useSiteConfig();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const logoSrc = settings.logoUrl || '/images/logo.png';
  const siteName = settings.siteName || 'Scaleminte';
  const footer = settings.footerConfig || {
    tagline: "We Build Brands That Drive Growth",
    description: "Your 360° digital growth partner. We build innovative brands and engineer marketing strategies that drive real business growth.",
    copyright: "© 2026 Scaleminte. All rights reserved.",
    socials: [
      { id: "soc_1", platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
      { id: "soc_2", platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
      { id: "soc_3", platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { id: "soc_4", platform: "Instagram", url: "https://instagram.com", icon: "instagram" },
    ],
    servicesColumn: {
      title: "Services",
      links: [
        { id: "fl_s1", label: "Graphic Design", link: "/services/graphics-design" },
        { id: "fl_s2", label: "Web Development", link: "/services/website-developing" },
        { id: "fl_s3", label: "Meta Ads Management", link: "/services/meta-ads" },
        { id: "fl_s4", label: "Google Ads", link: "/services/google-ads" },
        { id: "fl_s5", label: "Video Editing", link: "/services/video-editing" },
        { id: "fl_s6", label: "Social Media Management", link: "/services/social-media-management" },
        { id: "fl_s7", label: "YouTube Video SEO", link: "/services/youtube-video-seo" },
      ],
    },
    quickLinksColumn: {
      title: "Quick Links",
      links: [
        { id: "fl_q1", label: "Home", link: "/" },
        { id: "fl_q2", label: "About Us", link: "/about-us" },
        { id: "fl_q3", label: "Portfolio", link: "/portfolio" },
        { id: "fl_q4", label: "Pricing Packages", link: "/packages" },
        { id: "fl_q5", label: "Insights & Blog", link: "/blogs" },
        { id: "fl_q6", label: "Contact Us", link: "/contact-us" },
      ],
    },
    contactDetails: {
      title: "Contact",
      email: "hello@scaleminte.com",
      phone: "+23 8976-098-345",
      address: "211 Treutel Parks, California",
    },
    bottomLinks: [
      { id: "fl_b1", label: "Terms and Condition", link: "/terms-and-condition" },
      { id: "fl_b2", label: "Privacy Policy", link: "/contact-us" },
    ],
  };

  return (
    <footer className="bg-[#020516] text-white pt-24 pb-10 px-8 relative z-50 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Socials */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="font-bold text-3xl tracking-wide flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-electric to-brand-navy flex items-center justify-center shadow-[0_0_20px_rgba(27,67,255,0.4)]">
                <img src={logoSrc} alt={`${siteName} Logo`} className="w-6 h-6 object-contain invert" />
              </div>
              <span className="text-white">{siteName}</span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {footer.description || footer.tagline || settings.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              {footer.socials?.map((social) => (
                <a
                  key={social.id}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-electric flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(27,67,255,0.4)]"
                  title={social.platform}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {getSocialIcon(social.icon || social.platform)}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-electric"></span> {footer.servicesColumn?.title || "Services"}
            </h4>
            <div className="flex flex-col gap-4">
              {footer.servicesColumn?.links?.map((item) => (
                <Link 
                  key={item.id} 
                  href={item.link} 
                  className="text-slate-400 hover:text-brand-electric transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span> {footer.quickLinksColumn?.title || "Quick Links"}
            </h4>
            <div className="flex flex-col gap-4">
              {footer.quickLinksColumn?.links?.map((item) => (
                <Link 
                  key={item.id} 
                  href={item.link} 
                  className="text-slate-400 hover:text-sky-400 transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> {footer.contactDetails?.title || "Contact"}
            </h4>
            <div className="flex flex-col gap-5">
              <a href={`mailto:${footer.contactDetails?.email || settings.contactEmail || 'hello@scaleminte.com'}`} className="group flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-electric transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Email Us</p>
                  <p className="text-slate-400 text-sm group-hover:text-white transition-colors">{footer.contactDetails?.email || settings.contactEmail || 'hello@scaleminte.com'}</p>
                </div>
              </a>
              <a href={`tel:${footer.contactDetails?.phone || settings.contactPhone || '+238976098345'}`} className="group flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-electric transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Call Us</p>
                  <p className="text-slate-400 text-sm group-hover:text-white transition-colors">{footer.contactDetails?.phone || settings.contactPhone || '+23 8976-098-345'}</p>
                </div>
              </a>
              <div className="group flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-electric transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Location</p>
                  <p className="text-slate-400 text-sm">{footer.contactDetails?.address || settings.address || '211 Treutel Parks, California'}</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom row: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
          <p className="text-slate-500 text-sm">
            {footer.copyright || settings.footerCopyright || '© 2026 Scaleminte. All rights reserved.'}
          </p>
          <div className="flex flex-wrap gap-8">
            {footer.bottomLinks?.map((link) => (
              <Link 
                key={link.id} 
                href={link.link} 
                className="text-slate-500 hover:text-white text-sm transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
      </div>
    </footer>
  );
}
