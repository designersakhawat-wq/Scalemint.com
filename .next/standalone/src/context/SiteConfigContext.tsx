"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "@/lib/api";
import {
  defaultSettings,
  SiteSettings,
  ImageConfig,
  NavServiceItem,
  FooterLinkItem,
  FooterSocialItem,
  LegalPageContent,
} from "@/data/defaultSettings";

export type {
  SiteSettings,
  ImageConfig,
  NavServiceItem,
  FooterLinkItem,
  FooterSocialItem,
  LegalPageContent,
};
export { defaultSettings };

export function sanitizeImageUrl(url?: string | null, fallback = ""): string {
  if (!url || typeof url !== "string") return fallback;
  let clean = url.trim();

  // Expired / temporary browser session blob URLs cannot be persisted or displayed across sessions
  if (clean.startsWith("blob:")) {
    return fallback;
  }

  // Strip prepended domain on data:image URLs (e.g., https://scaleminte.com/data:image/...)
  const dataIdx = clean.indexOf("data:image/");
  if (dataIdx > 0) {
    clean = clean.substring(dataIdx);
  }

  // Validate clean URL
  if (!clean || clean === "/" || clean === "null" || clean === "undefined" || clean.length < 5) {
    return fallback;
  }

  return clean;
}

const LOCAL_STORAGE_KEY = "scaleminte_site_settings_cache_v6";

function mergeSettingsHelper(remoteData: any): SiteSettings {
  if (!remoteData || typeof remoteData !== "object") return defaultSettings;

  const defaultSlides = defaultSettings.images.heroCarousel;
  const rawCarousel = Array.isArray(remoteData.images?.heroCarousel) && remoteData.images.heroCarousel.length > 0
    ? remoteData.images.heroCarousel
    : defaultSlides;

  const cleanedCarousel = rawCarousel.map((item: any, idx: number) => {
    const fallbackUrl = defaultSlides[idx % defaultSlides.length]?.url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80";
    return {
      ...item,
      url: sanitizeImageUrl(item.url, fallbackUrl),
    };
  });

  const rawIndustry = remoteData.images?.industryCards || defaultSettings.images.industryCards;
  const cleanedIndustry: any = {};
  for (const [k, v] of Object.entries(rawIndustry)) {
    const defaultUrl = (defaultSettings.images.industryCards as any)?.[k]?.url || "/images/startup.jpg";
    cleanedIndustry[k] = {
      ...(v as any),
      url: sanitizeImageUrl((v as any)?.url, defaultUrl),
    };
  }

  return {
    ...defaultSettings,
    ...remoteData,
    logoUrl: sanitizeImageUrl(remoteData.logoUrl) || defaultSettings.logoUrl,
    faviconUrl: sanitizeImageUrl(remoteData.faviconUrl) || defaultSettings.faviconUrl,
    navbarMenu: {
      ...defaultSettings.navbarMenu,
      ...(remoteData.navbarMenu || {}),
      servicesDropdown: {
        ...defaultSettings.navbarMenu.servicesDropdown,
        ...(remoteData.navbarMenu?.servicesDropdown || {}),
        items: Array.isArray(remoteData.navbarMenu?.servicesDropdown?.items)
          ? remoteData.navbarMenu.servicesDropdown.items
          : defaultSettings.navbarMenu.servicesDropdown.items,
      },
    },
    footerConfig: {
      ...defaultSettings.footerConfig,
      ...(remoteData.footerConfig || {}),
      socials: Array.isArray(remoteData.footerConfig?.socials)
        ? remoteData.footerConfig.socials
        : defaultSettings.footerConfig.socials,
      servicesColumn: {
        ...defaultSettings.footerConfig.servicesColumn,
        ...(remoteData.footerConfig?.servicesColumn || {}),
        links: Array.isArray(remoteData.footerConfig?.servicesColumn?.links)
          ? remoteData.footerConfig.servicesColumn.links
          : defaultSettings.footerConfig.servicesColumn.links,
      },
      quickLinksColumn: {
        ...defaultSettings.footerConfig.quickLinksColumn,
        ...(remoteData.footerConfig?.quickLinksColumn || {}),
        links: Array.isArray(remoteData.footerConfig?.quickLinksColumn?.links)
          ? remoteData.footerConfig.quickLinksColumn.links
          : defaultSettings.footerConfig.quickLinksColumn.links,
      },
      contactDetails: {
        ...defaultSettings.footerConfig.contactDetails,
        ...(remoteData.footerConfig?.contactDetails || {}),
      },
      bottomLinks: Array.isArray(remoteData.footerConfig?.bottomLinks)
        ? remoteData.footerConfig.bottomLinks
        : defaultSettings.footerConfig.bottomLinks,
    },
    legalPages: {
      ...defaultSettings.legalPages,
      ...(remoteData.legalPages || {}),
      termsAndConditions: {
        ...defaultSettings.legalPages.termsAndConditions,
        ...(remoteData.legalPages?.termsAndConditions || {}),
      },
      privacyPolicy: {
        ...defaultSettings.legalPages.privacyPolicy,
        ...(remoteData.legalPages?.privacyPolicy || {}),
      },
    },
    carouselConfig: {
      ...defaultSettings.carouselConfig,
      ...(remoteData.carouselConfig || {}),
    },
    faqSection: {
      ...defaultSettings.faqSection,
      ...(remoteData.faqSection || {}),
      image: sanitizeImageUrl(remoteData.faqSection?.image) || defaultSettings.faqSection.image,
    },
    images: {
      ...defaultSettings.images,
      ...(remoteData.images || {}),
      heroCarousel: cleanedCarousel,
      industryCards: cleanedIndustry,
    },
  };
}

