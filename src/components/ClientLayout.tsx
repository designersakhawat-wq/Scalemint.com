"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GlobalCTA from "@/components/GlobalCTA";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = mounted ? pathname?.startsWith("/admin") : false;

  return (
    <>
      {children}
      {!isAdmin && <GlobalCTA />}
      {!isAdmin && <Footer />}
    </>
  );
}
