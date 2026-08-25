"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ScaleMinte Global Error Boundary Caught:", error);

    // If chunk failed to load (ChunkLoadError after a new deploy), auto-reload with cache bypass
    if (
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Failed to fetch dynamically imported module") ||
      error.name === "ChunkLoadError"
    ) {
      if (typeof window !== "undefined" && !sessionStorage.getItem("chunk_retry")) {
        sessionStorage.setItem("chunk_retry", "1");
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#040822] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-[#0b1138] border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="w-16 h-16 bg-brand-electric/20 rounded-2xl flex items-center justify-center mx-auto text-brand-electric text-2xl font-bold">
          ⚡
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-slate-400 text-sm">
            We updated the website with fresh assets. Please click retry to continue browsing smoothly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("chunk_retry");
                window.location.reload();
              } else {
                reset();
              }
            }}
            className="px-6 py-3 bg-brand-electric hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-brand-electric/30"
          >
            Refresh & Retry
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-sm transition-all text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