interface SiteConfigContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  refreshSettings: () => Promise<void>;
  isLoading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  settings: defaultSettings,
  updateSettings: async () => false,
  refreshSettings: async () => {},
  isLoading: false,
});

export const useSiteConfig = () => useContext(SiteConfigContext);

export const SiteConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);

  const applyDynamicTheme = useCallback((config: SiteSettings) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (config.primaryColor) {
      root.style.setProperty("--color-brand-electric", config.primaryColor);
      root.style.setProperty("--brand-electric", config.primaryColor);
    }
    if (config.secondaryColor) {
      root.style.setProperty("--color-brand-navy", config.secondaryColor);
      root.style.setProperty("--brand-navy", config.secondaryColor);
    }
    if (config.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "shortcut icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = config.faviconUrl;
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            const mergedCache = mergeSettingsHelper(parsed);
            setSettings(mergedCache);
            applyDynamicTheme(mergedCache);
          } catch {}
        }
      }

      const res = await fetch(`${API_BASE_URL}/settings`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const merged = mergeSettingsHelper(data.data);
          setSettings(merged);
          applyDynamicTheme(merged);
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
          }
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  }, [applyDynamicTheme]);

  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    try {
      const merged = mergeSettingsHelper({ ...settings, ...newSettings });
      setSettings(merged);
      applyDynamicTheme(merged);

      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new Event("scaleminte_settings_updated"));
      }

      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const updatedMerged = mergeSettingsHelper(data.data);
          setSettings(updatedMerged);
          applyDynamicTheme(updatedMerged);
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMerged));
          }
          return true;
        }
      }
      return true;
    } catch (e) {
      console.error("Failed to update site settings:", e);
      return false;
    }
  };

  useEffect(() => {
    refreshSettings();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const merged = mergeSettingsHelper(parsed);
          setSettings(merged);
          applyDynamicTheme(merged);
        } catch {}
      }
    };

    const handleCustomUpdate = () => {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            const merged = mergeSettingsHelper(parsed);
            setSettings(merged);
            applyDynamicTheme(merged);
          } catch {}
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("scaleminte_settings_updated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("scaleminte_settings_updated", handleCustomUpdate);
    };
  }, [refreshSettings, applyDynamicTheme]);

  return (
    <SiteConfigContext.Provider
      value={{
        settings,
        updateSettings,
        refreshSettings,
        isLoading,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};
