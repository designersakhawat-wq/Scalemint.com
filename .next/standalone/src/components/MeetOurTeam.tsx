"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { initialTeam } from "@/data/initialData";
import { API_BASE_URL } from "@/lib/api";

export default function MeetOurTeam() {
  const [team, setTeam] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_team");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch {}
      }
    }
    return initialTeam;
  });

  const fetchTeam = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/team`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setTeam(json.data);
          if (typeof window !== "undefined") {
            localStorage.setItem("scaleminte_team", JSON.stringify(json.data));
          }
        }
      }
    } catch {
      // Read from localStorage fallback
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("scaleminte_team");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) setTeam(parsed);
          } catch {}
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchTeam();

    const handleUpdate = () => {
      fetchTeam();
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("scaleminte_team");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) setTeam(parsed);
          } catch {}
        }
      }
    };

    window.addEventListener("scaleminte_team_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("scaleminte_team_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [fetchTeam]);

  return (
    <section className="bg-[#040822] py-24 px-4 relative z-0 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Meet Our <span className="text-white bg-brand-electric px-4 py-1 rounded-xl inline-block shadow-[0_0_20px_rgba(27,67,255,0.4)]">Team</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Our experienced professionals are dedicated to delivering innovative digital solutions and helping your business achieve measurable growth.
          </p>
        </div>

        {team.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-base">
            No team members listed yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => {
              const slug = member.slug || `member-${idx}`;
              const img = member.img || "/images/team1.jpg";
              return (
                <Link
                  href={`/team/${slug}`}
                  key={member.id || idx}
                  className="bg-[#0a0f2c] border border-white/10 rounded-[2rem] p-3 pb-8 flex flex-col items-center group hover:shadow-[0_0_30px_rgba(48,255,151,0.15)] hover:border-brand-electric/30 transition-all relative overflow-hidden block"
                >
                  <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative">
                    <img src={img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040822] via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40" />
                  </div>
                  <div className="absolute bottom-6 left-0 right-0 px-5">
                    <div className="bg-[#040822]/90 backdrop-blur-md border border-white/10 rounded-2xl py-4 px-2 w-full text-center shadow-2xl transform transition-transform duration-300 group-hover:-translate-y-2">
                      <h3 className="text-white font-bold text-[1.1rem] leading-tight transition-colors">{member.name}</h3>
                      <p className="text-sky-400 font-semibold text-xs mt-1.5 uppercase tracking-wide">{member.role}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
