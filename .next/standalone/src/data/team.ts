export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  expertise: string[];
  tools: string[];
  experience: {
    title: string;
    company: string;
    period: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  fiverr: {
    status: string;
    link: string;
  };
  socials: {
    facebook: string;
    linkedin: string;
  };
}

export const teamData: TeamMember[] = [
  {
    slug: "md-sakhawat-hossain",
    name: "Md Sakhawat Hossain",
    role: "Senior Graphics Designer",
    img: "/images/team1.jpg",
    bio: "Md Sakhawat Hossain is a visionary Senior Graphics Designer with over a decade of experience in crafting compelling visual identities. He specializes in creating modern, minimalist, and highly effective design assets that elevate brands and drive engagement. His keen eye for detail and deep understanding of color theory and typography make his work stand out in the crowded digital space.",
    expertise: ["Brand Identity Design", "UI/UX Prototyping", "Vector Illustration", "Print Media", "Advanced Typography"],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "CorelDRAW"],
    experience: [
      { title: "Senior Graphics Designer", company: "Scaleminte", period: "2023 - Present" },
      { title: "Lead UI/UX Designer", company: "Creative Pixel Agency", period: "2020 - 2023" }
    ],
    education: [
      { degree: "B.Sc in Graphic Design & Multimedia", institution: "National University of Design", year: "2019" }
    ],
    fiverr: {
      status: "Top Rated Seller",
      link: "#",
    },
    socials: {
      facebook: "#",
      linkedin: "#",
    }
  },
  {
    slug: "shahariar-sovon",
    name: "Shahariar Sovon",
    role: "Digital Marketer Specialist",
    img: "/images/team2.jpg",
    bio: "Shahariar Sovon is an expert Digital Marketer Specialist known for his data-driven approach to scaling businesses online. From comprehensive SEO strategies to high-converting ad campaigns across Google and Meta platforms, Shahariar has a proven track record of maximizing ROI. He stays ahead of industry trends to ensure his clients always have the competitive edge.",
    expertise: ["SEO & SEM", "Social Media Marketing", "PPC Campaigns", "Conversion Rate Optimization", "Email Marketing Strategy"],
    tools: ["Google Analytics", "Facebook Ads Manager", "SEMrush", "Mailchimp"],
    experience: [
      { title: "Digital Marketer Specialist", company: "Scaleminte", period: "2022 - Present" },
      { title: "SEO Strategist", company: "Growth Hub", period: "2019 - 2022" }
    ],
    education: [
      { degree: "BBA in Marketing", institution: "City Business School", year: "2018" }
    ],
    fiverr: {
      status: "Level 2 Seller",
      link: "#",
    },
    socials: {
      facebook: "#",
      linkedin: "#",
    }
  },
  {
    slug: "billal-hossain-rakib",
    name: "Billal Hossain Rakib",
    role: "Video Editor & AI Content Expert",
    img: "/images/team3.jpg",
    bio: "Billal Hossain Rakib brings stories to life through dynamic video editing and cutting-edge AI content generation. He seamlessly blends traditional editing techniques with modern AI tools to produce high-retention content for YouTube, TikTok, and Instagram Reels. His work helps brands build massive organic audiences through engaging visual storytelling.",
    expertise: ["Short-form Video Editing", "AI Prompt Engineering", "Motion Graphics", "Audio Mixing", "Content Strategy"],
    tools: ["Adobe Premiere Pro", "After Effects", "Midjourney", "ChatGPT"],
    experience: [
      { title: "Video Editor & AI Content Expert", company: "Scaleminte", period: "2023 - Present" },
      { title: "Freelance Video Editor", company: "Upwork", period: "2021 - 2023" }
    ],
    education: [
      { degree: "Diploma in Film & Media Studies", institution: "Institute of Media Arts", year: "2021" }
    ],
    fiverr: {
      status: "Top Rated Seller",
      link: "#",
    },
    socials: {
      facebook: "#",
      linkedin: "#",
    }
  },
  {
    slug: "shohan-rahman",
    name: "Shohan Rahman",
    role: "Web Developer",
    img: "/images/team4.jpg",
    bio: "Shohan Rahman is a passionate Web Developer who specializes in building fast, responsive, and highly secure web applications. Proficient in modern JavaScript frameworks like React and Next.js, Shohan bridges the gap between complex backend architecture and beautiful frontend user experiences. He is dedicated to writing clean, maintainable code that scales with the business.",
    expertise: ["Frontend Development", "Backend API Integration", "Responsive UI", "Performance Optimization", "Web Security"],
    tools: ["React", "Next.js", "Node.js", "Tailwind CSS"],
    experience: [
      { title: "Web Developer", company: "Scaleminte", period: "2023 - Present" },
      { title: "Junior Frontend Developer", company: "Tech Solutions IT", period: "2021 - 2023" }
    ],
    education: [
      { degree: "B.Sc in Computer Science", institution: "Global Tech University", year: "2021" }
    ],
    fiverr: {
      status: "Level 2 Seller",
      link: "#",
    },
    socials: {
      facebook: "#",
      linkedin: "#",
    }
  }
];
