"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsService = exports.SettingsService = exports.defaultSettings = void 0;
const fileStore_1 = require("../utils/fileStore");
exports.defaultSettings = {
    siteName: "Scaleminte",
    tagline: "We Build Brands That Drive Growth",
    logoUrl: "/images/logo.png",
    faviconUrl: "/favicon.ico",
    logoConfig: {
        url: "/images/logo.png",
        width: "32px",
        height: "32px",
        fit: "contain",
        radius: "none",
    },
    primaryColor: "#1B43FF",
    secondaryColor: "#040822",
    accentColor: "#00d2ff",
    contactEmail: "hello@scaleminte.com",
    contactPhone: "+23 8976-098-345",
    address: "211 Treutel Parks, California",
    facebookUrl: "https://facebook.com",
    twitterUrl: "https://twitter.com",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com",
    heroHeadline: "Scaleminte is a design & digital marketing agency for fast-growing brands.",
    heroSubtitle: "Scale your revenue with high-impact visuals, data-driven ad campaigns, and high-converting websites.",
    footerCopyright: "© 2026 Scaleminte. All rights reserved.",
    navbarMenu: {
        servicesDropdown: {
            navLabel: "Services",
            sidebarLabel: "SERVICES",
            sidebarDescription: "Discover our comprehensive suite of digital marketing and creative services designed to scale your brand.",
            items: [
                { id: "s1", title: "Google Ads Management", subtitle: "Maximize your search visibility", link: "/services/google-ads", icon: "search" },
                { id: "s2", title: "Meta Ads Management", subtitle: "Targeted social media campaigns", link: "/services/meta-ads", icon: "link" },
                { id: "s3", title: "Social Media Management", subtitle: "Build and engage your audience", link: "/services/social-media-management", icon: "chat" },
                { id: "s4", title: "YouTube Video SEO", subtitle: "Rank higher on video search", link: "/services/youtube-video-seo", icon: "video" },
                { id: "s5", title: "Graphics Design", subtitle: "Crafting timeless visual identities", link: "/services/graphics-design", icon: "image" },
                { id: "s6", title: "Video Editing", subtitle: "Compelling visual storytelling", link: "/services/video-editing", icon: "edit" },
                { id: "s7", title: "Website Developing", subtitle: "Functional and modern web solutions", link: "/services/website-developing", icon: "code" },
            ],
        },
    },
    footerConfig: {
        tagline: "We Build Brands That Drive Growth",
        description: "Your 360° digital growth partner. We build innovative brands and engineer marketing strategies that drive real business growth.",
        copyright: "© 2026 Scaleminte. All rights reserved.",
        socials: [
            { id: "soc_1", platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
            { id: "soc_2", platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
            { id: "soc_3", platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
            { id: "soc_4", platform: "Instagram", url: "https://instagram.com", icon: "instagram" },
        ],
        servicesColumn: {
            title: "Services",
            links: [
                { id: "fl_s1", label: "Graphic Design", link: "/services/graphics-design" },
                { id: "fl_s2", label: "Web Development", link: "/services/website-developing" },
                { id: "fl_s3", label: "Meta Ads Management", link: "/services/meta-ads" },
                { id: "fl_s4", label: "Google Ads", link: "/services/google-ads" },
                { id: "fl_s5", label: "Video Editing", link: "/services/video-editing" },
                { id: "fl_s6", label: "Social Media Management", link: "/services/social-media-management" },
                { id: "fl_s7", label: "YouTube Video SEO", link: "/services/youtube-video-seo" },
            ],
        },
        quickLinksColumn: {
            title: "Quick Links",
            links: [
                { id: "fl_q1", label: "Home", link: "/" },
                { id: "fl_q2", label: "About Us", link: "/about-us" },
                { id: "fl_q3", label: "Portfolio", link: "/portfolio" },
                { id: "fl_q4", label: "Pricing Packages", link: "/packages" },
                { id: "fl_q5", label: "Insights & Blog", link: "/blogs" },
                { id: "fl_q6", label: "Contact Us", link: "/contact-us" },
            ],
        },
        contactDetails: {
            title: "Contact",
            email: "hello@scaleminte.com",
            phone: "+23 8976-098-345",
            address: "211 Treutel Parks, California",
        },
        bottomLinks: [
            { id: "fl_b1", label: "Terms and Condition", link: "/terms-and-condition" },
            { id: "fl_b2", label: "Privacy Policy", link: "/privacy-policy" },
        ],
    },
    legalPages: {
        termsAndConditions: {
            title: "Terms and Condition",
            lastUpdated: "October 2026",
            content: `1. Acceptance of Terms\nBy accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.\n\n2. Provision of Services\nScaleminte provides digital marketing, web development, and design services. We reserve the right to modify or discontinue services with or without notice.\n\n3. Client Responsibilities\nYou agree to provide us with everything needed to complete the project, including assets, text, images, and other information in a timely manner.\n\n4. Intellectual Property\nAll custom deliverables created for the client become client property upon full payment completion, while Scaleminte retains rights to showcase work in its portfolio.`,
        },
        privacyPolicy: {
            title: "Privacy Policy",
            lastUpdated: "October 2026",
            content: `1. Information We Collect\nWe collect information you provide directly to us when contacting our agency, requesting quotes, or signing up for consultations.\n\n2. How We Use Information\nWe use information to provide our services, process requests, improve client experience, and communicate strategy updates.\n\n3. Data Protection & Security\nWe employ industry-standard encryption and security protocols to safeguard your personal data and business information from unauthorized access.\n\n4. Contact Us About Privacy\nIf you have questions about this policy, please reach out to us at our official contact email.`,
        },
    },
    carouselConfig: {
        cardWidth: "480px",
        cardHeight: "340px",
        aspectRatio: "16/10",
        radius: "rounded-[2rem]",
    },
    faqSection: {
        image: "/images/corporate.jpg",
        headline: "Frequently Asked Questions",
        subtitle: "Powerful Digital Marketing Features That Drive Business Growth",
    },
    images: {
        heroCarousel: [
            { id: "c1", title: "Educational Design", url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80", position: "center" },
            { id: "c2", title: "SaaS Dashboard", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", position: "center" },
            { id: "c3", title: "E-Commerce App", url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80", position: "center" },
            { id: "c4", title: "Corporate Identity", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", position: "center" },
            { id: "c5", title: "Social Media Platform", url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80", position: "center" },
        ],
        industryCards: {
            startup: { url: "/images/startup.jpg", width: "100%", height: "100%", fit: "cover", position: "center" },
            smallBusiness: { url: "/images/storefront.jpg", width: "100%", height: "100%", fit: "cover", position: "center" },
            ecommerce: { url: "/images/ecommerce.jpg", width: "100%", height: "100%", fit: "cover", position: "center" },
            localBusiness: { url: "/images/storefront.jpg", width: "100%", height: "100%", fit: "cover", position: "center" },
            corporate: { url: "/images/corporate.jpg", width: "100%", height: "100%", fit: "cover", position: "center" },
        },
        clientLogos: [
            { id: "l1", name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", width: "120px", height: "36px" },
            { id: "l2", name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", width: "120px", height: "36px" },
            { id: "l3", name: "Shopify", url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg", width: "120px", height: "36px" },
        ],
    },
};
const SETTINGS_FILE = "settings.json";
function getBaseSettings() {
    const raw = (0, fileStore_1.loadData)(SETTINGS_FILE, exports.defaultSettings);
    return {
        ...exports.defaultSettings,
        ...(raw || {}),
        navbarMenu: {
            ...exports.defaultSettings.navbarMenu,
            ...(raw?.navbarMenu || {}),
            servicesDropdown: {
                ...exports.defaultSettings.navbarMenu.servicesDropdown,
                ...(raw?.navbarMenu?.servicesDropdown || {}),
                items: Array.isArray(raw?.navbarMenu?.servicesDropdown?.items)
                    ? raw.navbarMenu.servicesDropdown.items
                    : exports.defaultSettings.navbarMenu.servicesDropdown.items,
            },
        },
        footerConfig: {
            ...exports.defaultSettings.footerConfig,
            ...(raw?.footerConfig || {}),
            socials: Array.isArray(raw?.footerConfig?.socials)
                ? raw.footerConfig.socials
                : exports.defaultSettings.footerConfig.socials,
            servicesColumn: {
                ...exports.defaultSettings.footerConfig.servicesColumn,
                ...(raw?.footerConfig?.servicesColumn || {}),
                links: Array.isArray(raw?.footerConfig?.servicesColumn?.links)
                    ? raw.footerConfig.servicesColumn.links
                    : exports.defaultSettings.footerConfig.servicesColumn.links,
            },
            quickLinksColumn: {
                ...exports.defaultSettings.footerConfig.quickLinksColumn,
                ...(raw?.footerConfig?.quickLinksColumn || {}),
                links: Array.isArray(raw?.footerConfig?.quickLinksColumn?.links)
                    ? raw.footerConfig.quickLinksColumn.links
                    : exports.defaultSettings.footerConfig.quickLinksColumn.links,
            },
            contactDetails: {
                ...exports.defaultSettings.footerConfig.contactDetails,
                ...(raw?.footerConfig?.contactDetails || {}),
            },
            bottomLinks: Array.isArray(raw?.footerConfig?.bottomLinks)
                ? raw.footerConfig.bottomLinks
                : exports.defaultSettings.footerConfig.bottomLinks,
        },
        legalPages: {
            ...exports.defaultSettings.legalPages,
            ...(raw?.legalPages || {}),
            termsAndConditions: {
                ...exports.defaultSettings.legalPages.termsAndConditions,
                ...(raw?.legalPages?.termsAndConditions || {}),
            },
            privacyPolicy: {
                ...exports.defaultSettings.legalPages.privacyPolicy,
                ...(raw?.legalPages?.privacyPolicy || {}),
            },
        },
        carouselConfig: {
            ...exports.defaultSettings.carouselConfig,
            ...(raw?.carouselConfig || {}),
        },
        faqSection: {
            ...exports.defaultSettings.faqSection,
            ...(raw?.faqSection || {}),
        },
        images: {
            ...exports.defaultSettings.images,
            ...(raw?.images || {}),
            heroCarousel: Array.isArray(raw?.images?.heroCarousel)
                ? raw.images.heroCarousel
                : exports.defaultSettings.images.heroCarousel,
        },
    };
}
class SettingsService {
    async getSettings() {
        return getBaseSettings();
    }
    async updateSettings(newSettings) {
        const current = getBaseSettings();
        const merged = {
            ...current,
            ...newSettings,
            navbarMenu: {
                ...current.navbarMenu,
                ...(newSettings.navbarMenu || {}),
                servicesDropdown: {
                    ...current.navbarMenu.servicesDropdown,
                    ...(newSettings.navbarMenu?.servicesDropdown || {}),
                    items: Array.isArray(newSettings.navbarMenu?.servicesDropdown?.items)
                        ? newSettings.navbarMenu.servicesDropdown.items
                        : current.navbarMenu.servicesDropdown.items,
                },
            },
            footerConfig: {
                ...current.footerConfig,
                ...(newSettings.footerConfig || {}),
                socials: Array.isArray(newSettings.footerConfig?.socials)
                    ? newSettings.footerConfig.socials
                    : current.footerConfig.socials,
                servicesColumn: {
                    ...current.footerConfig.servicesColumn,
                    ...(newSettings.footerConfig?.servicesColumn || {}),
                    links: Array.isArray(newSettings.footerConfig?.servicesColumn?.links)
                        ? newSettings.footerConfig.servicesColumn.links
                        : current.footerConfig.servicesColumn.links,
                },
                quickLinksColumn: {
                    ...current.footerConfig.quickLinksColumn,
                    ...(newSettings.footerConfig?.quickLinksColumn || {}),
                    links: Array.isArray(newSettings.footerConfig?.quickLinksColumn?.links)
                        ? newSettings.footerConfig.quickLinksColumn.links
                        : current.footerConfig.quickLinksColumn.links,
                },
                contactDetails: {
                    ...current.footerConfig.contactDetails,
                    ...(newSettings.footerConfig?.contactDetails || {}),
                },
                bottomLinks: Array.isArray(newSettings.footerConfig?.bottomLinks)
                    ? newSettings.footerConfig.bottomLinks
                    : current.footerConfig.bottomLinks,
            },
            legalPages: {
                ...current.legalPages,
                ...(newSettings.legalPages || {}),
                termsAndConditions: {
                    ...current.legalPages.termsAndConditions,
                    ...(newSettings.legalPages?.termsAndConditions || {}),
                },
                privacyPolicy: {
                    ...current.legalPages.privacyPolicy,
                    ...(newSettings.legalPages?.privacyPolicy || {}),
                },
            },
            carouselConfig: {
                ...current.carouselConfig,
                ...(newSettings.carouselConfig || {}),
            },
            faqSection: {
                ...current.faqSection,
                ...(newSettings.faqSection || {}),
            },
            images: {
                ...current.images,
                ...(newSettings.images || {}),
                heroCarousel: Array.isArray(newSettings.images?.heroCarousel)
                    ? newSettings.images.heroCarousel
                    : current.images.heroCarousel,
            },
        };
        (0, fileStore_1.saveData)(SETTINGS_FILE, merged);
        return merged;
    }
}
exports.SettingsService = SettingsService;
exports.settingsService = new SettingsService();
//# sourceMappingURL=settings.service.js.map