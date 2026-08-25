import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCarousel from "@/components/ProjectCarousel";
import ClientLogoStrip from "@/components/ClientLogoStrip";
import WeWorkWith from "@/components/WeWorkWith";
import IndustryCards from "@/components/IndustryCards";
import MeetOurTeam from "@/components/MeetOurTeam";
import FAQSection from "@/components/FAQSection";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#040822] overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProjectCarousel />
      <ClientLogoStrip />
      
      <div className="bg-[#040822] relative z-20">
        <WeWorkWith />
        <IndustryCards />
      </div>
      
      <StatsSection />
      <FAQSection />
      <MeetOurTeam />
    </main>
  );
}
