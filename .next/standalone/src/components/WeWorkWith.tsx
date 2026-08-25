import React from "react";

export default function WeWorkWith() {
  return (
    <section className="bg-[#040822] -mt-10 relative z-30 pt-32 pb-16 px-6 text-center">
      <h2 data-aos="fade-up" className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
        We <span className="font-serif italic font-normal text-white">work</span> <span className="text-brand-electric">with</span>
      </h2>
      <p data-aos="fade-up" data-aos-delay="100" className="text-slate-400 text-lg md:text-xl font-medium mb-12">
        ambitious brands that want to grow
      </p>
      
      <div data-aos="zoom-in" data-aos-delay="200" className="inline-flex items-center gap-2 border-2 border-brand-electric rounded-full px-4 py-2 text-brand-electric font-semibold text-sm shadow-[0_0_15px_rgba(48,255,151,0.2)]">
        <span className="w-2 h-2 rounded-full bg-brand-electric shadow-[0_0_10px_rgba(48,255,151,1)]"></span>
        Focusing on
      </div>
    </section>
  );
}
