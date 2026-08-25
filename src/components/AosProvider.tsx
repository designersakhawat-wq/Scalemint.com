"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AosProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
      offset: 20,
    });

    const timer = setTimeout(() => {
      AOS.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}

