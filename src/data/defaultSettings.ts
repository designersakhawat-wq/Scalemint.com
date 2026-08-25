export interface ImageConfig {
  url: string;
  width?: string;
  height?: string;
  fit?: "cover" | "contain" | "fill" | "none" | string;
  position?: "center" | "top" | "bottom" | string;
  radius?: "none" | "rounded-lg" | "rounded-2xl" | "rounded-3xl" | "rounded-full" | string;
}

export interface NavServiceItem {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  icon?: string;
}

export interface FooterLinkItem {
  id: string;
  label: string;
  link: string;
}

export interface FooterSocialItem {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  content: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  logoConfig?: ImageConfig;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  heroHeadline: string;
  heroSubtitle: string;
  footerCopyright: string;
  calendlyUrl?: string;
  meetingButtonText?: string;
  showMeetingButton?: boolean;

  navbarMenu: {
    servicesDropdown: {
      navLabel: string;
      sidebarLabel: string;
      sidebarDescription: string;
      items: NavServiceItem[];
    };
    bookMeeting?: {
      enabled: boolean;
      buttonText: string;
      calendlyUrl: string;
    };
  };

  footerConfig: {
    tagline: string;
    description: string;
    copyright: string;
    socials: FooterSocialItem[];
    servicesColumn: {
      title: string;
      links: FooterLinkItem[];
    };
    quickLinksColumn: {
      title: string;
      links: FooterLinkItem[];
    };
    contactDetails: {
      title: string;
      email: string;
      phone: string;
      address: string;
    };
    bottomLinks: FooterLinkItem[];
  };

  legalPages: {
    termsAndConditions: LegalPageContent;
    privacyPolicy: LegalPageContent;
  };

  carouselConfig: {
    cardWidth: string;
    cardHeight: string;
    aspectRatio: string;
    radius: string;
  };

  faqSection: {
    image: string;
    headline: string;
    subtitle: string;
  };

  images: {
    heroCarousel: Array<{
      id: string;
      title: string;
      url: string;
      width?: string;
      height?: string;
      position?: "center" | "top" | "bottom" | string;
    }>;
    industryCards: {
      startup: ImageConfig;
      smallBusiness: ImageConfig;
      ecommerce: ImageConfig;
      localBusiness: ImageConfig;
      corporate: ImageConfig;
    };
    clientLogos: Array<{
      id: string;
      name: string;
      url: string;
      width?: string;
      height?: string;
    }>;
  };
}

export const defaultSettings: SiteSettings = {
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
  calendlyUrl: "https://calendly.com",
  meetingButtonText: "Book a Meeting",
  showMeetingButton: true,

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
    bookMeeting: {
      enabled: true,
      buttonText: "Book a Meeting",
      calendlyUrl: "https://calendly.com",
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
