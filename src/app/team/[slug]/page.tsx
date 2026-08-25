import React from "react";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import Link from "next/link";
import { initialTeam } from "@/data/initialData";
import { getCollection } from "@/lib/serverStore";

export async function generateStaticParams() {
  const team = getCollection<any[]>("team.json", initialTeam);
  return team.map((m: any) => ({
    slug: m.slug || m.id,
  }));
}

async function getMemberData(slug: string) {
  const team = getCollection<any[]>("team.json", initialTeam);
  const found = team.find((m: any) => m.slug === slug || m.id === slug);
  return found || null;
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const member = await getMemberData(resolvedParams.slug);

  if (!member) {
    notFound();
  }

  const socials = {
    facebook: member.facebookUrl || member.socials?.facebook || "https://facebook.com",
    linkedin: member.linkedinUrl || member.socials?.linkedin || "https://linkedin.com",
  };

  const fiverr = {
    link: member.fiverrLink || member.fiverr?.link || "https://fiverr.com",
    status: member.fiverrStatus || member.fiverr?.status || "Top Rated Seller",
  };

  const upwork = {
    link: member.upworkLink || member.upwork?.link || "https://upwork.com",
    status: member.upworkStatus || member.upwork?.status || "Top Rated Plus",
  };

  const expertise = member.expertise || [
    "Digital Brand Strategy",
    "Creative Direction",
    "Performance Marketing",
  ];

  const tools = member.tools || ["Adobe Creative Suite", "Figma", "Meta Ads Manager", "Google Analytics"];

  const experience = member.experience || [
    { title: member.role || "Specialist", company: "Scaleminte", period: "2022 - Present" },
  ];

  const education = member.education || [
    { degree: "B.Sc in Computer Science & Engineering", institution: "Reputed University", year: "2018 - 2022" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-[#040822] pb-8 rounded-b-[4rem]">
        <Navbar />
        <div className="pt-40 px-8 pb-12 max-w-7xl mx-auto flex items-center gap-4 text-white/60 text-sm">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">{member.name}</span>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-16 -mt-16 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Image & Quick Links */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 relative group">
              <img src={member.img || "/images/team1.jpg"} alt={member.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040822] via-transparent to-transparent opacity-40"></div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-4">
              <h4 className="text-slate-900 font-bold mb-2 text-lg">Connect with {member.name.split(" ")[0]}</h4>
              
              <a href={socials.facebook || "https://facebook.com"} className="flex items-center gap-4 text-slate-600 hover:text-brand-electric transition-colors group" target="_blank" rel="noreferrer">
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-electric group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </div>
                <span className="font-semibold text-slate-700">Facebook Profile</span>
              </a>
              
              <a href={socials.linkedin || "https://linkedin.com"} className="flex items-center gap-4 text-slate-600 hover:text-brand-electric transition-colors group" target="_blank" rel="noreferrer">
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-electric group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <span className="font-semibold text-slate-700">LinkedIn Profile</span>
              </a>

              <div className="h-[1px] w-full bg-slate-200 my-4"></div>
              
              <a href={fiverr.link || "https://fiverr.com"} className="flex items-center gap-4 bg-[#1dbf73]/10 text-[#1dbf73] p-4 rounded-2xl hover:bg-[#1dbf73]/20 transition-colors group" target="_blank" rel="noreferrer">
                <div className="w-12 h-12 rounded-full bg-[#1dbf73] flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform shadow-md shadow-[#1dbf73]/40">
                  fi
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1dbf73]/80 uppercase tracking-wide">Fiverr Seller</p>
                  <p className="font-bold text-lg">{fiverr.status || member.fiverrStatus || "Top Rated Seller"}</p>
                </div>
              </a>

              <a href={upwork.link || "https://upwork.com"} className="flex items-center gap-4 bg-[#14a800]/10 text-[#14a800] p-4 rounded-2xl hover:bg-[#14a800]/20 transition-colors group" target="_blank" rel="noreferrer">
                <div className="w-12 h-12 rounded-full bg-[#14a800] flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform shadow-md shadow-[#14a800]/40">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.754 0-6.197 2.454-6.843 5.437-1.393-2.115-2.42-4.708-2.92-7.437h-3.01v9.557c0 2.062-1.678 3.74-3.74 3.74s-3.74-1.678-3.74-3.74v-9.557h-3.01v9.557c0 3.722 3.028 6.75 6.75 6.75s6.75-3.028 6.75-6.75v-1.168c.594 1.22 1.344 2.404 2.24 3.493l-1.921 8.918h3.084l1.394-6.471c1.332.84 2.853 1.348 4.466 1.348 3.721 0 6.75-3.029 6.75-6.75s-3.028-6.75-6.75-6.75z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#14a800]/80 uppercase tracking-wide">Upwork Freelancer</p>
                  <p className="font-bold text-lg">{upwork.status || member.upworkStatus || "Top Rated Plus"}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:w-2/3 flex flex-col justify-start">
            <div className="mb-12 border-b border-slate-100 pb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#040822] mb-3 tracking-tight">{member.name}</h1>
              <h2 className="text-xl text-brand-electric font-bold uppercase tracking-widest">{member.role}</h2>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#040822] mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-electric/10 flex items-center justify-center text-brand-electric">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                About Me
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                {member.bio || `${member.name} is a dedicated ${member.role} at Scaleminte, helping brands reach their full potential.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* Expertise */}
              <div>
                <h3 className="text-2xl font-bold text-[#040822] mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-electric/10 flex items-center justify-center text-brand-electric">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  Core Expertise
                </h3>
                <div className="flex flex-col gap-3">
                  {expertise.map((skill: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-electric"></div>
                      <span className="text-slate-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-2xl font-bold text-[#040822] mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-electric/10 flex items-center justify-center text-brand-electric">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  Software & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool: string, idx: number) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Experience */}
              <div>
                <h3 className="text-2xl font-bold text-[#040822] mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-electric/10 flex items-center justify-center text-brand-electric">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  Work Experience
                </h3>
                <div className="flex flex-col gap-6 relative border-l-2 border-slate-200 ml-4 pl-6">
                  {experience.map((exp: any, idx: number) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-brand-electric border-4 border-white shadow-sm"></div>
                      <h4 className="font-bold text-slate-900 text-lg">{exp.title}</h4>
                      <p className="text-brand-electric font-medium text-sm my-1">{exp.company}</p>
                      <p className="text-slate-500 text-sm">{exp.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold text-[#040822] mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-electric/10 flex items-center justify-center text-brand-electric">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                  </div>
                  Education
                </h3>
                <div className="flex flex-col gap-6 relative border-l-2 border-slate-200 ml-4 pl-6">
                  {education.map((edu: any, idx: number) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-brand-electric border-4 border-white shadow-sm"></div>
                      <h4 className="font-bold text-slate-900 text-lg">{edu.degree}</h4>
                      <p className="text-slate-700 font-medium text-sm my-1">{edu.institution}</p>
                      <p className="text-slate-500 text-sm">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

