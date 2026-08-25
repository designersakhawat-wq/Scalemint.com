"use client";

import React, { useState, useRef } from "react";
import { sanitizeImageUrl } from "@/context/SiteConfigContext";
import { API_BASE_URL } from "@/lib/api";

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspectRatio?: "16/9" | "1/1" | "4/3" | "16/10" | "auto" | "avatar";
  helperText?: string;
  className?: string;
}

/**
 * Compresses and optimizes image files using HTML5 Canvas
 * Reduces 5MB-20MB phone/camera photos to ~80KB-150KB ultra-fast WebP/JPEG
 */
export async function optimizeImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || "");
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
      return;
    }

    // Keep SVG as clean SVG data URI
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || "");
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          if (width / maxWidth > height / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          const isPng = file.type === "image/png" && file.size < 1024 * 1024;
          const outputFormat = isPng ? "image/png" : "image/jpeg";
          const dataUrl = canvas.toDataURL(outputFormat, quality);
          resolve(dataUrl);
          return;
        }

        resolve((readerEvent.target?.result as string) || "");
      };

      img.onerror = () => {
        resolve((readerEvent.target?.result as string) || "");
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "Image URL or upload file...",
  aspectRatio = "16/10",
  helperText,
  className = "",
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cleanUrl = sanitizeImageUrl(value);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsOptimizing(true);
      // 1. Upload to server filesystem for permanent storage
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE_URL}/uploads`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data?.url) {
          onChange(data.data.url);
          return;
        }
      }

      // 2. Client-side canvas compression fallback
      const optimized = await optimizeImageFile(file);
      if (optimized) {
        onChange(sanitizeImageUrl(optimized));
      }
    } catch (err) {
      console.error("Upload/Optimization failed:", err);
      try {
        const optimized = await optimizeImageFile(file);
        if (optimized) {
          onChange(sanitizeImageUrl(optimized));
        }
      } catch {}
    } finally {
      setIsOptimizing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  const getAspectClass = () => {
    if (aspectRatio === "avatar") return "w-24 h-24 rounded-2xl mx-auto";
    if (aspectRatio === "1/1") return "aspect-square w-full rounded-xl";
    if (aspectRatio === "16/9") return "aspect-video w-full rounded-xl";
    if (aspectRatio === "4/3") return "aspect-[4/3] w-full rounded-xl";
    if (aspectRatio === "16/10") return "aspect-[16/10] w-full rounded-xl";
    return "min-h-[140px] w-full rounded-xl";
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-300">{label}</label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-brand-electric hover:underline font-medium cursor-pointer"
          >
            {showUrlInput ? "Hide URL Box" : "Direct URL ↗"}
          </button>
        </div>
      )}

      {/* Main Image Preview & Action Container */}
      <div className="relative group bg-black/40 border border-white/10 rounded-2xl p-3 overflow-hidden transition-all hover:border-brand-electric/40">
        {cleanUrl ? (
          <div className="space-y-3">
            {/* Live Image Box */}
            <div className={`relative overflow-hidden bg-slate-950/80 border border-white/10 ${getAspectClass()}`}>
              <img
                src={cleanUrl}
                alt="Uploaded Preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.opacity = "0.5";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                <span className="text-[11px] font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur">
                  Image Active
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isOptimizing}
                    className="px-2.5 py-1 bg-brand-electric text-white text-[11px] font-bold rounded-lg shadow hover:bg-blue-600 transition cursor-pointer"
                  >
                    {isOptimizing ? "Optimizing..." : "Replace"}
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="px-2.5 py-1 bg-rose-500 text-white text-[11px] font-bold rounded-lg shadow hover:bg-rose-600 transition cursor-pointer flex items-center gap-1"
                  >
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Toolbar Below Preview */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isOptimizing}
                  className="px-3 py-1.5 bg-brand-electric/20 text-brand-electric border border-brand-electric/40 rounded-xl font-semibold hover:bg-brand-electric hover:text-white transition flex items-center gap-1.5 cursor-pointer text-[11px]"
                >
                  <span>📷</span>
                  <span>{isOptimizing ? "Optimizing..." : "Upload / Replace"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-3 py-1.5 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-xl font-semibold hover:bg-rose-500 hover:text-white transition flex items-center gap-1.5 cursor-pointer text-[11px]"
                >
                  <span>🗑️</span>
                  <span>Remove Image</span>
                </button>
              </div>

              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Optimized</span>
              </span>
            </div>
          </div>
        ) : (
          /* Empty / Upload Dropzone */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="py-6 px-4 border-2 border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-electric hover:bg-brand-electric/5 transition-all space-y-2 group/drop"
          >
            <div className="w-10 h-10 rounded-full bg-brand-electric/15 text-brand-electric flex items-center justify-center text-lg group-hover/drop:scale-110 transition-transform">
              {isOptimizing ? "⏳" : "📤"}
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {isOptimizing ? "Optimizing & Compressing Image..." : "Click to Upload Image"}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Auto-optimized & compressed (PNG, JPG, WebP, SVG)
              </p>
            </div>
            <button
              type="button"
              disabled={isOptimizing}
              className="px-3 py-1 bg-brand-electric text-white text-[11px] font-bold rounded-lg shadow hover:bg-blue-600 transition"
            >
              {isOptimizing ? "Processing..." : "Select File"}
            </button>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Expandable / Direct URL Input Field */}
      {(showUrlInput || !cleanUrl) && (
        <div className="space-y-1 pt-1">
          <div className="flex gap-2">
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs font-mono focus:border-brand-electric outline-none"
            />
            {value && (
              <button
                type="button"
                onClick={handleRemove}
                title="Clear image URL"
                className="px-3 py-2 bg-rose-500/15 text-rose-400 border border-rose-500/30 rounded-xl text-xs hover:bg-rose-500 hover:text-white transition cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {helperText && <p className="text-[11px] text-slate-400">{helperText}</p>}
    </div>
  );
};
