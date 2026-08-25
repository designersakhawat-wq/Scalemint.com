"use client";

import { usePathname } from "next/navigation";
import ContactCTA from "./ContactCTA";

export default function GlobalCTA() {
  const pathname = usePathname();
  
  // Don't show on contact page or admin dashboard
  if (pathname === "/contact-us" || pathname?.startsWith("/admin")) {
    return null;
  }
  
  return <ContactCTA />;
}
