"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteConfig, SiteSettings, NavServiceItem, FooterLinkItem, FooterSocialItem, sanitizeImageUrl } from "@/context/SiteConfigContext";
import { ImageUploadField, optimizeImageFile } from "@/components/ImageUploadField";
import { API_BASE_URL } from "@/lib/api";
import {
  initialServices,
  initialBlogs,
  initialPortfolio,
  initialPackages,
  initialTeam,
  initialFaqs,
  initialInvoices,
} from "@/data/initialData";

// Clean inline SVGs
const Icons = {
  NavMenu: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  ),
  Footer: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  Document: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Image: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Question: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Dollar: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  FileText: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Layers: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Grid: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Upload: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  Warning: () => (
    <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

export default function AdminDashboardPage() {
  const { settings, updateSettings } = useSiteConfig();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "overview" | "invoices" | "navmenu" | "footer" | "legal" | "media" | "faqs" | "settings" | "packages" | "blogs" | "services" | "portfolio" | "team"
  >("overview");

  // CMS Collections with initial fallback
  const [packages, setPackages] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_packages");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return initialPackages;
  });

  const [blogs, setBlogs] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_blogs");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return initialBlogs;
  });

  const [services, setServices] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_services");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return initialServices;
  });

  const [portfolio, setPortfolio] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_portfolio");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return initialPortfolio;
  });

  const [team, setTeam] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_team");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return initialTeam;
  });

  const [faqs, setFaqs] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_faqs");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return initialFaqs;
  });

  const [invoices, setInvoices] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scaleminte_invoices");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return initialInvoices;
  });

  // LocalStorage Persistence Hooks
  useEffect(() => {
    if (typeof window !== "undefined" && packages.length > 0) {
      localStorage.setItem("scaleminte_packages", JSON.stringify(packages));
    }
  }, [packages]);

  useEffect(() => {
    if (typeof window !== "undefined" && blogs.length > 0) {
      localStorage.setItem("scaleminte_blogs", JSON.stringify(blogs));
    }
  }, [blogs]);

  useEffect(() => {
    if (typeof window !== "undefined" && services.length > 0) {
      localStorage.setItem("scaleminte_services", JSON.stringify(services));
    }
  }, [services]);

  useEffect(() => {
    if (typeof window !== "undefined" && portfolio.length > 0) {
      localStorage.setItem("scaleminte_portfolio", JSON.stringify(portfolio));
    }
  }, [portfolio]);

  useEffect(() => {
    if (typeof window !== "undefined" && team.length > 0) {
      localStorage.setItem("scaleminte_team", JSON.stringify(team));
    }
  }, [team]);

  useEffect(() => {
    if (typeof window !== "undefined" && faqs.length > 0) {
      localStorage.setItem("scaleminte_faqs", JSON.stringify(faqs));
    }
  }, [faqs]);

  useEffect(() => {
    if (typeof window !== "undefined" && invoices.length > 0) {
      localStorage.setItem("scaleminte_invoices", JSON.stringify(invoices));
    }
  }, [invoices]);

  // Invoice Filter & Preview State
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState("");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("ALL");
  const [previewInvoice, setPreviewInvoice] = useState<any | null>(null);
  const [newInvoiceItem, setNewInvoiceItem] = useState({ description: "", quantity: 1, unitPrice: 0 });

  // Modals & Confirmation State
  const [modalType, setModalType] = useState<
    "invoice" | "package" | "blog" | "service" | "portfolio" | "team" | "faq" | "navItem" | "footerServiceLink" | "footerQuickLink" | "footerSocial" | "footerBottomLink" | null
  >(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [newFeatureText, setNewFeatureText] = useState("");
  const [editingFeatureIndex, setEditingFeatureIndex] = useState<number | null>(null);
  const [editingFeatureText, setEditingFeatureText] = useState<string>("");

  // Rich Team Member editor local states
  const [newExpertiseText, setNewExpertiseText] = useState("");
  const [newToolText, setNewToolText] = useState("");
  const [newExp, setNewExp] = useState({ title: "", company: "", period: "" });
  const [newEdu, setNewEdu] = useState({ degree: "", institution: "", year: "" });
  const [teamModalTab, setTeamModalTab] = useState<"basic" | "socials" | "expertise" | "experience">("basic");

  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  // DELETE CONFIRMATION MODAL STATE
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  // Settings local state
  const [formSettings, setFormSettings] = useState<SiteSettings>(settings);

  useEffect(() => {
    setFormSettings(settings);
  }, [settings]);

  useEffect(() => {
    const token = localStorage.getItem("scaleminte_admin_token");
    if (token) {
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.success) {
            setIsAuthenticated(true);
            fetchAllData();
          } else {
            localStorage.removeItem("scaleminte_admin_token");
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("scaleminte_admin_token");
          setIsAuthenticated(false);
        });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setLoginError("Please enter both email and password.");
      return;
    }
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();
      if (data.success && data.data?.accessToken) {
        localStorage.setItem("scaleminte_admin_token", data.data.accessToken);
        setIsAuthenticated(true);
        fetchAllData();
      } else {
        setLoginError(data.message || "Invalid email or password.");
      }
    } catch {
      setLoginError("Connection error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("scaleminte_admin_token");
    setEmail("");
    setPassword("");
    setIsAuthenticated(false);
  };

  const fetchAllData = async () => {
    try {
      const [resServices, resBlogs, resPortfolio, resPackages, resTeam, resFaqs, resInvoices] =
        await Promise.all([
          fetch(`${API_BASE_URL}/services`).then((r) => r.json()).catch(() => ({ data: [] })),
          fetch(`${API_BASE_URL}/blogs`).then((r) => r.json()).catch(() => ({ data: { items: [] } })),
          fetch(`${API_BASE_URL}/portfolio`).then((r) => r.json()).catch(() => ({ data: [] })),
          fetch(`${API_BASE_URL}/packages`).then((r) => r.json()).catch(() => ({ data: [] })),
          fetch(`${API_BASE_URL}/team`).then((r) => r.json()).catch(() => ({ data: [] })),
          fetch(`${API_BASE_URL}/faqs`).then((r) => r.json()).catch(() => ({ data: [] })),
          fetch(`${API_BASE_URL}/invoices`).then((r) => r.json()).catch(() => ({ data: [] })),
        ]);

      if (Array.isArray(resServices?.data) && resServices.data.length > 0) {
        setServices(resServices.data);
      }
      if (Array.isArray(resBlogs?.data?.items) && resBlogs.data.items.length > 0) {
        setBlogs(resBlogs.data.items);
      } else if (Array.isArray(resBlogs?.data) && resBlogs.data.length > 0) {
        setBlogs(resBlogs.data);
      }
      if (Array.isArray(resPortfolio?.data) && resPortfolio.data.length > 0) {
        setPortfolio(resPortfolio.data);
      }
      if (Array.isArray(resPackages?.data) && resPackages.data.length > 0) {
        setPackages(resPackages.data);
      }
      if (Array.isArray(resTeam?.data) && resTeam.data.length > 0) {
        setTeam(resTeam.data);
      }
      if (Array.isArray(resFaqs?.data) && resFaqs.data.length > 0) {
        setFaqs(resFaqs.data);
      }
      if (Array.isArray(resInvoices?.data) && resInvoices.data.length > 0) {
        setInvoices(resInvoices.data);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const handleSaveSettings = async (e?: React.FormEvent, customMsg = "Settings saved successfully!") => {
    if (e) e.preventDefault();
    const ok = await updateSettings(formSettings);
    if (ok) {
      setSaveSuccessMessage(customMsg);
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    }
  };

  const handleUploadFile = async (file: File): Promise<string> => {
    try {
      // 1. Instant client-side Canvas optimization & compression (< 1600px, 85% WebP/JPEG)
      const optimizedDataUrl = await optimizeImageFile(file);
      if (optimizedDataUrl) {
        return sanitizeImageUrl(optimizedDataUrl);
      }
    } catch (err) {
      console.error("Client image optimization failed:", err);
    }
    return URL.createObjectURL(file);
  };

  const requestDeleteConfirm = (title: string, description: string, onConfirm: () => void) => {
    setDeleteConfirm({
      isOpen: true,
      title,
      description,
      onConfirm: () => {
        onConfirm();
        setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // --- CRUD Handlers ---
  const saveNavItem = (item: NavServiceItem) => {
    const currentItems = formSettings.navbarMenu?.servicesDropdown?.items || [];
    let updatedItems: NavServiceItem[];
    if (item.id) {
      updatedItems = currentItems.map((it) => (it.id === item.id ? item : it));
    } else {
      updatedItems = [...currentItems, { ...item, id: `s_${Date.now()}` }];
    }

    const updated = {
      ...formSettings,
      navbarMenu: {
        ...formSettings.navbarMenu,
        servicesDropdown: {
          ...formSettings.navbarMenu.servicesDropdown,
          items: updatedItems,
        },
      },
    };
    setFormSettings(updated);
    updateSettings(updated);
    setModalType(null);
    setSaveSuccessMessage("Navbar Service item saved!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  const deleteNavItem = (id: string, name: string) => {
    requestDeleteConfirm(
      `Delete "${name}" from Navbar?`,
      "This service link will be removed from the Navbar Mega Menu.",
      () => {
        const currentItems = formSettings.navbarMenu?.servicesDropdown?.items || [];
        const updatedItems = currentItems.filter((it) => it.id !== id);
        const updated = {
          ...formSettings,
          navbarMenu: {
            ...formSettings.navbarMenu,
            servicesDropdown: {
              ...formSettings.navbarMenu.servicesDropdown,
              items: updatedItems,
            },
          },
        };
        setFormSettings(updated);
        updateSettings(updated);
        setSaveSuccessMessage("Service item removed from Navbar!");
        setTimeout(() => setSaveSuccessMessage(""), 4000);
      }
    );
  };

  // --- Footer Handlers ---
  const saveFooterLink = (type: "service" | "quick" | "social" | "bottom", item: any) => {
    const currentFooter = formSettings.footerConfig;
    let updatedFooter = { ...currentFooter };

    if (type === "service") {
      const links = currentFooter.servicesColumn?.links || [];
      const updatedLinks = item.id ? links.map((l) => (l.id === item.id ? item : l)) : [...links, { ...item, id: `fl_s_${Date.now()}` }];
      updatedFooter.servicesColumn = { ...updatedFooter.servicesColumn, links: updatedLinks };
    } else if (type === "quick") {
      const links = currentFooter.quickLinksColumn?.links || [];
      const updatedLinks = item.id ? links.map((l) => (l.id === item.id ? item : l)) : [...links, { ...item, id: `fl_q_${Date.now()}` }];
      updatedFooter.quickLinksColumn = { ...updatedFooter.quickLinksColumn, links: updatedLinks };
    } else if (type === "social") {
      const socials = currentFooter.socials || [];
      const updatedSocials = item.id ? socials.map((s) => (s.id === item.id ? item : s)) : [...socials, { ...item, id: `soc_${Date.now()}` }];
      updatedFooter.socials = updatedSocials;
    } else if (type === "bottom") {
      const bottomLinks = currentFooter.bottomLinks || [];
      const updatedBottom = item.id ? bottomLinks.map((b) => (b.id === item.id ? item : b)) : [...bottomLinks, { ...item, id: `fl_b_${Date.now()}` }];
      updatedFooter.bottomLinks = updatedBottom;
    }

    const updated = { ...formSettings, footerConfig: updatedFooter };
    setFormSettings(updated);
    updateSettings(updated);
    setModalType(null);
    setSaveSuccessMessage("Footer item saved successfully!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  const deleteFooterItem = (type: "service" | "quick" | "social" | "bottom", id: string, name: string) => {
    requestDeleteConfirm(
      `Delete "${name}" from Footer?`,
      "This item will be permanently removed from the Footer.",
      () => {
        const currentFooter = formSettings.footerConfig;
        let updatedFooter = { ...currentFooter };

        if (type === "service") {
          updatedFooter.servicesColumn = {
            ...updatedFooter.servicesColumn,
            links: (updatedFooter.servicesColumn?.links || []).filter((l) => l.id !== id),
          };
        } else if (type === "quick") {
          updatedFooter.quickLinksColumn = {
            ...updatedFooter.quickLinksColumn,
            links: (updatedFooter.quickLinksColumn?.links || []).filter((l) => l.id !== id),
          };
        } else if (type === "social") {
          updatedFooter.socials = (updatedFooter.socials || []).filter((s) => s.id !== id);
        } else if (type === "bottom") {
          updatedFooter.bottomLinks = (updatedFooter.bottomLinks || []).filter((b) => b.id !== id);
        }

        const updated = { ...formSettings, footerConfig: updatedFooter };
        setFormSettings(updated);
        updateSettings(updated);
        setSaveSuccessMessage("Footer item deleted!");
        setTimeout(() => setSaveSuccessMessage(""), 4000);
      }
    );
  };

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("scaleminte_admin_token") || "demo_token_12345"}`,
  });

  // --- FAQs CRUD with confirmation ---
  const saveFaq = async (item: any) => {
    let updated: any[];
    if (item.id) {
      updated = faqs.map((f) => (f.id === item.id ? item : f));
      setFaqs(updated);
      await fetch(`${API_BASE_URL}/faqs/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      }).catch(() => {});
    } else {
      const newFaq = { ...item, id: `faq_${Date.now()}` };
      updated = [...faqs, newFaq];
      setFaqs(updated);
      await fetch(`${API_BASE_URL}/faqs`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newFaq),
      }).catch(() => {});
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("scaleminte_faqs", JSON.stringify(updated));
      window.dispatchEvent(new Event("scaleminte_faqs_updated"));
    }
    setModalType(null);
    setSaveSuccessMessage("FAQ saved successfully!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  const deleteFaq = (id: string, question: string) => {
    requestDeleteConfirm(`Delete FAQ: "${question}"?`, "This question will be removed from the FAQ accordion.", async () => {
      const updated = faqs.filter((f) => f.id !== id);
      setFaqs(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("scaleminte_faqs", JSON.stringify(updated));
        window.dispatchEvent(new Event("scaleminte_faqs_updated"));
      }
      await fetch(`${API_BASE_URL}/faqs/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }).catch(() => {});
      setSaveSuccessMessage("FAQ deleted successfully!");
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    });
  };

  // --- Package Customizer CRUD ---
  const savePackage = async (item: any) => {
    let updated: any[];
    if (item.id) {
      updated = packages.map((p) => (p.id === item.id ? item : p));
      setPackages(updated);
      await fetch(`${API_BASE_URL}/packages/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      }).catch(() => {});
    } else {
      const newPkg = { ...item, id: `pkg_${Date.now()}` };
      updated = [...packages, newPkg];
      setPackages(updated);
      await fetch(`${API_BASE_URL}/packages`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newPkg),
      }).catch(() => {});
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("scaleminte_packages", JSON.stringify(updated));
      window.dispatchEvent(new Event("scaleminte_packages_updated"));
    }
    setModalType(null);
    setSaveSuccessMessage("Pricing package saved!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  const deletePackage = (id: string, name: string) => {
    requestDeleteConfirm(`Delete Package "${name}"?`, "This package will be removed from pricing options.", async () => {
      const updated = packages.filter((p) => p.id !== id);
      setPackages(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("scaleminte_packages", JSON.stringify(updated));
        window.dispatchEvent(new Event("scaleminte_packages_updated"));
      }
      await fetch(`${API_BASE_URL}/packages/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }).catch(() => {});
      setSaveSuccessMessage("Package deleted!");
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    });
  };

  const saveBlog = async (item: any) => {
    let updated: any[];
    if (item.id) {
      updated = blogs.map((b) => (b.id === item.id ? item : b));
      setBlogs(updated);
      await fetch(`${API_BASE_URL}/blogs/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      }).catch(() => {});
    } else {
      const newBlog = { ...item, id: `blog_${Date.now()}`, views: 0, publishedAt: new Date().toISOString() };
      updated = [newBlog, ...blogs];
      setBlogs(updated);
      await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newBlog),
      }).catch(() => {});
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("scaleminte_blogs", JSON.stringify(updated));
      window.dispatchEvent(new Event("scaleminte_blogs_updated"));
    }
    setModalType(null);
    setSaveSuccessMessage("Blog article saved!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  const deleteBlog = (id: string, title: string) => {
    requestDeleteConfirm(`Delete Article "${title}"?`, "This article will be permanently removed.", async () => {
      const updated = blogs.filter((item) => item.id !== id);
      setBlogs(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("scaleminte_blogs", JSON.stringify(updated));
        window.dispatchEvent(new Event("scaleminte_blogs_updated"));
      }
      await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }).catch(() => {});
      setSaveSuccessMessage("Article deleted!");
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    });
  };

  const saveService = async (item: any) => {
    let updated: any[];
    if (item.id) {
      updated = services.map((s) => (s.id === item.id ? item : s));
      setServices(updated);
      await fetch(`${API_BASE_URL}/services/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      }).catch(() => {});
    } else {
      const newSrv = { ...item, id: `srv_${Date.now()}`, isActive: true };
      updated = [...services, newSrv];
      setServices(updated);
      await fetch(`${API_BASE_URL}/services`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newSrv),
      }).catch(() => {});
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("scaleminte_services", JSON.stringify(updated));
      window.dispatchEvent(new Event("scaleminte_services_updated"));
    }
    setModalType(null);
    setSaveSuccessMessage("Service offering saved!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  const deleteService = (id: string, title: string) => {
    requestDeleteConfirm(`Delete Service "${title}"?`, "This service will be removed from your catalog.", async () => {
      const updated = services.filter((s) => s.id !== id);
      setServices(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("scaleminte_services", JSON.stringify(updated));
        window.dispatchEvent(new Event("scaleminte_services_updated"));
      }
      await fetch(`${API_BASE_URL}/services/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }).catch(() => {});
      setSaveSuccessMessage("Service deleted!");
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    });
  };

  const savePortfolio = async (item: any) => {
    let updated: any[];
    if (item.id) {
      updated = portfolio.map((p) => (p.id === item.id ? item : p));
      setPortfolio(updated);
      await fetch(`${API_BASE_URL}/portfolio/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      }).catch(() => {});
    } else {
      const newPort = { ...item, id: `port_${Date.now()}` };
      updated = [newPort, ...portfolio];
      setPortfolio(updated);
      await fetch(`${API_BASE_URL}/portfolio`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newPort),
      }).catch(() => {});
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("scaleminte_portfolio", JSON.stringify(updated));
      window.dispatchEvent(new Event("scaleminte_portfolio_updated"));
    }
    setModalType(null);
    setSaveSuccessMessage("Portfolio project saved!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  const deletePortfolio = (id: string, title: string) => {
    requestDeleteConfirm(`Delete Project "${title}"?`, "This project will be removed from portfolio showcase.", async () => {
      const updated = portfolio.filter((item) => item.id !== id);
      setPortfolio(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("scaleminte_portfolio", JSON.stringify(updated));
        window.dispatchEvent(new Event("scaleminte_portfolio_updated"));
      }
      await fetch(`${API_BASE_URL}/portfolio/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }).catch(() => {});
      setSaveSuccessMessage("Portfolio item deleted!");
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    });
  };

  const saveTeam = async (item: any) => {
    let updated: any[];
    if (item.id) {
      updated = team.map((t) => (t.id === item.id ? item : t));
      setTeam(updated);
      await fetch(`${API_BASE_URL}/team/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      }).catch(() => {});
    } else {
      const newTeam = { ...item, id: `team_${Date.now()}` };
      updated = [...team, newTeam];
      setTeam(updated);
      await fetch(`${API_BASE_URL}/team`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newTeam),
      }).catch(() => {});
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("scaleminte_team", JSON.stringify(updated));
      window.dispatchEvent(new Event("scaleminte_team_updated"));
    }
    setModalType(null);
    setSaveSuccessMessage("Team member profile saved!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  const deleteTeam = (id: string, name: string) => {
    requestDeleteConfirm(`Delete Team Member "${name}"?`, "This profile will be removed from team section.", async () => {
      const updated = team.filter((item) => item.id !== id && item.slug !== id);
      setTeam(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("scaleminte_team", JSON.stringify(updated));
        window.dispatchEvent(new Event("scaleminte_team_updated"));
      }
      await fetch(`${API_BASE_URL}/team/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }).catch(() => {});
      setSaveSuccessMessage("Team member deleted!");
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    });
  };

  // --- INVOICES CRUD ---
  const saveInvoice = async (item: any) => {
    const subtotal = (item.items || []).reduce((acc: number, it: any) => acc + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0);
    const discount = Number(item.discount) || 0;
    const taxRate = Number(item.taxRate) || 0;
    const taxAmount = (subtotal - discount) * (taxRate / 100);
    const total = Math.max(0, subtotal - discount + taxAmount);

    const invoiceToSave = {
      ...item,
      subtotal,
      discount,
      taxRate,
      taxAmount,
      total,
    };

    let updated: any[];
    if (item.id && !item.id.startsWith("inv_draft_")) {
      updated = invoices.map((inv) => (inv.id === item.id ? invoiceToSave : inv));
      setInvoices(updated);
      await fetch(`${API_BASE_URL}/invoices/${item.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(invoiceToSave),
      }).catch(() => {});
    } else {
      const newInv = {
        ...invoiceToSave,
        id: `inv_${Date.now()}`,
        invoiceNumber: item.invoiceNumber || `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, "0")}`,
      };
      updated = [newInv, ...invoices];
      setInvoices(updated);
      await fetch(`${API_BASE_URL}/invoices`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newInv),
      }).catch(() => {});
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("scaleminte_invoices", JSON.stringify(updated));
      window.dispatchEvent(new Event("scaleminte_invoices_updated"));
    }
    setModalType(null);
    setSaveSuccessMessage("Client invoice saved successfully!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  const deleteInvoice = (id: string, invoiceNumber: string) => {
    requestDeleteConfirm(`Delete Invoice "${invoiceNumber}"?`, "This client invoice will be permanently removed.", async () => {
      const updated = invoices.filter((item) => item.id !== id);
      setInvoices(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("scaleminte_invoices", JSON.stringify(updated));
        window.dispatchEvent(new Event("scaleminte_invoices_updated"));
      }
      await fetch(`${API_BASE_URL}/invoices/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }).catch(() => {});
      setSaveSuccessMessage("Invoice deleted!");
      setTimeout(() => setSaveSuccessMessage(""), 4000);
    });
  };

  const toggleInvoiceStatus = async (invoice: any) => {
    const nextStatus = invoice.status === "Paid" || invoice.status === "PAID" ? "PENDING" : "PAID";
    const updatedInv = { ...invoice, status: nextStatus };
    const updated = invoices.map((i) => (i.id === invoice.id ? updatedInv : i));
    setInvoices(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("scaleminte_invoices", JSON.stringify(updated));
      window.dispatchEvent(new Event("scaleminte_invoices_updated"));
    }
    await fetch(`${API_BASE_URL}/invoices/${invoice.id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: nextStatus }),
    }).catch(() => {});
    setSaveSuccessMessage(`Invoice marked as ${nextStatus}!`);
    setTimeout(() => setSaveSuccessMessage(""), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#040822] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0a0f2c] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-electric/20 flex items-center justify-center mx-auto text-brand-electric font-bold text-xl mb-3 shadow-[0_0_20px_rgba(27,67,255,0.3)]">
              ⚡
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Scaleminte CMS Studio</h1>
            <p className="text-xs text-slate-400">Enter your administrator credentials to manage your website.</p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-2xl text-xs font-medium flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5 tracking-wider">Email Address</label>
              <input
                type="email"
                required
                autoComplete="off"
                placeholder="admin@scaleminte.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#040822] border border-white/15 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5 tracking-wider">Password</label>
              <input
                type="password"
                required
                autoComplete="off"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#040822] border border-white/15 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-brand-electric hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-brand-electric/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                "Log In to Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b28] text-white flex flex-col font-sans">
      <header className="h-16 border-b border-white/10 bg-[#040822]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-lg text-white">
            {settings.siteName} <span className="text-brand-electric text-xs px-2 py-0.5 rounded bg-brand-electric/10 ml-1 border border-brand-electric/30">CMS Studio</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="px-3.5 py-1.5 rounded-lg bg-brand-electric text-white text-xs font-semibold">
            View Live Site ↗
          </Link>
          <button onClick={handleLogout} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 text-xs">
            Logout
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-[#040822]/50 p-4 flex flex-col gap-1.5 shrink-0 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
            Site Navigation & Layout
          </div>

          <button
            onClick={() => setActiveTab("navmenu")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "navmenu" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.NavMenu />
              <span>🧭 Navbar Services Menu</span>
            </div>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">
              {formSettings.navbarMenu?.servicesDropdown?.items?.length || 7}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("footer")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "footer" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.Footer />
              <span>🦶 Footer Studio</span>
            </div>
            <span className="text-[10px] bg-brand-electric/20 text-brand-electric px-1.5 py-0.5 rounded">Full</span>
          </button>

          <button
            onClick={() => setActiveTab("legal")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "legal" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.Document />
              <span>📜 Terms & Privacy Pages</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">2</span>
          </button>

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1 mt-4">
            Media & Design
          </div>

          <button
            onClick={() => setActiveTab("media")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "media" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <Icons.Image />
            <span>🖼️ Image & Size Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("faqs")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "faqs" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.Question />
              <span>❓ FAQs Manager</span>
            </div>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">{faqs.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "settings" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <Icons.Settings />
            <span>Website Branding & Theme</span>
          </button>

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1 mt-4">
            Content Collections
          </div>

          <button
            onClick={() => setActiveTab("packages")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "packages" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.Dollar />
              <span>Pricing Packages</span>
            </div>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">{packages.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "blogs" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.FileText />
              <span>Blogs</span>
            </div>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">{blogs.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "services" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.Layers />
              <span>Services</span>
            </div>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">{services.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("portfolio")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "portfolio" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.Grid />
              <span>Portfolio</span>
            </div>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">{portfolio.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "team" ? "bg-brand-electric text-white" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icons.Users />
              <span>Team Members</span>
            </div>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">{team.length}</span>
          </button>

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1 mt-4">
            Client Billing
          </div>

          <button
            onClick={() => setActiveTab("invoices")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "invoices" ? "bg-brand-electric text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm">🧾</span>
              <span>Invoices & Billing</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full">{invoices.length}</span>
          </button>
        </aside>

        {/* Workspace */}
        <main className="flex-1 p-8 overflow-y-auto">
          {saveSuccessMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Icons.Check />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {/* TAB: PRICING PACKAGES STUDIO */}
          {activeTab === "packages" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Pricing Packages Studio</h1>
                  <p className="text-slate-400 text-xs mt-1">
                    Manage plan names, prices, descriptions, popular badges, feature bullet points, and CTA buttons
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/packages"
                    target="_blank"
                    className="px-3 py-1.5 bg-brand-electric/20 text-brand-electric border border-brand-electric/40 rounded-xl text-xs font-semibold hover:bg-brand-electric hover:text-white transition"
                  >
                    View Pricing Page ↗
                  </Link>
                  <button
                    onClick={() => {
                      setEditItem({
                        name: "Custom Plan",
                        price: "$1,499",
                        description: "Tailored solution designed specifically for your brand.",
                        isPopular: false,
                        badgeText: "MOST POPULAR",
                        buttonText: "Choose Custom Plan",
                        buttonLink: "/contact-us?plan=Custom",
                        features: ["Brand Strategy", "Design System", "Dedicated Support"],
                      });
                      setModalType("package");
                    }}
                    className="px-4 py-2 bg-brand-electric text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-lg shadow-brand-electric/25"
                  >
                    <Icons.Plus /> <span>Add New Package</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-6 rounded-3xl bg-[#0b1138] border flex flex-col justify-between relative transition-all duration-300 ${
                      pkg.isPopular
                        ? "border-brand-electric shadow-[0_0_30px_rgba(27,67,255,0.25)]"
                        : "border-white/10"
                    }`}
                  >
                    {pkg.isPopular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-electric text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        {pkg.badgeText || "MOST POPULAR"}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-white text-lg">{pkg.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400 font-mono">
                          {pkg.features?.length || 0} features
                        </span>
                      </div>
                      <div className="text-3xl font-extrabold text-white mt-1 mb-2 tracking-tight">
                        {pkg.price}
                      </div>
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2">
                        {pkg.description}
                      </p>

                      <div className="space-y-1.5 border-t border-white/10 pt-4 mb-4">
                        {pkg.features?.slice(0, 4).map((f: string, i: number) => (
                          <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                            <span className="text-brand-electric">✓</span>
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                        {(pkg.features?.length || 0) > 4 && (
                          <div className="text-[11px] text-slate-500 italic pl-4">
                            + {pkg.features.length - 4} more features...
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
                        CTA: {pkg.buttonText || `Choose ${pkg.name}`}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditItem(pkg);
                            setModalType("package");
                          }}
                          className="p-1.5 bg-white/5 rounded-lg text-slate-300 hover:bg-white/10 cursor-pointer"
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          onClick={() => deletePackage(pkg.id, pkg.name)}
                          className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 cursor-pointer"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: LEGAL PAGES */}
          {activeTab === "legal" && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white">Legal Pages Content Editor</h1>
                <p className="text-slate-400 text-xs mt-1">
                  Manage and edit the full contents of &quot;Terms and Condition&quot; and &quot;Privacy Policy&quot; pages linked from your footer
                </p>
              </div>

              {/* Terms and Condition Editor */}
              <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white">1. Terms and Condition Page</h2>
                    <p className="text-slate-400 text-xs">Edit title, last updated timestamp, and full policy terms</p>
                  </div>
                  <Link
                    href="/terms-and-condition"
                    target="_blank"
                    className="px-3 py-1 bg-brand-electric/20 text-brand-electric border border-brand-electric/40 rounded-lg text-xs font-semibold hover:bg-brand-electric hover:text-white transition"
                  >
                    Preview Live Page ↗
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Page Title</label>
                    <input
                      type="text"
                      value={formSettings.legalPages?.termsAndConditions?.title || "Terms and Condition"}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          legalPages: {
                            ...formSettings.legalPages,
                            termsAndConditions: {
                              ...formSettings.legalPages.termsAndConditions,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Last Updated Date / Notice</label>
                    <input
                      type="text"
                      value={formSettings.legalPages?.termsAndConditions?.lastUpdated || "October 2026"}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          legalPages: {
                            ...formSettings.legalPages,
                            termsAndConditions: {
                              ...formSettings.legalPages.termsAndConditions,
                              lastUpdated: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-300 font-semibold mb-1">Terms Content & Paragraphs</label>
                  <textarea
                    rows={8}
                    value={formSettings.legalPages?.termsAndConditions?.content || ""}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        legalPages: {
                          ...formSettings.legalPages,
                          termsAndConditions: {
                            ...formSettings.legalPages.termsAndConditions,
                            content: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white font-mono text-xs leading-relaxed"
                  />
                </div>
              </div>

              {/* Privacy Policy Editor */}
              <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white">2. Privacy Policy Page</h2>
                    <p className="text-slate-400 text-xs">Edit title, last updated timestamp, and full privacy clauses</p>
                  </div>
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="px-3 py-1 bg-brand-electric/20 text-brand-electric border border-brand-electric/40 rounded-lg text-xs font-semibold hover:bg-brand-electric hover:text-white transition"
                  >
                    Preview Live Page ↗
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Page Title</label>
                    <input
                      type="text"
                      value={formSettings.legalPages?.privacyPolicy?.title || "Privacy Policy"}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          legalPages: {
                            ...formSettings.legalPages,
                            privacyPolicy: {
                              ...formSettings.legalPages.privacyPolicy,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Last Updated Date / Notice</label>
                    <input
                      type="text"
                      value={formSettings.legalPages?.privacyPolicy?.lastUpdated || "October 2026"}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          legalPages: {
                            ...formSettings.legalPages,
                            privacyPolicy: {
                              ...formSettings.legalPages.privacyPolicy,
                              lastUpdated: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-300 font-semibold mb-1">Privacy Content & Paragraphs</label>
                  <textarea
                    rows={8}
                    value={formSettings.legalPages?.privacyPolicy?.content || ""}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        legalPages: {
                          ...formSettings.legalPages,
                          privacyPolicy: {
                            ...formSettings.legalPages.privacyPolicy,
                            content: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white font-mono text-xs leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleSaveSettings(undefined, "Terms and Condition & Privacy Policy saved successfully!")}
                  className="px-6 py-3 bg-brand-electric text-white font-bold rounded-xl text-xs hover:bg-blue-600 shadow-lg shadow-brand-electric/30 cursor-pointer"
                >
                  Save Legal Pages Content
                </button>
              </div>
            </div>
          )}

          {/* TAB: FOOTER STUDIO */}
          {activeTab === "footer" && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white">Full Website Footer Studio</h1>
                <p className="text-slate-400 text-xs mt-1">
                  Manage all elements of your footer: brand tagline, social icons, services column, quick links, contact info, and copyright
                </p>
              </div>

              <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-base font-bold text-white">1. Footer Brand Copy</h2>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Footer Tagline / Short Heading</label>
                    <input
                      type="text"
                      value={formSettings.footerConfig?.tagline || ""}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          footerConfig: { ...formSettings.footerConfig, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Footer Description Paragraph</label>
                    <textarea
                      rows={2}
                      value={formSettings.footerConfig?.description || ""}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          footerConfig: { ...formSettings.footerConfig, description: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-base font-bold text-white">2. Footer Social Media Links</h2>
                  <button
                    onClick={() => {
                      setEditItem({ platform: "Facebook", url: "https://facebook.com", icon: "facebook" });
                      setModalType("footerSocial");
                    }}
                    className="px-3 py-1.5 bg-brand-electric text-white text-xs rounded-xl font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Icons.Plus /> <span>Add Social Link</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {formSettings.footerConfig?.socials?.map((soc) => (
                    <div key={soc.id} className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                      <div className="overflow-hidden">
                        <div className="font-bold text-white text-xs">{soc.platform}</div>
                        <div className="text-[10px] text-slate-400 truncate">{soc.url}</div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <button
                          onClick={() => {
                            setEditItem(soc);
                            setModalType("footerSocial");
                          }}
                          className="p-1 bg-white/5 hover:bg-white/10 rounded text-slate-300 cursor-pointer"
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          onClick={() => deleteFooterItem("social", soc.id, soc.platform)}
                          className="p-1 bg-rose-500/10 hover:bg-rose-500/20 rounded text-rose-400 cursor-pointer"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-sm font-bold text-white">3. Services Column Links</h2>
                    <button
                      onClick={() => {
                        setEditItem({ label: "", link: "/services/" });
                        setModalType("footerServiceLink");
                      }}
                      className="px-2.5 py-1 bg-brand-electric text-white text-[11px] rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Icons.Plus /> <span>Add Link</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formSettings.footerConfig?.servicesColumn?.links?.map((item) => (
                      <div key={item.id} className="p-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold text-white">{item.label}</span>
                          <span className="text-[10px] text-slate-500 ml-2 font-mono">{item.link}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setEditItem(item); setModalType("footerServiceLink"); }} className="p-1 bg-white/5 text-slate-300 rounded hover:bg-white/10 cursor-pointer">
                            <Icons.Edit />
                          </button>
                          <button onClick={() => deleteFooterItem("service", item.id, item.label)} className="p-1 bg-rose-500/10 text-rose-400 rounded hover:bg-rose-500/20 cursor-pointer">
                            <Icons.Trash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-sm font-bold text-white">4. Quick Links Column</h2>
                    <button
                      onClick={() => {
                        setEditItem({ label: "", link: "/" });
                        setModalType("footerQuickLink");
                      }}
                      className="px-2.5 py-1 bg-brand-electric text-white text-[11px] rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Icons.Plus /> <span>Add Link</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formSettings.footerConfig?.quickLinksColumn?.links?.map((item) => (
                      <div key={item.id} className="p-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold text-white">{item.label}</span>
                          <span className="text-[10px] text-slate-500 ml-2 font-mono">{item.link}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setEditItem(item); setModalType("footerQuickLink"); }} className="p-1 bg-white/5 text-slate-300 rounded hover:bg-white/10 cursor-pointer">
                            <Icons.Edit />
                          </button>
                          <button onClick={() => deleteFooterItem("quick", item.id, item.label)} className="p-1 bg-rose-500/10 text-rose-400 rounded hover:bg-rose-500/20 cursor-pointer">
                            <Icons.Trash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact & Copyright */}
              <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-base font-bold text-white">5. Contact Column & Copyright Notice</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formSettings.footerConfig?.contactDetails?.email || ""}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          footerConfig: {
                            ...formSettings.footerConfig,
                            contactDetails: { ...formSettings.footerConfig.contactDetails, email: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formSettings.footerConfig?.contactDetails?.phone || ""}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          footerConfig: {
                            ...formSettings.footerConfig,
                            contactDetails: { ...formSettings.footerConfig.contactDetails, phone: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Address / Location</label>
                    <input
                      type="text"
                      value={formSettings.footerConfig?.contactDetails?.address || ""}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          footerConfig: {
                            ...formSettings.footerConfig,
                            contactDetails: { ...formSettings.footerConfig.contactDetails, address: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 text-xs">
                  <label className="block text-slate-300 font-semibold mb-1">Footer Copyright Text</label>
                  <input
                    type="text"
                    value={formSettings.footerConfig?.copyright || ""}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        footerConfig: { ...formSettings.footerConfig, copyright: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleSaveSettings(undefined, "Footer updated and saved successfully!")}
                  className="px-6 py-3 bg-brand-electric text-white font-bold rounded-xl text-xs hover:bg-blue-600 shadow-lg shadow-brand-electric/30 cursor-pointer"
                >
                  Save Footer Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB: NAVBAR SERVICES MEGA MENU CUSTOMIZER */}
          {activeTab === "navmenu" && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white">Navbar Services & Header Action Manager</h1>
                <p className="text-slate-400 text-xs mt-1">
                  Customize the Services dropdown and the &quot;Book a Meeting&quot; Calendly button on the top navbar
                </p>
              </div>

              {/* BOOK A MEETING / CALENDLY NAVBAR BUTTON */}
              <div className="bg-[#0b1138] border border-emerald-500/40 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <span>📅 Book a Meeting (Calendly Action Button)</span>
                    </h2>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Configure the booking button displayed next to &quot;Contact Us&quot; on the website header.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition">
                    <input
                      type="checkbox"
                      checked={formSettings.navbarMenu?.bookMeeting?.enabled ?? formSettings.showMeetingButton ?? true}
                      onChange={(e) => {
                        const val = e.target.checked;
                        setFormSettings({
                          ...formSettings,
                          showMeetingButton: val,
                          navbarMenu: {
                            ...formSettings.navbarMenu,
                            bookMeeting: {
                              ...(formSettings.navbarMenu?.bookMeeting || {
                                buttonText: "Book a Meeting",
                                calendlyUrl: "https://calendly.com",
                              }),
                              enabled: val,
                            },
                          },
                        });
                      }}
                      className="w-4 h-4 rounded text-emerald-500 bg-black/40 focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-emerald-400">Show Button in Header</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Button Text / Label</label>
                    <input
                      type="text"
                      value={formSettings.navbarMenu?.bookMeeting?.buttonText || formSettings.meetingButtonText || "Book a Meeting"}
                      onChange={(e) => {
                        const txt = e.target.value;
                        setFormSettings({
                          ...formSettings,
                          meetingButtonText: txt,
                          navbarMenu: {
                            ...formSettings.navbarMenu,
                            bookMeeting: {
                              ...(formSettings.navbarMenu?.bookMeeting || {
                                enabled: true,
                                calendlyUrl: "https://calendly.com",
                              }),
                              buttonText: txt,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white font-semibold"
                      placeholder="e.g. Book a Meeting"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-slate-300 font-semibold">Calendly / Booking Link</label>
                      {(formSettings.navbarMenu?.bookMeeting?.calendlyUrl || formSettings.calendlyUrl) && (
                        <a
                          href={formSettings.navbarMenu?.bookMeeting?.calendlyUrl || formSettings.calendlyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>Preview Link ↗</span>
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={formSettings.navbarMenu?.bookMeeting?.calendlyUrl || formSettings.calendlyUrl || ""}
                      onChange={(e) => {
                        const url = e.target.value;
                        setFormSettings({
                          ...formSettings,
                          calendlyUrl: url,
                          navbarMenu: {
                            ...formSettings.navbarMenu,
                            bookMeeting: {
                              ...(formSettings.navbarMenu?.bookMeeting || {
                                enabled: true,
                                buttonText: "Book a Meeting",
                              }),
                              calendlyUrl: url,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white font-mono text-xs"
                      placeholder="https://calendly.com/your-brand/30min"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-base font-bold text-white">Navbar Dropdown Label & Left Sidebar Copy</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Navbar Menu Button Label</label>
                    <input
                      type="text"
                      value={formSettings.navbarMenu?.servicesDropdown?.navLabel || "Services"}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          navbarMenu: {
                            ...formSettings.navbarMenu,
                            servicesDropdown: {
                              ...formSettings.navbarMenu.servicesDropdown,
                              navLabel: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Left Sidebar Title</label>
                    <input
                      type="text"
                      value={formSettings.navbarMenu?.servicesDropdown?.sidebarLabel || "SERVICES"}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          navbarMenu: {
                            ...formSettings.navbarMenu,
                            servicesDropdown: {
                              ...formSettings.navbarMenu.servicesDropdown,
                              sidebarLabel: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-300 font-semibold mb-1">Left Sidebar Description Text</label>
                  <textarea
                    rows={2}
                    value={formSettings.navbarMenu?.servicesDropdown?.sidebarDescription || ""}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        navbarMenu: {
                          ...formSettings.navbarMenu,
                          servicesDropdown: {
                            ...formSettings.navbarMenu.servicesDropdown,
                            sidebarDescription: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              {/* Dropdown Items List */}
              <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white">Services Links in Dropdown</h2>
                  </div>
                  <button
                    onClick={() => {
                      setEditItem({ title: "", subtitle: "", link: "/services/", icon: "search" });
                      setModalType("navItem");
                    }}
                    className="px-3.5 py-1.5 bg-brand-electric text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-brand-electric/20"
                  >
                    <Icons.Plus /> <span>Add Service Item</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formSettings.navbarMenu?.servicesDropdown?.items?.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-electric/10 text-brand-electric border border-brand-electric/30">
                            Icon: {item.icon || "search"}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm mt-2">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-1">{item.link}</p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditItem(item);
                            setModalType("navItem");
                          }}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          onClick={() => deleteNavItem(item.id, item.title)}
                          className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-rose-400 cursor-pointer"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => handleSaveSettings(undefined, "Navbar Dropdown saved successfully!")}
                  className="px-6 py-3 bg-brand-electric text-white font-bold rounded-xl text-xs hover:bg-blue-600 shadow-lg shadow-brand-electric/30 cursor-pointer"
                >
                  Save Navbar Dropdown Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB: MEDIA & IMAGE MANAGER */}
          {activeTab === "media" && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white">Full Website Image & Size Studio</h1>
                <p className="text-slate-400 text-xs mt-1">
                  Adjust image dimensions, card width, height, aspect ratio, focus alignment, and replace images
                </p>
              </div>

              {/* Hero Carousel Settings */}
              <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-base font-bold text-white">⚙️ Hero Carousel Size & Shape Controller</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Card Width (px / size)</label>
                    <input
                      type="text"
                      value={formSettings.carouselConfig?.cardWidth || "480px"}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          carouselConfig: { ...formSettings.carouselConfig, cardWidth: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Card Aspect Ratio / Shape</label>
                    <select
                      value={formSettings.carouselConfig?.aspectRatio || "16/10"}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          carouselConfig: { ...formSettings.carouselConfig, aspectRatio: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    >
                      <option value="16/10">16:10 (Default Premium Ratio)</option>
                      <option value="16/9">16:9 (Widescreen)</option>
                      <option value="4/3">4:3 (Standard)</option>
                      <option value="1/1">1:1 (Square)</option>
                      <option value="4/5">4:5 (Tall / Portrait)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Corner Roundness (Radius)</label>
                    <select
                      value={formSettings.carouselConfig?.radius || "rounded-[2rem]"}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          carouselConfig: { ...formSettings.carouselConfig, radius: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white"
                    >
                      <option value="rounded-xl">Subtle (rounded-xl)</option>
                      <option value="rounded-2xl">Standard (rounded-2xl)</option>
                      <option value="rounded-[2rem]">Large Curved (rounded-[2rem])</option>
                      <option value="rounded-[3rem]">Extra Curved (rounded-[3rem])</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Hero Carousel Slides */}
              <div className="bg-[#0b1138] border border-white/10 p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white">1. Hero Section Project Carousel Images & Focus</h2>
                  </div>
                  <button
                    onClick={() => {
                      const newCards = [
                        ...(formSettings.images?.heroCarousel || []),
                        { id: `c_${Date.now()}`, title: "New Project Showcase", url: "/images/startup.jpg", position: "center" as const },
                      ];
                      setFormSettings({
                        ...formSettings,
                        images: { ...formSettings.images, heroCarousel: newCards },
                      });
                    }}
                    className="px-3 py-1.5 bg-brand-electric text-white text-xs rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Icons.Plus /> <span>Add Slide</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formSettings.images?.heroCarousel?.map((slide, idx) => {
                    const pos = slide.position || "center";
                    return (
                      <div key={slide.id || idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 shadow-lg">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="font-bold text-xs text-brand-electric">Slide #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              requestDeleteConfirm(`Delete Slide #${idx + 1}?`, "This slide will be removed from the carousel.", () => {
                                const filtered = formSettings.images.heroCarousel.filter((_, i) => i !== idx);
                                setFormSettings({
                                  ...formSettings,
                                  images: { ...formSettings.images, heroCarousel: filtered },
                                });
                              });
                            }}
                            className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 cursor-pointer font-semibold"
                          >
                            <Icons.Trash /> <span>Delete Slide</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-300 font-semibold mb-1">Title / Caption</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const updated = [...formSettings.images.heroCarousel];
                              updated[idx].title = e.target.value;
                              setFormSettings({ ...formSettings, images: { ...formSettings.images, heroCarousel: updated } });
                            }}
                            placeholder="e.g. Educational Design"
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white"
                          />
                        </div>

                        <ImageUploadField
                          label="Slide Image (Auto-Optimized)"
                          value={slide.url}
                          onChange={(url) => {
                            const updated = [...formSettings.images.heroCarousel];
                            updated[idx].url = url;
                            setFormSettings({ ...formSettings, images: { ...formSettings.images, heroCarousel: updated } });
                          }}
                          aspectRatio="16/10"
                        />

                        <div>
                          <label className="block text-[11px] text-slate-300 font-semibold mb-1">🎯 Image Focus / Vertical Alignment</label>
                          <select
                            value={pos}
                            onChange={(e) => {
                              const updated = [...formSettings.images.heroCarousel];
                              updated[idx].position = e.target.value as any;
                              setFormSettings({ ...formSettings, images: { ...formSettings.images, heroCarousel: updated } });
                            }}
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white"
                          >
                            <option value="center">Center Focus (Standard)</option>
                            <option value="top">Top Focus (Show Head/Top Area)</option>
                            <option value="bottom">Bottom Focus (Show Product/Bottom Area)</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => handleSaveSettings()}
                  className="px-6 py-3 bg-brand-electric text-white font-bold rounded-xl text-xs hover:bg-blue-600 shadow-lg shadow-brand-electric/30 cursor-pointer"
                >
                  Save All Image & Size Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB: FAQS */}
          {activeTab === "faqs" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Frequently Asked Questions (FAQs)</h1>
                  <p className="text-slate-400 text-xs mt-1">Add, edit questions, answers, and manage FAQs displayed on the website</p>
                </div>
                <button
                  onClick={() => {
                    setEditItem({ question: "", answer: "", category: "general" });
                    setModalType("faq");
                  }}
                  className="px-4 py-2 bg-brand-electric text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-brand-electric/25"
                >
                  <Icons.Plus /> <span>Add New FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className="p-5 rounded-2xl bg-[#0b1138] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-electric/20 text-brand-electric text-[11px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-white text-sm">{faq.question}</h3>
                      </div>
                      <p className="text-xs text-slate-400 pl-7 leading-relaxed">{faq.answer}</p>
                    </div>

                    <div className="flex items-center gap-2 pl-7 md:pl-0 shrink-0">
                      <button
                        onClick={() => {
                          setEditItem(faq);
                          setModalType("faq");
                        }}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white cursor-pointer transition"
                      >
                        <Icons.Edit />
                      </button>
                      <button
                        onClick={() => deleteFaq(faq.id, faq.question)}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-rose-400 cursor-pointer transition"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === "settings" && (
            <div className="max-w-4xl space-y-6">
              <h1 className="text-2xl font-bold text-white">Website Branding & Global Theme</h1>
              <form onSubmit={(e) => handleSaveSettings(e)} className="space-y-6 bg-[#0b1138] border border-white/10 p-6 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUploadField
                    label="Website Logo"
                    value={formSettings.logoUrl}
                    onChange={(url) => setFormSettings({ ...formSettings, logoUrl: url })}
                    aspectRatio="1/1"
                    placeholder="/images/logo.png"
                    helperText="Main header and footer logo (Auto-compressed)"
                  />

                  <ImageUploadField
                    label="Browser Favicon"
                    value={formSettings.faviconUrl}
                    onChange={(url) => setFormSettings({ ...formSettings, faviconUrl: url })}
                    aspectRatio="1/1"
                    placeholder="/favicon.ico"
                    helperText="Browser tab icon (ICO, PNG, or SVG)"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Primary Electric Color</label>
                    <input
                      type="color"
                      value={formSettings.primaryColor || "#1B43FF"}
                      onChange={(e) => setFormSettings({ ...formSettings, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Secondary Navy Color</label>
                    <input
                      type="color"
                      value={formSettings.secondaryColor || "#040822"}
                      onChange={(e) => setFormSettings({ ...formSettings, secondaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Accent Glow Color</label>
                    <input
                      type="color"
                      value={formSettings.accentColor || "#00d2ff"}
                      onChange={(e) => setFormSettings({ ...formSettings, accentColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">📅 Header Action / Calendly Meeting Link</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Header Booking Button Label</label>
                      <input
                        type="text"
                        value={formSettings.meetingButtonText || "Book a Meeting"}
                        onChange={(e) => setFormSettings({ ...formSettings, meetingButtonText: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                        placeholder="Book a Meeting"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Calendly Link URL</label>
                      <input
                        type="url"
                        value={formSettings.calendlyUrl || ""}
                        onChange={(e) => setFormSettings({ ...formSettings, calendlyUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
                        placeholder="https://calendly.com/your-username/30min"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="px-6 py-2.5 bg-brand-electric hover:bg-blue-600 text-white font-bold rounded-xl text-xs cursor-pointer shadow-lg shadow-blue-500/20">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB: BLOGS */}
          {activeTab === "blogs" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Blog Articles</h1>
                <button
                  onClick={() => {
                    setEditItem({ title: "", category: "Graphic Design", excerpt: "", content: "", authorName: "Md Sakhawat Hossain", image: "/images/startup.jpg" });
                    setModalType("blog");
                  }}
                  className="px-4 py-2 bg-brand-electric text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Icons.Plus /> <span>Write Article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogs.map((b) => (
                  <div key={b.id} className="p-5 rounded-2xl bg-[#0b1138] border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="w-full h-28 rounded-xl overflow-hidden mb-3 bg-slate-900 border border-white/10">
                        <img src={b.image || "/images/startup.jpg"} alt={b.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-white text-sm line-clamp-2">{b.title}</h3>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-white/10 mt-3">
                      <button onClick={() => { setEditItem(b); setModalType("blog"); }} className="p-1.5 bg-white/5 rounded-lg text-slate-300 hover:bg-white/10 cursor-pointer">
                        <Icons.Edit />
                      </button>
                      <button onClick={() => deleteBlog(b.id, b.title)} className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 cursor-pointer">
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === "services" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Services Offerings</h1>
                <button
                  onClick={() => {
                    setEditItem({ title: "", subtitle: "", description: "", img: "/images/startup.jpg" });
                    setModalType("service");
                  }}
                  className="px-4 py-2 bg-brand-electric text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Icons.Plus /> <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((srv) => (
                  <div key={srv.id} className="p-5 rounded-2xl bg-[#0b1138] border border-white/10 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base">{srv.title}</h3>
                      <p className="text-xs text-brand-electric">{srv.subtitle}</p>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-white/10 mt-4">
                      <button onClick={() => { setEditItem(srv); setModalType("service"); }} className="p-1.5 bg-white/5 rounded-lg text-slate-300 hover:bg-white/10 cursor-pointer">
                        <Icons.Edit />
                      </button>
                      <button onClick={() => deleteService(srv.id, srv.title)} className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 cursor-pointer">
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PORTFOLIO */}
          {activeTab === "portfolio" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Portfolio Projects</h1>
                <button
                  onClick={() => {
                    setEditItem({ title: "", category: "Graphic Design", image: "/images/startup.jpg" });
                    setModalType("portfolio");
                  }}
                  className="px-4 py-2 bg-brand-electric text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Icons.Plus /> <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {portfolio.map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl bg-[#0b1138] border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="w-full h-28 rounded-xl overflow-hidden mb-3 bg-slate-900 border border-white/10">
                        <img src={p.image || "/images/startup.jpg"} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-white text-sm">{p.title}</h3>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-white/10 mt-3">
                      <button onClick={() => { setEditItem(p); setModalType("portfolio"); }} className="p-1.5 bg-white/5 rounded-lg text-slate-300 hover:bg-white/10 cursor-pointer">
                        <Icons.Edit />
                      </button>
                      <button onClick={() => deletePortfolio(p.id, p.title)} className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 cursor-pointer">
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TEAM */}
          {activeTab === "team" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Team Profiles</h1>
                <button
                  onClick={() => {
                    setEditItem({ name: "", role: "Specialist", img: "/images/team1.jpg", fiverrStatus: "Top Rated Seller" });
                    setModalType("team");
                  }}
                  className="px-4 py-2 bg-brand-electric text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Icons.Plus /> <span>Add Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {team.map((m) => (
                  <div key={m.id} className="p-5 rounded-2xl bg-[#0b1138] border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-full overflow-hidden mb-3 bg-slate-900 border border-brand-electric">
                        <img src={m.img || "/images/team1.jpg"} alt={m.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-white text-sm">{m.name}</h3>
                      <p className="text-xs text-brand-electric">{m.role}</p>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-white/10 mt-3">
                      <button onClick={() => { setEditItem(m); setModalType("team"); }} className="p-1.5 bg-white/5 rounded-lg text-slate-300 hover:bg-white/10 cursor-pointer">
                        <Icons.Edit />
                      </button>
                      <button onClick={() => deleteTeam(m.id, m.name)} className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 cursor-pointer">
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: INVOICES & BILLING */}
          {activeTab === "invoices" && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span>🧾 Client Invoices & Billing</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">Generate, track, and print professional invoices for your agency clients</p>
                </div>
                <button
                  onClick={() => {
                    const nextNum = `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, "0")}`;
                    setEditItem({
                      id: `inv_draft_${Date.now()}`,
                      invoiceNumber: nextNum,
                      clientName: "",
                      clientCompany: "",
                      clientEmail: "",
                      clientPhone: "",
                      clientAddress: "",
                      issueDate: new Date().toISOString().split("T")[0],
                      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
                      currency: "USD ($)",
                      status: "Pending",
                      items: [
                        { id: `item_${Date.now()}_1`, description: "Digital Marketing & Design Services", quantity: 1, unitPrice: 500, total: 500 }
                      ],
                      subtotal: 500,
                      discount: 0,
                      taxRate: 0,
                      taxAmount: 0,
                      total: 500,
                      paymentMethod: "Bank Transfer / Wise / Online Payment",
                      notes: "Thank you for doing business with Scaleminte! Please send payment within the due date."
                    });
                    setModalType("invoice");
                  }}
                  className="px-4 py-2.5 bg-brand-electric hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
                >
                  <Icons.Plus /> <span>+ Create New Invoice</span>
                </button>
              </div>

              {/* Financial Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0b1138] border border-white/10 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Invoiced</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-white">
                      ${invoices.reduce((acc, inv) => acc + (Number(inv.total) || 0), 0).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1">{invoices.length} invoices generated</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#0b1138] border border-emerald-500/30 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Paid Revenue</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-emerald-400">
                      ${invoices.filter((i) => i.status === "Paid").reduce((acc, inv) => acc + (Number(inv.total) || 0), 0).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-500/80 mt-1">{invoices.filter((i) => i.status === "Paid").length} paid invoices</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#0b1138] border border-amber-500/30 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Pending / Due</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-amber-400">
                      ${invoices.filter((i) => i.status !== "Paid").reduce((acc, inv) => acc + (Number(inv.total) || 0), 0).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-500/80 mt-1">{invoices.filter((i) => i.status !== "Paid").length} unpaid invoices</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#0b1138] border border-white/10 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Payment Rate</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-white">
                      {invoices.length > 0 ? Math.round((invoices.filter((i) => i.status === "Paid").length / invoices.length) * 100) : 0}%
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1">Collection efficiency</span>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-[#0b1138] border border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 w-full sm:w-80 bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs">
                  <span className="text-slate-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by client or invoice #..."
                    value={invoiceSearchQuery}
                    onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                    className="bg-transparent text-white w-full focus:outline-none placeholder:text-slate-500"
                  />
                  {invoiceSearchQuery && (
                    <button onClick={() => setInvoiceSearchQuery("")} className="text-slate-400 hover:text-white">✕</button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {["ALL", "PAID", "PENDING", "DRAFT", "OVERDUE"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setInvoiceStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition ${
                        invoiceStatusFilter === st
                          ? "bg-brand-electric text-white"
                          : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Invoices List Table */}
              <div className="bg-[#0b1138] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-black/40 text-slate-400 uppercase font-semibold border-b border-white/10">
                      <tr>
                        <th className="px-5 py-3.5">Invoice #</th>
                        <th className="px-5 py-3.5">Client & Company</th>
                        <th className="px-5 py-3.5">Issue Date</th>
                        <th className="px-5 py-3.5">Due Date</th>
                        <th className="px-5 py-3.5">Total Amount</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {invoices
                        .filter((inv) => {
                          const matchesSearch =
                            !invoiceSearchQuery ||
                            inv.invoiceNumber?.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
                            inv.clientName?.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
                            inv.clientCompany?.toLowerCase().includes(invoiceSearchQuery.toLowerCase());
                          const matchesFilter =
                            invoiceStatusFilter === "ALL" ||
                            inv.status?.toUpperCase() === invoiceStatusFilter;
                          return matchesSearch && matchesFilter;
                        })
                        .map((inv) => (
                          <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-5 py-4 font-mono font-bold text-white">
                              {inv.invoiceNumber}
                            </td>
                            <td className="px-5 py-4">
                              <div className="font-bold text-white">{inv.clientName}</div>
                              {inv.clientCompany && (
                                <div className="text-[11px] text-slate-400">{inv.clientCompany}</div>
                              )}
                            </td>
                            <td className="px-5 py-4 text-slate-400">
                              {inv.issueDate}
                            </td>
                            <td className="px-5 py-4 text-slate-400">
                              {inv.dueDate}
                            </td>
                            <td className="px-5 py-4 font-bold text-white text-sm">
                              ${Number(inv.total || 0).toLocaleString()}
                            </td>
                            <td className="px-5 py-4">
                              <button
                                onClick={() => toggleInvoiceStatus(inv)}
                                title="Click to toggle status"
                                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide cursor-pointer transition ${
                                  inv.status === "Paid"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                                    : inv.status === "Overdue"
                                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30"
                                    : "bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30"
                                }`}
                              >
                                {inv.status || "Pending"} ⇄
                              </button>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setPreviewInvoice(inv)}
                                  title="View, Print & Download PDF"
                                  className="px-3 py-1.5 bg-brand-electric/20 text-brand-electric hover:bg-brand-electric hover:text-white border border-brand-electric/40 rounded-xl font-bold transition cursor-pointer flex items-center gap-1 text-[11px]"
                                >
                                  <span>🖨️ View & Print</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setEditItem({ ...inv });
                                    setModalType("invoice");
                                  }}
                                  title="Edit Invoice"
                                  className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
                                >
                                  <Icons.Edit />
                                </button>
                                <button
                                  onClick={() => deleteInvoice(inv.id, inv.invoiceNumber)}
                                  title="Delete Invoice"
                                  className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition cursor-pointer"
                                >
                                  <Icons.Trash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      {invoices.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                            No invoices created yet. Click <span className="text-brand-electric font-semibold cursor-pointer" onClick={() => setModalType("invoice")}>+ Create New Invoice</span> to generate your first client bill.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CONFIRMATION MODAL */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1138] border border-rose-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <Icons.Warning />
              <h3 className="font-bold text-white text-base">Confirm Deletion</h3>
            </div>
            <p className="text-slate-300 text-sm font-semibold">{deleteConfirm.title}</p>
            <p className="text-slate-400 text-xs">{deleteConfirm.description}</p>
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setDeleteConfirm((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteConfirm.onConfirm}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM MODALS */}
      {modalType && editItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1138] border border-white/10 rounded-3xl p-6 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="font-bold text-white text-sm uppercase">Manage {modalType}</h3>
              <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-white p-1 cursor-pointer">✕</button>
            </div>

            {/* DEDICATED PRICING PACKAGE MODAL WITH SEPARATE FIELDS */}
            {modalType === "package" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  savePackage(editItem);
                }}
                className="space-y-4 text-xs"
              >
                {/* 1. Name & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Package Name / Title</label>
                    <input
                      type="text"
                      required
                      value={editItem.name || ""}
                      onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm"
                      placeholder="e.g. Professional"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Price Tag</label>
                    <input
                      type="text"
                      required
                      value={editItem.price || ""}
                      onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm"
                      placeholder="e.g. $2,499 or Custom"
                    />
                  </div>
                </div>

                {/* 2. Description */}
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Package Short Description</label>
                  <textarea
                    rows={2}
                    value={editItem.description || ""}
                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white leading-relaxed"
                    placeholder="e.g. Comprehensive solutions for growing brands needing a competitive edge."
                  />
                </div>

                {/* 3. Popular Badge & Toggle */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-xs">Featured / Popular Card Ribbon</span>
                      <p className="text-[11px] text-slate-400">Highlights this card with blue border & top badge</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(editItem.isPopular)}
                        onChange={(e) => setEditItem({ ...editItem, isPopular: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-electric"></div>
                    </label>
                  </div>

                  {editItem.isPopular && (
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Badge Text Label</label>
                      <input
                        type="text"
                        value={editItem.badgeText || "MOST POPULAR"}
                        onChange={(e) => setEditItem({ ...editItem, badgeText: e.target.value })}
                        className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white font-bold text-xs"
                        placeholder="e.g. MOST POPULAR, BEST VALUE, 20% OFF"
                      />
                    </div>
                  )}
                </div>

                {/* 4. Features List Builder */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <label className="block text-slate-300 font-bold text-xs">
                    Package Feature Bullet Points ({editItem.features?.length || 0})
                  </label>

                  {/* Add feature row */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeatureText}
                      onChange={(e) => setNewFeatureText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newFeatureText.trim()) {
                          e.preventDefault();
                          const curr = editItem.features || [];
                          setEditItem({ ...editItem, features: [...curr, newFeatureText.trim()] });
                          setNewFeatureText("");
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                      placeholder="Add a new feature bullet point..."
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFeatureText.trim()) {
                          const curr = editItem.features || [];
                          setEditItem({ ...editItem, features: [...curr, newFeatureText.trim()] });
                          setNewFeatureText("");
                        }
                      }}
                      className="px-3 py-2 bg-brand-electric text-white font-bold rounded-xl text-xs hover:bg-blue-600 cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>

                  {/* Feature items list */}
                  <div className="space-y-2 max-h-56 overflow-y-auto pt-1">
                    {editItem.features?.map((f: string, fIdx: number) => (
                      editingFeatureIndex === fIdx ? (
                        <div key={fIdx} className="flex items-center gap-2 p-2 bg-black/60 border border-brand-electric rounded-xl shadow-lg">
                          <span className="text-brand-electric font-bold text-xs">✏️</span>
                          <input
                            type="text"
                            autoFocus
                            value={editingFeatureText}
                            onChange={(e) => setEditingFeatureText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (editingFeatureText.trim()) {
                                  const updated = [...editItem.features];
                                  updated[fIdx] = editingFeatureText.trim();
                                  setEditItem({ ...editItem, features: updated });
                                }
                                setEditingFeatureIndex(null);
                              } else if (e.key === "Escape") {
                                setEditingFeatureIndex(null);
                              }
                            }}
                            className="flex-1 bg-white/10 text-white text-xs px-2 py-1 rounded-lg border border-white/20 focus:outline-none focus:border-brand-electric"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (editingFeatureText.trim()) {
                                const updated = [...editItem.features];
                                updated[fIdx] = editingFeatureText.trim();
                                setEditItem({ ...editItem, features: updated });
                              }
                              setEditingFeatureIndex(null);
                            }}
                            className="px-2.5 py-1 bg-brand-electric hover:bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                            title="Save Changes"
                          >
                            ✓ Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingFeatureIndex(null)}
                            className="px-2 py-1 bg-white/10 hover:bg-white/20 text-slate-300 rounded-lg text-xs cursor-pointer"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div key={fIdx} className="flex items-center justify-between gap-2 p-2 bg-black/30 hover:bg-black/50 border border-white/10 rounded-xl transition-colors group">
                          <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                            <span className="text-brand-electric font-bold text-xs shrink-0">✓</span>
                            <span
                              onClick={() => {
                                setEditingFeatureIndex(fIdx);
                                setEditingFeatureText(f);
                              }}
                              className="text-slate-200 text-xs truncate cursor-pointer hover:text-white"
                              title="Click to edit"
                            >
                              {f}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingFeatureIndex(fIdx);
                                setEditingFeatureText(f);
                              }}
                              className="p-1.5 bg-brand-electric/10 hover:bg-brand-electric text-brand-electric hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-medium"
                              title="Edit Feature"
                            >
                              <Icons.Edit />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = editItem.features.filter((_: any, i: number) => i !== fIdx);
                                setEditItem({ ...editItem, features: updated });
                              }}
                              className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-lg transition-colors cursor-pointer"
                              title="Delete Feature"
                            >
                              <Icons.Trash />
                            </button>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* 5. CTA Button Settings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Button Text</label>
                    <input
                      type="text"
                      value={editItem.buttonText || `Choose ${editItem.name || "Plan"}`}
                      onChange={(e) => setEditItem({ ...editItem, buttonText: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                      placeholder="e.g. Choose Professional Plan"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Button Link URL</label>
                    <input
                      type="text"
                      value={editItem.buttonLink || `/contact-us?plan=${encodeURIComponent(editItem.name || "")}`}
                      onChange={(e) => setEditItem({ ...editItem, buttonLink: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-xs"
                      placeholder="/contact-us?plan=Professional"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-brand-electric rounded-xl text-white font-bold cursor-pointer hover:bg-blue-600">
                    Save Package
                  </button>
                </div>
              </form>
            )}

            {/* OTHER MODALS */}
            {(modalType === "footerServiceLink" || modalType === "footerQuickLink" || modalType === "footerBottomLink") && (
              <form onSubmit={(e) => { e.preventDefault(); saveFooterLink(modalType === "footerServiceLink" ? "service" : modalType === "footerQuickLink" ? "quick" : "bottom", editItem); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Link Title / Label</label>
                  <input
                    type="text"
                    required
                    value={editItem.label}
                    onChange={(e) => setEditItem({ ...editItem, label: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                    placeholder="e.g. Graphic Design"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Target URL / Route</label>
                  <input
                    type="text"
                    required
                    value={editItem.link}
                    onChange={(e) => setEditItem({ ...editItem, link: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
                    placeholder="e.g. /services/graphics-design"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-brand-electric rounded-xl text-white font-semibold">Save Link</button>
                </div>
              </form>
            )}

            {modalType === "footerSocial" && (
              <form onSubmit={(e) => { e.preventDefault(); saveFooterLink("social", editItem); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Platform Name</label>
                  <input
                    type="text"
                    required
                    value={editItem.platform}
                    onChange={(e) => setEditItem({ ...editItem, platform: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                    placeholder="e.g. Facebook, Twitter, LinkedIn, Instagram"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Profile / Page URL</label>
                  <input
                    type="url"
                    required
                    value={editItem.url}
                    onChange={(e) => setEditItem({ ...editItem, url: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-brand-electric rounded-xl text-white font-semibold">Save Social Link</button>
                </div>
              </form>
            )}

            {modalType === "navItem" && (
              <form onSubmit={(e) => { e.preventDefault(); saveNavItem(editItem); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editItem.title}
                    onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                    placeholder="e.g. Google Ads Management"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Subtitle / Short Catchphrase</label>
                  <input
                    type="text"
                    required
                    value={editItem.subtitle}
                    onChange={(e) => setEditItem({ ...editItem, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                    placeholder="e.g. Maximize your search visibility"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Target Page URL / Link</label>
                  <input
                    type="text"
                    required
                    value={editItem.link}
                    onChange={(e) => setEditItem({ ...editItem, link: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
                    placeholder="e.g. /services/google-ads"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Menu Icon Type</label>
                  <select
                    value={editItem.icon || "search"}
                    onChange={(e) => setEditItem({ ...editItem, icon: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  >
                    <option value="search">🔍 Search (Ads / Analytics)</option>
                    <option value="link">🔗 Link (Meta Ads / Social)</option>
                    <option value="chat">💬 Chat (Social Media Management)</option>
                    <option value="video">🎥 Video (YouTube SEO)</option>
                    <option value="image">🎨 Image (Graphics Design)</option>
                    <option value="edit">🎬 Edit (Video Editing)</option>
                    <option value="code">&lt;/&gt; Code (Web Development)</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-brand-electric rounded-xl text-white font-semibold">Save to Dropdown</button>
                </div>
              </form>
            )}

            {modalType === "faq" && (
              <form onSubmit={(e) => { e.preventDefault(); saveFaq(editItem); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Question</label>
                  <input
                    type="text"
                    required
                    value={editItem.question}
                    onChange={(e) => setEditItem({ ...editItem, question: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Answer</label>
                  <textarea
                    rows={4}
                    required
                    value={editItem.answer}
                    onChange={(e) => setEditItem({ ...editItem, answer: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-brand-electric rounded-xl text-white font-semibold">Save FAQ</button>
                </div>
              </form>
            )}

            {modalType === "blog" && (
              <form onSubmit={(e) => { e.preventDefault(); saveBlog(editItem); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={editItem.title || ""}
                    onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold"
                    placeholder="e.g. 10 Proven Marketing Strategies for 2026"
                  />
                </div>
                <ImageUploadField
                  label="Featured Banner / Cover Image"
                  value={editItem.image || ""}
                  onChange={(url) => setEditItem({ ...editItem, image: url })}
                  aspectRatio="16/9"
                  placeholder="Image URL or upload file..."
                  helperText="Recommended 16:9 banner (Auto-compressed to ~100KB)"
                />
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Excerpt / Short Summary</label>
                  <textarea
                    rows={3}
                    value={editItem.excerpt || ""}
                    onChange={(e) => setEditItem({ ...editItem, excerpt: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white leading-relaxed"
                    placeholder="Brief description for the blog preview card..."
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white hover:bg-white/15 cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-brand-electric rounded-xl text-white font-bold hover:bg-blue-600 cursor-pointer shadow-lg shadow-brand-electric/25">Save Article</button>
                </div>
              </form>
            )}

            {modalType === "portfolio" && (
              <form onSubmit={(e) => { e.preventDefault(); savePortfolio(editItem); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editItem.title || ""}
                    onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold"
                    placeholder="e.g. Fintech Mobile App Redesign"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={editItem.category || ""}
                    onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                    placeholder="e.g. Web Design / Branding"
                  />
                </div>
                <ImageUploadField
                  label="Project Screenshot / Showcase Image"
                  value={editItem.image || ""}
                  onChange={(url) => setEditItem({ ...editItem, image: url })}
                  aspectRatio="16/9"
                  placeholder="Image URL or upload file..."
                  helperText="Showcase image (Auto-compressed to crisp WebP/JPEG)"
                />
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white hover:bg-white/15 cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-brand-electric rounded-xl text-white font-bold hover:bg-blue-600 cursor-pointer shadow-lg shadow-brand-electric/25">Save Project</button>
                </div>
              </form>
            )}

            {/* DEDICATED RICH TEAM MEMBER PROFILE MODAL */}
            {modalType === "team" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveTeam(editItem);
                }}
                className="space-y-4 text-xs"
              >
                {/* Sub-Tabs Navigation */}
                <div className="flex flex-wrap gap-1 p-1 bg-black/40 border border-white/10 rounded-2xl mb-4">
                  <button
                    type="button"
                    onClick={() => setTeamModalTab("basic")}
                    className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all text-center cursor-pointer ${
                      teamModalTab === "basic" ? "bg-brand-electric text-white shadow-md" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    👤 Profile & Bio
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeamModalTab("socials")}
                    className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all text-center cursor-pointer ${
                      teamModalTab === "socials" ? "bg-brand-electric text-white shadow-md" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    🌐 Social & Freelance
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeamModalTab("expertise")}
                    className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all text-center cursor-pointer ${
                      teamModalTab === "expertise" ? "bg-brand-electric text-white shadow-md" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    🎯 Expertise & Tools
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeamModalTab("experience")}
                    className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all text-center cursor-pointer ${
                      teamModalTab === "experience" ? "bg-brand-electric text-white shadow-md" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    💼 Exp & Education
                  </button>
                </div>

                {/* TAB 1: BASIC PROFILE & BIO */}
                {teamModalTab === "basic" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={editItem.name || ""}
                          onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-bold"
                          placeholder="e.g. Md Sakhawat Hossain"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Role / Designation</label>
                        <input
                          type="text"
                          required
                          value={editItem.role || ""}
                          onChange={(e) => setEditItem({ ...editItem, role: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                          placeholder="e.g. Senior Graphics Designer"
                        />
                      </div>
                    </div>

                    <ImageUploadField
                      label="Profile Photo"
                      value={editItem.img || ""}
                      onChange={(url) => setEditItem({ ...editItem, img: url })}
                      aspectRatio="avatar"
                      placeholder="/images/team1.jpg"
                      helperText="Square or portrait photo (Auto-compressed to ~80KB)"
                    />

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">About Me / Full Biography</label>
                      <textarea
                        rows={4}
                        value={editItem.bio || ""}
                        onChange={(e) => setEditItem({ ...editItem, bio: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white leading-relaxed"
                        placeholder="Write a comprehensive biography describing experience, passion, and achievements..."
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: SOCIAL, FIVERR & UPWORK PROFILES */}
                {teamModalTab === "socials" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                      <span className="font-bold text-white block text-xs">Social Profiles</span>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Facebook Profile URL</label>
                        <input
                          type="url"
                          value={editItem.facebookUrl || ""}
                          onChange={(e) => setEditItem({ ...editItem, facebookUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white font-mono text-xs"
                          placeholder="https://facebook.com/yourprofile"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">LinkedIn Profile URL</label>
                        <input
                          type="url"
                          value={editItem.linkedinUrl || ""}
                          onChange={(e) => setEditItem({ ...editItem, linkedinUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-white font-mono text-xs"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>

                    {/* Fiverr Section */}
                    <div className="p-4 bg-[#1dbf73]/10 border border-[#1dbf73]/30 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-[#1dbf73]">
                        <span className="w-2 h-2 rounded-full bg-[#1dbf73]"></span>
                        <span className="font-bold text-xs">Fiverr Freelance Seller Profile</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Seller Badge / Status</label>
                          <input
                            type="text"
                            value={editItem.fiverrStatus || "Top Rated Seller"}
                            onChange={(e) => setEditItem({ ...editItem, fiverrStatus: e.target.value })}
                            className="w-full px-3 py-2 bg-black/40 border border-[#1dbf73]/40 rounded-xl text-white font-bold text-xs"
                            placeholder="e.g. Top Rated Seller, Level 2 Seller"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Fiverr Profile Link</label>
                          <input
                            type="url"
                            value={editItem.fiverrLink || ""}
                            onChange={(e) => setEditItem({ ...editItem, fiverrLink: e.target.value })}
                            className="w-full px-3 py-2 bg-black/40 border border-[#1dbf73]/40 rounded-xl text-white font-mono text-xs"
                            placeholder="https://www.fiverr.com/username"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Upwork Section */}
                    <div className="p-4 bg-[#14a800]/10 border border-[#14a800]/30 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-[#14a800]">
                        <span className="w-2 h-2 rounded-full bg-[#14a800]"></span>
                        <span className="font-bold text-xs">Upwork Freelance Profile</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Upwork Badge / Status</label>
                          <input
                            type="text"
                            value={editItem.upworkStatus || "Top Rated Plus"}
                            onChange={(e) => setEditItem({ ...editItem, upworkStatus: e.target.value })}
                            className="w-full px-3 py-2 bg-black/40 border border-[#14a800]/40 rounded-xl text-white font-bold text-xs"
                            placeholder="e.g. Top Rated Plus, Top Rated, 100% Job Success"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Upwork Profile Link</label>
                          <input
                            type="url"
                            value={editItem.upworkLink || ""}
                            onChange={(e) => setEditItem({ ...editItem, upworkLink: e.target.value })}
                            className="w-full px-3 py-2 bg-black/40 border border-[#14a800]/40 rounded-xl text-white font-mono text-xs"
                            placeholder="https://www.upwork.com/freelancers/~username"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: CORE EXPERTISE & SOFTWARE TOOLS */}
                {teamModalTab === "expertise" && (
                  <div className="space-y-4">
                    {/* Core Expertise Section */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                      <label className="block text-slate-200 font-bold text-xs">
                        Core Expertise Skills ({editItem.expertise?.length || 0})
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newExpertiseText}
                          onChange={(e) => setNewExpertiseText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && newExpertiseText.trim()) {
                              e.preventDefault();
                              const curr = editItem.expertise || [];
                              setEditItem({ ...editItem, expertise: [...curr, newExpertiseText.trim()] });
                              setNewExpertiseText("");
                            }
                          }}
                          className="flex-1 px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                          placeholder="e.g. Brand Identity Design, UI/UX Prototyping..."
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newExpertiseText.trim()) {
                              const curr = editItem.expertise || [];
                              setEditItem({ ...editItem, expertise: [...curr, newExpertiseText.trim()] });
                              setNewExpertiseText("");
                            }
                          }}
                          className="px-3 py-2 bg-brand-electric text-white font-bold rounded-xl text-xs hover:bg-blue-600 cursor-pointer"
                        >
                          + Add Skill
                        </button>
                      </div>

                      <div className="space-y-2 max-h-36 overflow-y-auto">
                        {editItem.expertise?.map((skill: string, sIdx: number) => (
                          <div key={sIdx} className="flex items-center justify-between gap-2 p-2 bg-black/30 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className="text-brand-electric font-bold text-xs">•</span>
                              <input
                                type="text"
                                value={skill}
                                onChange={(e) => {
                                  const updated = [...editItem.expertise];
                                  updated[sIdx] = e.target.value;
                                  setEditItem({ ...editItem, expertise: updated });
                                }}
                                className="flex-1 bg-transparent text-white text-xs focus:outline-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = editItem.expertise.filter((_: any, i: number) => i !== sIdx);
                                setEditItem({ ...editItem, expertise: updated });
                              }}
                              className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded cursor-pointer"
                            >
                              <Icons.Trash />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Software & Tools Section */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                      <label className="block text-slate-200 font-bold text-xs">
                        Software & Tools ({editItem.tools?.length || 0})
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newToolText}
                          onChange={(e) => setNewToolText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && newToolText.trim()) {
                              e.preventDefault();
                              const curr = editItem.tools || [];
                              setEditItem({ ...editItem, tools: [...curr, newToolText.trim()] });
                              setNewToolText("");
                            }
                          }}
                          className="flex-1 px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                          placeholder="e.g. Adobe Photoshop, Figma, After Effects..."
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newToolText.trim()) {
                              const curr = editItem.tools || [];
                              setEditItem({ ...editItem, tools: [...curr, newToolText.trim()] });
                              setNewToolText("");
                            }
                          }}
                          className="px-3 py-2 bg-brand-electric text-white font-bold rounded-xl text-xs hover:bg-blue-600 cursor-pointer"
                        >
                          + Add Tool
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1 max-h-36 overflow-y-auto">
                        {editItem.tools?.map((tool: string, tIdx: number) => (
                          <div key={tIdx} className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-white/15 rounded-xl">
                            <input
                              type="text"
                              value={tool}
                              onChange={(e) => {
                                const updated = [...editItem.tools];
                                updated[tIdx] = e.target.value;
                                setEditItem({ ...editItem, tools: updated });
                              }}
                              className="bg-transparent text-white text-xs font-semibold focus:outline-none w-28"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = editItem.tools.filter((_: any, i: number) => i !== tIdx);
                                setEditItem({ ...editItem, tools: updated });
                              }}
                              className="text-rose-400 hover:text-rose-300 p-0.5 cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: WORK EXPERIENCE & EDUCATION */}
                {teamModalTab === "experience" && (
                  <div className="space-y-4">
                    {/* Experience Section */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                      <label className="block text-slate-200 font-bold text-xs">
                        Work Experience Timeline ({editItem.experience?.length || 0})
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={newExp.title}
                          onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                          className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                          placeholder="Job Title (e.g. Lead Designer)"
                        />
                        <input
                          type="text"
                          value={newExp.company}
                          onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                          className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                          placeholder="Company (e.g. Scaleminte)"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newExp.period}
                            onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                            className="flex-1 px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                            placeholder="Period (e.g. 2022 - Present)"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newExp.title.trim() && newExp.company.trim()) {
                                const curr = editItem.experience || [];
                                setEditItem({ ...editItem, experience: [...curr, { ...newExp }] });
                                setNewExp({ title: "", company: "", period: "" });
                              }
                            }}
                            className="px-3 py-2 bg-brand-electric text-white font-bold rounded-xl text-xs hover:bg-blue-600 cursor-pointer shrink-0"
                          >
                            + Add
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 max-h-36 overflow-y-auto">
                        {editItem.experience?.map((exp: any, expIdx: number) => (
                          <div key={expIdx} className="flex items-center justify-between gap-2 p-2 bg-black/30 border border-white/10 rounded-xl">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                              <input
                                type="text"
                                value={exp.title || ""}
                                onChange={(e) => {
                                  const updated = [...editItem.experience];
                                  updated[expIdx] = { ...updated[expIdx], title: e.target.value };
                                  setEditItem({ ...editItem, experience: updated });
                                }}
                                className="bg-transparent text-white text-xs font-bold focus:outline-none"
                                placeholder="Title"
                              />
                              <input
                                type="text"
                                value={exp.company || ""}
                                onChange={(e) => {
                                  const updated = [...editItem.experience];
                                  updated[expIdx] = { ...updated[expIdx], company: e.target.value };
                                  setEditItem({ ...editItem, experience: updated });
                                }}
                                className="bg-transparent text-brand-electric text-xs focus:outline-none"
                                placeholder="Company"
                              />
                              <input
                                type="text"
                                value={exp.period || ""}
                                onChange={(e) => {
                                  const updated = [...editItem.experience];
                                  updated[expIdx] = { ...updated[expIdx], period: e.target.value };
                                  setEditItem({ ...editItem, experience: updated });
                                }}
                                className="bg-transparent text-slate-400 text-xs focus:outline-none"
                                placeholder="Period"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = editItem.experience.filter((_: any, i: number) => i !== expIdx);
                                setEditItem({ ...editItem, experience: updated });
                              }}
                              className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded cursor-pointer shrink-0"
                            >
                              <Icons.Trash />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education Section */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                      <label className="block text-slate-200 font-bold text-xs">
                        Education History ({editItem.education?.length || 0})
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={newEdu.degree}
                          onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                          className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                          placeholder="Degree (e.g. B.Sc in CSE)"
                        />
                        <input
                          type="text"
                          value={newEdu.institution}
                          onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                          className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                          placeholder="Institution / University"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newEdu.year}
                            onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
                            className="flex-1 px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                            placeholder="Year (e.g. 2019)"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newEdu.degree.trim() && newEdu.institution.trim()) {
                                const curr = editItem.education || [];
                                setEditItem({ ...editItem, education: [...curr, { ...newEdu }] });
                                setNewEdu({ degree: "", institution: "", year: "" });
                              }
                            }}
                            className="px-3 py-2 bg-brand-electric text-white font-bold rounded-xl text-xs hover:bg-blue-600 cursor-pointer shrink-0"
                          >
                            + Add
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 max-h-36 overflow-y-auto">
                        {editItem.education?.map((edu: any, eduIdx: number) => (
                          <div key={eduIdx} className="flex items-center justify-between gap-2 p-2 bg-black/30 border border-white/10 rounded-xl">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                              <input
                                type="text"
                                value={edu.degree || ""}
                                onChange={(e) => {
                                  const updated = [...editItem.education];
                                  updated[eduIdx] = { ...updated[eduIdx], degree: e.target.value };
                                  setEditItem({ ...editItem, education: updated });
                                }}
                                className="bg-transparent text-white text-xs font-bold focus:outline-none"
                                placeholder="Degree"
                              />
                              <input
                                type="text"
                                value={edu.institution || ""}
                                onChange={(e) => {
                                  const updated = [...editItem.education];
                                  updated[eduIdx] = { ...updated[eduIdx], institution: e.target.value };
                                  setEditItem({ ...editItem, education: updated });
                                }}
                                className="bg-transparent text-slate-300 text-xs focus:outline-none"
                                placeholder="Institution"
                              />
                              <input
                                type="text"
                                value={edu.year || ""}
                                onChange={(e) => {
                                  const updated = [...editItem.education];
                                  updated[eduIdx] = { ...updated[eduIdx], year: e.target.value };
                                  setEditItem({ ...editItem, education: updated });
                                }}
                                className="bg-transparent text-slate-400 text-xs focus:outline-none"
                                placeholder="Year"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = editItem.education.filter((_: any, i: number) => i !== eduIdx);
                                setEditItem({ ...editItem, education: updated });
                              }}
                              className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded cursor-pointer shrink-0"
                            >
                              <Icons.Trash />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-brand-electric rounded-xl text-white font-bold cursor-pointer hover:bg-blue-600">
                    Save Member Profile
                  </button>
                </div>
              </form>
            )}

            {modalType === "service" && (
              <form onSubmit={(e) => { e.preventDefault(); saveService(editItem); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Service Title</label>
                  <input type="text" required value={editItem.title} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Subtitle</label>
                  <input type="text" value={editItem.subtitle} onChange={(e) => setEditItem({ ...editItem, subtitle: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Description</label>
                  <textarea rows={3} value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-brand-electric rounded-xl text-white font-semibold">Save</button>
                </div>
              </form>
            )}

            {/* DEDICATED INVOICE BUILDER & EDITOR MODAL */}
            {modalType === "invoice" && editItem && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveInvoice(editItem);
                }}
                className="space-y-4 text-xs"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      {editItem.id?.startsWith("inv_draft_") ? "Create New Client Invoice" : `Edit Invoice ${editItem.invoiceNumber}`}
                    </h3>
                    <p className="text-[11px] text-slate-400">Fill in client information, service line items, and payment details.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-brand-electric/20 text-brand-electric rounded-lg font-mono font-bold text-xs">
                    {editItem.invoiceNumber}
                  </span>
                </div>

                {/* 1. Client Details Section */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <span className="font-bold text-white block text-xs">1. Client / Customer Details</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Client Name *</label>
                      <input
                        type="text"
                        required
                        value={editItem.clientName || ""}
                        onChange={(e) => setEditItem({ ...editItem, clientName: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white font-bold text-xs"
                        placeholder="e.g. Alex Morgan"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={editItem.clientCompany || ""}
                        onChange={(e) => setEditItem({ ...editItem, clientCompany: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                        placeholder="e.g. Nova Growth Ventures"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Client Email Address</label>
                      <input
                        type="email"
                        value={editItem.clientEmail || ""}
                        onChange={(e) => setEditItem({ ...editItem, clientEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white font-mono text-xs"
                        placeholder="client@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Client Phone</label>
                      <input
                        type="text"
                        value={editItem.clientPhone || ""}
                        onChange={(e) => setEditItem({ ...editItem, clientPhone: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Client Billing Address</label>
                    <input
                      type="text"
                      value={editItem.clientAddress || ""}
                      onChange={(e) => setEditItem({ ...editItem, clientAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                      placeholder="e.g. 742 Evergreen Terrace, San Francisco, CA"
                    />
                  </div>
                </div>

                {/* 2. Invoice Dates & Status */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <span className="font-bold text-white block text-xs">2. Invoice Settings & Dates</span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Invoice Number</label>
                      <input
                        type="text"
                        required
                        value={editItem.invoiceNumber || ""}
                        onChange={(e) => setEditItem({ ...editItem, invoiceNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white font-mono text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Issue Date</label>
                      <input
                        type="date"
                        required
                        value={editItem.issueDate || ""}
                        onChange={(e) => setEditItem({ ...editItem, issueDate: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Due Date</label>
                      <input
                        type="date"
                        required
                        value={editItem.dueDate || ""}
                        onChange={(e) => setEditItem({ ...editItem, dueDate: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Payment Status</label>
                      <select
                        value={editItem.status || "Pending"}
                        onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white font-bold text-xs"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Dynamic Line Items Table */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white block text-xs">3. Services & Line Items ({editItem.items?.length || 0})</span>
                  </div>

                  {/* Add New Line Item Row */}
                  <div className="p-3 bg-black/40 border border-white/10 rounded-xl space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400">Add Line Item / Service</span>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <input
                        type="text"
                        placeholder="Service Description (e.g. Logo Design, Web Development)"
                        value={newInvoiceItem.description}
                        onChange={(e) => setNewInvoiceItem({ ...newInvoiceItem, description: e.target.value })}
                        className="sm:col-span-6 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={newInvoiceItem.quantity}
                        onChange={(e) => setNewInvoiceItem({ ...newInvoiceItem, quantity: Math.max(1, Number(e.target.value) || 1) })}
                        className="sm:col-span-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Price ($)"
                        value={newInvoiceItem.unitPrice}
                        onChange={(e) => setNewInvoiceItem({ ...newInvoiceItem, unitPrice: Number(e.target.value) || 0 })}
                        className="sm:col-span-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newInvoiceItem.description.trim()) {
                            const qty = Number(newInvoiceItem.quantity) || 1;
                            const price = Number(newInvoiceItem.unitPrice) || 0;
                            const itemToAdd = {
                              id: `item_${Date.now()}`,
                              description: newInvoiceItem.description.trim(),
                              quantity: qty,
                              unitPrice: price,
                              total: qty * price,
                            };
                            const updatedItems = [...(editItem.items || []), itemToAdd];
                            const subtotal = updatedItems.reduce((acc: number, it: any) => acc + (Number(it.total) || 0), 0);
                            const discount = Number(editItem.discount) || 0;
                            const taxRate = Number(editItem.taxRate) || 0;
                            const taxAmount = (subtotal - discount) * (taxRate / 100);
                            setEditItem({
                              ...editItem,
                              items: updatedItems,
                              subtotal,
                              taxAmount,
                              total: Math.max(0, subtotal - discount + taxAmount),
                            });
                            setNewInvoiceItem({ description: "", quantity: 1, unitPrice: 0 });
                          }
                        }}
                        className="sm:col-span-2 px-3 py-2 bg-brand-electric text-white font-bold rounded-lg text-xs hover:bg-blue-600 cursor-pointer"
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>

                  {/* Line Items List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {editItem.items?.map((it: any, itIdx: number) => (
                      <div key={itIdx} className="grid grid-cols-12 gap-2 items-center p-2.5 bg-black/30 border border-white/10 rounded-xl">
                        <input
                          type="text"
                          value={it.description || ""}
                          onChange={(e) => {
                            const updated = [...editItem.items];
                            updated[itIdx] = { ...updated[itIdx], description: e.target.value };
                            setEditItem({ ...editItem, items: updated });
                          }}
                          className="col-span-6 bg-transparent text-white text-xs font-semibold focus:outline-none"
                          placeholder="Description"
                        />
                        <div className="col-span-2 flex items-center gap-1">
                          <span className="text-slate-500 text-[10px]">Qty:</span>
                          <input
                            type="number"
                            min="1"
                            value={it.quantity}
                            onChange={(e) => {
                              const qty = Math.max(1, Number(e.target.value) || 1);
                              const updated = [...editItem.items];
                              updated[itIdx] = {
                                ...updated[itIdx],
                                quantity: qty,
                                total: qty * (Number(updated[itIdx].unitPrice) || 0),
                              };
                              const subtotal = updated.reduce((acc: number, x: any) => acc + (Number(x.total) || 0), 0);
                              setEditItem({ ...editItem, items: updated, subtotal });
                            }}
                            className="w-12 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-white text-xs"
                          />
                        </div>
                        <div className="col-span-2 flex items-center gap-1">
                          <span className="text-slate-500 text-[10px]">$</span>
                          <input
                            type="number"
                            min="0"
                            value={it.unitPrice}
                            onChange={(e) => {
                              const price = Number(e.target.value) || 0;
                              const updated = [...editItem.items];
                              updated[itIdx] = {
                                ...updated[itIdx],
                                unitPrice: price,
                                total: (Number(updated[itIdx].quantity) || 1) * price,
                              };
                              const subtotal = updated.reduce((acc: number, x: any) => acc + (Number(x.total) || 0), 0);
                              setEditItem({ ...editItem, items: updated, subtotal });
                            }}
                            className="w-16 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-white text-xs font-mono"
                          />
                        </div>
                        <div className="col-span-1 text-right font-mono font-bold text-white text-xs">
                          ${(Number(it.quantity || 1) * Number(it.unitPrice || 0)).toLocaleString()}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = editItem.items.filter((_: any, i: number) => i !== itIdx);
                            const subtotal = updated.reduce((acc: number, x: any) => acc + (Number(x.total) || 0), 0);
                            setEditItem({ ...editItem, items: updated, subtotal });
                          }}
                          className="col-span-1 text-rose-400 hover:text-rose-300 p-1 flex justify-end cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Financial Math Summary */}
                  <div className="p-3 bg-black/40 border border-white/10 rounded-xl space-y-2 mt-3">
                    <div className="flex justify-between items-center text-slate-300 text-xs">
                      <span>Subtotal:</span>
                      <span className="font-mono font-bold text-white">
                        ${(editItem.items || []).reduce((acc: number, it: any) => acc + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-xs shrink-0">Discount ($):</span>
                        <input
                          type="number"
                          min="0"
                          value={editItem.discount || 0}
                          onChange={(e) => setEditItem({ ...editItem, discount: Number(e.target.value) || 0 })}
                          className="w-24 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs"
                        />
                      </div>
                      <div className="flex items-center gap-2 sm:justify-end">
                        <span className="text-slate-400 text-xs shrink-0">Tax / VAT (%):</span>
                        <input
                          type="number"
                          min="0"
                          value={editItem.taxRate || 0}
                          onChange={(e) => setEditItem({ ...editItem, taxRate: Number(e.target.value) || 0 })}
                          className="w-20 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/10 text-sm font-extrabold text-white">
                      <span className="text-brand-electric">Grand Total:</span>
                      <span className="font-mono text-base text-emerald-400">
                        ${Math.max(
                          0,
                          (editItem.items || []).reduce((acc: number, it: any) => acc + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0) -
                            (Number(editItem.discount) || 0) +
                            ((editItem.items || []).reduce((acc: number, it: any) => acc + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0) - (Number(editItem.discount) || 0)) *
                              ((Number(editItem.taxRate) || 0) / 100)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. Payment Terms & Client Notes */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <span className="font-bold text-white block text-xs">4. Payment Terms & Client Notes</span>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Payment Instructions / Bank Details</label>
                    <input
                      type="text"
                      value={editItem.paymentMethod || ""}
                      onChange={(e) => setEditItem({ ...editItem, paymentMethod: e.target.value })}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                      placeholder="e.g. Bank Transfer (IBAN: ...), Wise: client@..., PayPal: ..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Client Notes / Scope Notice</label>
                    <textarea
                      rows={2}
                      value={editItem.notes || ""}
                      onChange={(e) => setEditItem({ ...editItem, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                      placeholder="e.g. Thank you for your business! Please make payment within 14 days."
                    />
                  </div>
                </div>

                {/* 5. Company Logo & Authorized Signature */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <span className="font-bold text-white block text-xs">5. Company Logo & Authorized Signature / Stamp</span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploadField
                      label="Invoice Header Logo"
                      value={editItem.logoUrl || ""}
                      onChange={(url) => setEditItem({ ...editItem, logoUrl: url })}
                      aspectRatio="1/1"
                      placeholder="Logo Image URL or upload..."
                      helperText="Company logo on invoice header"
                    />

                    <ImageUploadField
                      label="Authorized Signature / Seal Image"
                      value={editItem.signatureUrl || ""}
                      onChange={(url) => setEditItem({ ...editItem, signatureUrl: url })}
                      aspectRatio="1/1"
                      placeholder="Signature Image URL or upload..."
                      helperText="Official signature/stamp (PNG recommended)"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-slate-400 font-semibold text-[11px] mb-1">Signer Full Name</label>
                      <input
                        type="text"
                        value={editItem.signerName || "Md Sakhawat Hossain"}
                        onChange={(e) => setEditItem({ ...editItem, signerName: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white font-bold text-xs"
                        placeholder="e.g. Md Sakhawat Hossain"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold text-[11px] mb-1">Signer Title / Role</label>
                      <input
                        type="text"
                        value={editItem.signerTitle || "Founder & CEO"}
                        onChange={(e) => setEditItem({ ...editItem, signerTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs"
                        placeholder="e.g. Founder & CEO"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 bg-white/10 rounded-xl text-white cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-brand-electric rounded-xl text-white font-bold cursor-pointer hover:bg-blue-600 shadow-lg shadow-blue-500/20">
                    Save Invoice
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DEDICATED PRINTABLE CLIENT INVOICE MODAL */}
      {previewInvoice && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              body * { visibility: hidden !important; }
              #printable-invoice-sheet, #printable-invoice-sheet * { visibility: visible !important; }
              #printable-invoice-sheet {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 24px !important;
                box-shadow: none !important;
                border: none !important;
                background: white !important;
                color: black !important;
              }
              .no-print { display: none !important; }
            }
          `}} />

          <div className="bg-[#0b1138] border border-white/15 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col my-8">
            {/* Top Toolbar */}
            <div className="p-4 bg-[#040822] border-b border-white/10 flex items-center justify-between no-print">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">Invoice Preview</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-brand-electric/20 text-brand-electric border border-brand-electric/40">
                  {previewInvoice.invoiceNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer transition"
                >
                  <span>🖨️ Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setPreviewInvoice(null)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs cursor-pointer transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* A4 Document Paper Sheet */}
            <div className="p-6 md:p-10 overflow-y-auto max-h-[80vh] bg-slate-950/40">
              <div id="printable-invoice-sheet" className="bg-white text-slate-900 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-2 border-slate-100 pb-8">
                  <div>
                    {previewInvoice.logoUrl ? (
                      <div className="mb-2">
                        <img src={previewInvoice.logoUrl} alt="Company Logo" className="h-12 w-auto max-w-[200px] object-contain" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#040822] flex items-center justify-center text-white font-extrabold text-lg">
                          S
                        </div>
                        <span className="text-2xl font-black text-[#040822] tracking-tight">{settings.siteName || "Scaleminte"}</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 font-medium">{previewInvoice.companyAddress || "360° Creative & Digital Support Agency"}</p>
                    <p className="text-xs text-slate-500">{previewInvoice.companyEmail || "hello@scaleminte.com"} • www.scaleminte.com</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">INVOICE</h2>
                    <p className="font-mono text-sm font-bold text-brand-electric mt-1">{previewInvoice.invoiceNumber}</p>
                    <div className="mt-2 inline-block">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        previewInvoice.status === "Paid"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : previewInvoice.status === "Overdue"
                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}>
                        {previewInvoice.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Billing Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8 py-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Billed To:</span>
                    <h4 className="text-base font-extrabold text-slate-900">{previewInvoice.clientName}</h4>
                    {previewInvoice.clientCompany && (
                      <p className="text-xs font-semibold text-slate-700">{previewInvoice.clientCompany}</p>
                    )}
                    {previewInvoice.clientEmail && (
                      <p className="text-xs text-slate-600 mt-1">{previewInvoice.clientEmail}</p>
                    )}
                    {previewInvoice.clientPhone && (
                      <p className="text-xs text-slate-600">{previewInvoice.clientPhone}</p>
                    )}
                    {previewInvoice.clientAddress && (
                      <p className="text-xs text-slate-500 mt-1">{previewInvoice.clientAddress}</p>
                    )}
                  </div>

                  <div className="sm:text-right space-y-1.5">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Invoice Date:</span>
                      <span className="text-xs font-bold text-slate-800">{previewInvoice.issueDate}</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Payment Due Date:</span>
                      <span className="text-xs font-bold text-rose-600">{previewInvoice.dueDate}</span>
                    </div>
                  </div>
                </div>

                {/* Line Items Table */}
                <table className="w-full text-left text-xs mb-8">
                  <thead>
                    <tr className="border-b-2 border-slate-900 text-slate-900 font-bold uppercase text-[11px]">
                      <th className="py-3">Item Description</th>
                      <th className="py-3 text-center">Qty</th>
                      <th className="py-3 text-right">Unit Price</th>
                      <th className="py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {previewInvoice.items?.map((it: any, i: number) => (
                      <tr key={i} className="text-slate-800">
                        <td className="py-3.5 font-semibold">{it.description}</td>
                        <td className="py-3.5 text-center font-mono">{it.quantity}</td>
                        <td className="py-3.5 text-right font-mono">${Number(it.unitPrice || 0).toLocaleString()}</td>
                        <td className="py-3.5 text-right font-mono font-bold text-slate-900">${(Number(it.quantity || 1) * Number(it.unitPrice || 0)).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Calculation Summary */}
                <div className="flex flex-col sm:flex-row justify-between gap-8 pt-4 border-t border-slate-200">
                  <div className="max-w-sm space-y-3">
                    {previewInvoice.paymentMethod && (
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Payment Instructions:</span>
                        <p className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 font-mono leading-relaxed">
                          {previewInvoice.paymentMethod}
                        </p>
                      </div>
                    )}
                    {previewInvoice.notes && (
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Notes / Terms:</span>
                        <p className="text-xs text-slate-500 italic">{previewInvoice.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="w-full sm:w-64 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-mono font-semibold text-slate-900">${Number(previewInvoice.subtotal || 0).toLocaleString()}</span>
                    </div>
                    {Number(previewInvoice.discount) > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount:</span>
                        <span className="font-mono font-semibold">-${Number(previewInvoice.discount).toLocaleString()}</span>
                      </div>
                    )}
                    {Number(previewInvoice.taxAmount) > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Tax / VAT ({previewInvoice.taxRate}%):</span>
                        <span className="font-mono font-semibold">+${Number(previewInvoice.taxAmount).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t-2 border-slate-900 text-sm font-black text-slate-900">
                      <span>Total Amount:</span>
                      <span className="text-lg font-mono text-brand-electric">${Number(previewInvoice.total || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Signature & Stamp */}
                <div className="mt-14 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-slate-500 text-[11px]">
                  <div>
                    <span className="text-slate-400 block mb-1">Generated Date:</span>
                    <span className="font-semibold text-slate-700">{new Date().toLocaleDateString()}</span>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    {previewInvoice.signatureUrl ? (
                      <div className="mb-2">
                        <img src={previewInvoice.signatureUrl} alt="Authorized Signature" className="h-14 w-auto object-contain max-w-[180px]" />
                      </div>
                    ) : (
                      <div className="h-10 border-b border-slate-300 w-40 mb-2"></div>
                    )}
                    <span className="text-xs font-extrabold text-slate-900">{previewInvoice.signerName || "Md Sakhawat Hossain"}</span>
                    <span className="text-[11px] text-slate-500">{previewInvoice.signerTitle || "Founder & CEO, Scaleminte"}</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Authorized Signature & Stamp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
