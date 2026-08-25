
const fs = require("fs");
const path = "./src/app/services/[slug]/page.tsx";
let content = fs.readFileSync(path, "utf-8");

const additions = {
  "google-ads": {
    benefitsImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    faqs: [
      { title: "Data-Driven Bidding Strategies", content: "We utilize advanced machine learning algorithms combined with manual oversight to ensure your bids are always optimized for the highest return on ad spend." },
      { title: "Hyper-Targeted Audience Segmentation", content: "We don\"t just guess. We use deep data analysis to segment your audience and serve highly relevant ads that convert." },
      { title: "Continuous A/B Testing", content: "We are constantly testing ad copy, landing pages, and offers to incrementally improve your campaign performance over time." },
      { title: "Transparent ROI Reporting", content: "Get clear, jargon-free reports that show exactly how much revenue your campaigns are generating." }
    ]
  },
  "meta-ads": {
    benefitsImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    faqs: [
      { title: "Scroll-Stopping Creative Strategy", content: "Our design team creates visually stunning image and video ads tailored specifically for Meta platforms to capture attention instantly." },
      { title: "Advanced Pixel & CAPI Tracking", content: "We implement robust tracking solutions to ensure every conversion is accurately attributed to your campaigns." },
      { title: "Dynamic Retargeting Funnels", content: "We build multi-step retargeting sequences that nurture prospects and bring them back to complete their purchase." },
      { title: "Scalable Budget Management", content: "We safely scale winning ad sets while pausing underperforming ones to maximize your overall budget efficiency." }
    ]
  },
  "graphics-design": {
    benefitsImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    faqs: [
      { title: "Human-Centered Design Approach", content: "We design with your end-user in mind, ensuring every visual element serves a clear psychological and functional purpose." },
      { title: "Brand-Aligned Visuals", content: "We ensure all graphics perfectly match your brand voice, color palette, and overall aesthetic for maximum consistency." },
      { title: "Conversion-Focused UI/UX", content: "Our designs are not just pretty; they are strategically structured to guide users towards your desired call-to-action." },
      { title: "High-Resolution Asset Delivery", content: "You receive all source files and exports in the exact dimensions and formats needed for print and digital use." }
    ]
  },
  "video-editing": {
    benefitsImage: "https://images.unsplash.com/photo-1574717024453-354056aaddfa?auto=format&fit=crop&w=800&q=80",
    faqs: [
      { title: "High-Retention Editing Techniques", content: "We use fast-paced cuts, strategic zooming, and dynamic b-roll to keep viewer attention from the first second to the last." },
      { title: "Cinematic Color Grading", content: "We color correct and grade your footage to give it a professional, high-end look that matches your brand." },
      { title: "Platform-Specific Formatting", content: "Whether it\"s 9:16 for TikTok or 16:9 for YouTube, we optimize the edit specifically for the platform it will live on." },
      { title: "Dynamic Motion Graphics", content: "We add engaging text animations, lower thirds, and visual effects to elevate the production value of your content." }
    ]
  },
  "website-developing": {
    benefitsImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    faqs: [
      { title: "Lightning-Fast Load Speeds", content: "We build lightweight, optimized websites that score 90+ on Google PageSpeed Insights, ensuring zero drop-off from slow loading." },
      { title: "Mobile-First Responsive Design", content: "Over 60% of web traffic is mobile. We design and develop strictly mobile-first so your site looks perfect on any device." },
      { title: "SEO-Optimized Architecture", content: "We structure the code with semantic HTML, proper heading tags, and optimized metadata so you rank higher on Google natively." },
      { title: "Secure & Scalable Frameworks", content: "Built on modern stacks like React and Next.js, your website will be highly secure and ready to scale with your business." }
    ]
  },
  "social-media-management": {
    benefitsImage: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=800&q=80",
    faqs: [
      { title: "Strategic Content Calendars", content: "We plan a month in advance, ensuring a healthy mix of educational, promotional, and engaging content tailored to your goals." },
      { title: "Authentic Community Engagement", content: "We don\"t use bots. We manually interact with your followers and niche to build genuine relationships and brand loyalty." },
      { title: "Trending Audio & Format Utilization", content: "We stay on top of the latest trends, sounds, and formats on Instagram and TikTok to give you the highest chance of virality." },
      { title: "Data-Backed Growth Strategies", content: "We analyze monthly insights to double down on what works and pivot away from what doesn\"t, ensuring continuous growth." }
    ]
  },
  "youtube-video-seo": {
    benefitsImage: "https://images.unsplash.com/photo-1611162618828-bc409f073cbf?auto=format&fit=crop&w=800&q=80",
    faqs: [
      { title: "High-Volume Keyword Targeting", content: "We identify exactly what your audience is searching for and optimize your videos to appear at the top of those results." },
      { title: "CTR-Optimized Thumbnails", content: "A good ranking means nothing without clicks. We design highly clickable thumbnails that stand out in the crowded YouTube feed." },
      { title: "Algorithm-Friendly Metadata", content: "We write detailed, keyword-rich descriptions and utilize the right tags to feed the YouTube algorithm exactly what it needs." },
      { title: "Audience Retention Analysis", content: "We analyze viewer drop-off points and provide actionable feedback for your future videos to increase average view duration." }
    ]
  }
};

for (const [key, data] of Object.entries(additions)) {
  const searchStr = `  "${key}": {`;
  const insertStr = `
    benefitsImage: "${data.benefitsImage}",
    faqs: ${JSON.stringify(data.faqs, null, 6)},`;
  
  // Insert right after the key declaration
  content = content.replace(searchStr, searchStr + insertStr);
}

fs.writeFileSync(path, content);
console.log("Updated serviceData!");

