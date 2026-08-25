import bcrypt from "bcryptjs";

export const initialServices = [
  {
    id: "srv_1",
    slug: "google-ads",
    title: "Google Ads Management",
    subtitle: "Maximize your search visibility",
    heroHeadline: "Google Ads Management Built for Maximum ROI & High Conversions",
    description: "We combine data-driven strategies, keyword optimization, and compelling ad copy to build Google Ads campaigns that capture high-intent leads and scale your revenue.",
    img: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&q=80",
    whyTitle: "Why partner with us for Google Ads?",
    whyText: "Stop wasting ad spend on campaigns that don't convert. Our certified Google Ads specialists focus entirely on metrics that matter: lower acquisition costs, higher click-through rates, and scalable business growth.",
    benefitsImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    order: 1,
    isActive: true,
    features: [
      { title: "Deep Keyword Research", desc: "Identifying high-intent search terms your customers actually use." },
      { title: "Conversion Tracking Setup", desc: "Pixel-perfect tracking so you know exactly where every dollar goes." },
      { title: "A/B Testing & Optimization", desc: "Continuous iteration on ad copy, extensions, and bidding strategies." },
      { title: "Retargeting Campaigns", desc: "Bringing back lost visitors and turning them into loyal customers." }
    ],
    process: [
      { step: "STEP 01", title: "Business & Goal Analysis", desc: "We analyze your business model, target CPA, and identify the most profitable products or services to promote.", color: "bg-yellow-500/10 text-yellow-400" },
      { step: "STEP 02", title: "Keyword & Competitor Research", desc: "We discover high-intent keywords your customers are actively searching for and analyze competitor strategies.", color: "bg-orange-500/10 text-orange-400" },
      { step: "STEP 03", title: "Campaign & Copywriting", desc: "Our experts structure the campaigns and write compelling ad copy designed to maximize click-through rates.", color: "bg-green-500/10 text-green-400" },
      { step: "STEP 04", title: "Tracking & Pixel Setup", desc: "We implement accurate conversion tracking so every dollar spent is measured against actual revenue generated.", color: "bg-purple-500/10 text-purple-400" },
      { step: "STEP 05", title: "Launch & Optimization", desc: "We launch the ads and continuously optimize bids, keywords, and audiences to scale your ROI.", color: "bg-rose-500/10 text-rose-400" }
    ],
    faqs: [
      { title: "Data-Driven Bidding Strategies", content: "We utilize advanced machine learning algorithms combined with manual oversight to ensure your bids are always optimized for the highest return on ad spend." },
      { title: "Hyper-Targeted Audience Segmentation", content: "We don't just guess. We use deep data analysis to segment your audience and serve highly relevant ads that convert." },
      { title: "Continuous A/B Testing", content: "We are constantly testing ad copy, landing pages, and offers to incrementally improve your campaign performance over time." },
      { title: "Transparent ROI Reporting", content: "Get clear, jargon-free reports that show exactly how much revenue your campaigns are generating." }
    ]
  },
  {
    id: "srv_2",
    slug: "meta-ads",
    title: "Meta Ads Management",
    subtitle: "Targeted social media campaigns",
    heroHeadline: "Meta Ads Strategies Designed for Brand Growth & Rapid Scaling",
    description: "Reach your ideal audience on Facebook and Instagram. We design creative, scroll-stopping Meta Ad campaigns tailored for aggressive scaling and brand awareness.",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    whyTitle: "Why choose our Meta Ads management?",
    whyText: "The Meta algorithm changes constantly, but human psychology doesn't. We blend eye-catching creative design with advanced machine-learning targeting to deliver ads that people actually want to click.",
    benefitsImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    order: 2,
    isActive: true,
    features: [
      { title: "Advanced Audience Targeting", desc: "Lookalike audiences, custom retargeting, and interest-based segmentation." },
      { title: "Creative Ad Design", desc: "Scroll-stopping visuals and video ads crafted by our design team." },
      { title: "Advanced Pixel & API Setup", desc: "Accurate tracking using the Meta Conversions API for better optimization." },
      { title: "Data-Driven Scaling", desc: "Safely scaling winning campaigns without breaking your CPA goals." }
    ],
    process: [
      { step: "STEP 01", title: "Audience & Funnel Mapping", desc: "We map out your customer journey and build distinct audiences for cold targeting and retargeting.", color: "bg-yellow-500/10 text-yellow-400" },
      { step: "STEP 02", title: "Creative Strategy & Design", desc: "Our creative team designs scroll-stopping visuals, videos, and writes engaging copy tailored for Meta platforms.", color: "bg-orange-500/10 text-orange-400" },
      { step: "STEP 03", title: "Campaign Setup & Tracking", desc: "We build the campaigns in Ads Manager and ensure the Meta Pixel and Conversions API are tracking flawlessly.", color: "bg-green-500/10 text-green-400" },
      { step: "STEP 04", title: "A/B Testing & Launch", desc: "We launch multiple creative and audience variations to let the algorithm find the most profitable combinations.", color: "bg-purple-500/10 text-purple-400" },
      { step: "STEP 05", title: "Scaling Winners", desc: "Once we identify winning ads, we strategically increase budget to scale revenue without breaking profitability.", color: "bg-rose-500/10 text-rose-400" }
    ],
    faqs: [
      { title: "Scroll-Stopping Creative Strategy", content: "Our design team creates visually stunning image and video ads tailored specifically for Meta platforms to capture attention instantly." },
      { title: "Advanced Pixel & CAPI Tracking", content: "We implement robust tracking solutions to ensure every conversion is accurately attributed to your campaigns." },
      { title: "Dynamic Retargeting Funnels", content: "We build multi-step retargeting sequences that nurture prospects and bring them back to complete their purchase." },
      { title: "Scalable Budget Management", content: "We safely scale winning ad sets while pausing underperforming ones to maximize your overall budget efficiency." }
    ]
  },
  {
    id: "srv_3",
    slug: "graphics-design",
    title: "Graphics Design",
    subtitle: "Crafting timeless visual identities",
    heroHeadline: "Visual Identity & Graphic Design That Captures Attention",
    description: "Elevate your brand with stunning visuals. From striking logos to comprehensive marketing materials, our designs communicate your message effectively and leave a lasting impression.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    whyTitle: "Why invest in professional Graphic Design?",
    whyText: "First impressions are 94% design-related. We don't just make things look pretty; we design strategic visual assets that build trust, convey authority, and align perfectly with your brand voice.",
    benefitsImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    order: 3,
    isActive: true,
    features: [
      { title: "Brand Identity Design", desc: "Logos, color palettes, typography, and complete brand guidelines." },
      { title: "Social Media Graphics", desc: "Engaging posts, covers, and templates for consistent online presence." },
      { title: "Print & Packaging", desc: "Business cards, brochures, and beautiful packaging design." },
      { title: "UI/UX Prototyping", desc: "Wireframing and high-fidelity mockups for digital products." }
    ],
    process: [
      { step: "STEP 01", title: "Discovery & Moodboarding", desc: "We start by understanding your brand vision, target audience, and gather inspiration to create a moodboard.", color: "bg-yellow-500/10 text-yellow-400" },
      { step: "STEP 02", title: "Concept Development", desc: "Our designers sketch and develop multiple initial design concepts based on the approved creative direction.", color: "bg-orange-500/10 text-orange-400" },
      { step: "STEP 03", title: "Feedback & Revisions", desc: "We present the concepts to you and refine the chosen design based on your constructive feedback.", color: "bg-green-500/10 text-green-400" },
      { step: "STEP 04", title: "Final Polish", desc: "We perfect the details, typography, and colors to ensure the design looks flawless across all mediums.", color: "bg-purple-500/10 text-purple-400" },
      { step: "STEP 05", title: "Delivery & Guidelines", desc: "We deliver all necessary high-resolution files and provide a brand guideline document for future consistency.", color: "bg-rose-500/10 text-rose-400" }
    ],
    faqs: [
      { title: "Human-Centered Design Approach", content: "We design with your end-user in mind, ensuring every visual element serves a clear psychological and functional purpose." },
      { title: "Brand-Aligned Visuals", content: "We ensure all graphics perfectly match your brand voice, color palette, and overall aesthetic for maximum consistency." },
      { title: "Conversion-Focused UI/UX", content: "Our designs are not just pretty; they are strategically structured to guide users towards your desired call-to-action." },
      { title: "High-Resolution Asset Delivery", content: "You receive all source files and exports in the exact dimensions and formats needed for print and digital use." }
    ]
  },
  {
    id: "srv_4",
    slug: "video-editing",
    title: "Video Editing",
    subtitle: "Compelling visual storytelling",
    heroHeadline: "Compelling Video Editing That Drives Engagement & Views",
    description: "Tell your story with professional video editing. We transform raw footage into highly engaging content optimized for retention across YouTube, TikTok, and Instagram.",
    img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=80",
    whyTitle: "Why work with our Video Editing team?",
    whyText: "In the era of short attention spans, pacing and storytelling are everything. We use dynamic cuts, engaging motion graphics, and premium sound design to keep your viewers hooked from the first second.",
    benefitsImage: "https://images.unsplash.com/photo-1574717024453-354056aaddfa?auto=format&fit=crop&w=800&q=80",
    order: 4,
    isActive: true,
    features: [
      { title: "Short-Form Reels & TikToks", desc: "Fast-paced, highly engaging vertical videos with captions." },
      { title: "YouTube Long-Form", desc: "Documentary-style edits, talking heads, and vlog post-production." },
      { title: "Motion Graphics & VFX", desc: "Custom animations and visual effects to elevate production value." },
      { title: "Color Grading & Sound", desc: "Cinematic color correction and professional audio mixing." }
    ],
    process: [
      { step: "STEP 01", title: "Footage Review & Storyboarding", desc: "We review your raw footage, understand the narrative goal, and create a loose storyboard for the edit.", color: "bg-yellow-500/10 text-yellow-400" },
      { step: "STEP 02", title: "Rough Cut & Assembly", desc: "We piece together the best takes to create a rough assembly that establishes the pacing and core story.", color: "bg-orange-500/10 text-orange-400" },
      { step: "STEP 03", title: "Motion Graphics & VFX", desc: "We add engaging text animations, b-roll, transitions, and visual effects to keep viewer retention high.", color: "bg-green-500/10 text-green-400" },
      { step: "STEP 04", title: "Color Grading & Sound", desc: "We perform cinematic color correction and mix the audio with premium sound effects and background music.", color: "bg-purple-500/10 text-purple-400" },
      { step: "STEP 05", title: "Final Export", desc: "We implement your final revisions and export the video in the optimal formats for your target platforms.", color: "bg-rose-500/10 text-rose-400" }
    ],
    faqs: [
      { title: "High-Retention Editing Techniques", content: "We use fast-paced cuts, strategic zooming, and dynamic b-roll to keep viewer attention from the first second to the last." },
      { title: "Cinematic Color Grading", content: "We color correct and grade your footage to give it a professional, high-end look that matches your brand." },
      { title: "Platform-Specific Formatting", content: "Whether it's 9:16 for TikTok or 16:9 for YouTube, we optimize the edit specifically for the platform it will live on." },
      { title: "Dynamic Motion Graphics", content: "We add engaging text animations, lower thirds, and visual effects to elevate the production value of your content." }
    ]
  },
  {
    id: "srv_5",
    slug: "website-developing",
    title: "Website Developing",
    subtitle: "Functional and modern web solutions",
    heroHeadline: "Responsive Web Development Services That Convert",
    description: "We combine modern frameworks, lightning-fast page speed, and SEO-friendly code to build websites that rank well on Google, load instantly, and turn visitors into buyers.",
    img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80",
    whyTitle: "Why trust our Web Development process?",
    whyText: "Your website is your 24/7 salesperson. We don't use bloated templates. We build custom, scalable architectures (using React, Next.js, and modern CMS) focused entirely on user experience and conversion rate optimization.",
    benefitsImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    order: 5,
    isActive: true,
    features: [
      { title: "Custom UI/UX Design", desc: "Bespoke interfaces designed from scratch to match your brand." },
      { title: "Full-Stack Development", desc: "Robust frontend and backend solutions tailored to your needs." },
      { title: "Speed & SEO Optimization", desc: "Core Web Vitals optimized for 90+ scores on Google PageSpeed." },
      { title: "E-Commerce Solutions", desc: "Secure, scalable online stores with seamless payment gateways." }
    ],
    process: [
      { step: "STEP 01", title: "Requirements & Wireframing", desc: "We map out the site architecture and create wireframes to establish the user flow and layout structure.", color: "bg-yellow-500/10 text-yellow-400" },
      { step: "STEP 02", title: "UI/UX Design Prototyping", desc: "Our designers craft high-fidelity, interactive prototypes showing exactly how the final website will look and feel.", color: "bg-orange-500/10 text-orange-400" },
      { step: "STEP 03", title: "Frontend & Backend Dev", desc: "Our developers write clean, modular code to bring the designs to life, integrating necessary APIs and CMS.", color: "bg-green-500/10 text-green-400" },
      { step: "STEP 04", title: "QA & Testing", desc: "We rigorously test the website across all devices and browsers for responsiveness, speed, and bugs.", color: "bg-purple-500/10 text-purple-400" },
      { step: "STEP 05", title: "Launch & Maintenance", desc: "We deploy the website to your live server, set up analytics, and provide ongoing support and maintenance.", color: "bg-rose-500/10 text-rose-400" }
    ],
    faqs: [
      { title: "Lightning-Fast Load Speeds", content: "We build lightweight, optimized websites that score 90+ on Google PageSpeed Insights, ensuring zero drop-off from slow loading." },
      { title: "Mobile-First Responsive Design", content: "Over 60% of web traffic is mobile. We design and develop strictly mobile-first so your site looks perfect on any device." },
      { title: "SEO-Optimized Architecture", content: "We structure the code with semantic HTML, proper heading tags, and optimized metadata so you rank higher on Google natively." },
      { title: "Secure & Scalable Frameworks", content: "Built on modern stacks like React and Next.js, your website will be highly secure and ready to scale with your business." }
    ]
  },
  {
    id: "srv_6",
    slug: "social-media-management",
    title: "Social Media Management",
    subtitle: "Build and engage your audience",
    heroHeadline: "Strategic Social Media Management That Builds Community",
    description: "Grow your online community and engage with your audience authentically. We handle everything from content strategy to daily posting and community management.",
    img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80",
    whyTitle: "Why outsource your Social Media to us?",
    whyText: "Consistency is the hardest part of social media. We take it completely off your plate by developing a tailored content calendar, designing the assets, writing the copy, and engaging with your followers.",
    benefitsImage: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=800&q=80",
    order: 6,
    isActive: true,
    features: [
      { title: "Custom Content Strategy", desc: "Tailored monthly calendars aligned with your promotional goals." },
      { title: "Copywriting & Hashtags", desc: "Engaging captions and researched hashtags for maximum organic reach." },
      { title: "Community Engagement", desc: "Replying to comments, messages, and interacting with your niche." },
      { title: "Analytics & Reporting", desc: "Monthly breakdown of follower growth, reach, and engagement metrics." }
    ],
    process: [
      { step: "STEP 01", title: "Brand Audit & Strategy", desc: "We audit your current profiles, analyze competitors, and build a custom social media strategy tailored to your goals.", color: "bg-yellow-500/10 text-yellow-400" },
      { step: "STEP 02", title: "Content Calendar Creation", desc: "We plan out a monthly content calendar outlining exactly what, when, and where we will post.", color: "bg-orange-500/10 text-orange-400" },
      { step: "STEP 03", title: "Copywriting & Design", desc: "Our team creates all the necessary graphics, edits videos, and writes engaging captions with optimized hashtags.", color: "bg-green-500/10 text-green-400" },
      { step: "STEP 04", title: "Scheduling & Publishing", desc: "Once approved, we handle the automated scheduling and manual publishing across all your social channels.", color: "bg-purple-500/10 text-purple-400" },
      { step: "STEP 05", title: "Analytics & Community", desc: "We actively engage with your followers and provide monthly analytics reports to track growth and reach.", color: "bg-rose-500/10 text-rose-400" }
    ],
    faqs: [
      { title: "Strategic Content Calendars", content: "We plan a month in advance, ensuring a healthy mix of educational, promotional, and engaging content tailored to your goals." },
      { title: "Authentic Community Engagement", content: "We don't use bots. We manually interact with your followers and niche to build genuine relationships and brand loyalty." },
      { title: "Trending Audio & Format Utilization", content: "We stay on top of the latest trends, sounds, and formats on Instagram and TikTok to give you the highest chance of virality." },
      { title: "Data-Backed Growth Strategies", content: "We analyze monthly insights to double down on what works and pivot away from what doesn't, ensuring continuous growth." }
    ]
  },
  {
    id: "srv_7",
    slug: "youtube-video-seo",
    title: "YouTube Video SEO",
    subtitle: "Rank higher on video search",
    heroHeadline: "YouTube Video SEO That Ranks Higher & Maximizes Views",
    description: "Stop posting videos into the void. We optimize your YouTube channel and videos to rank on the first page of search results and dominate the recommended feed.",
    img: "https://images.unsplash.com/photo-1611162618828-bc409f073cbf?auto=format&fit=crop&w=800&q=80",
    whyTitle: "Why is YouTube SEO critical for growth?",
    whyText: "YouTube is the world's second-largest search engine. By optimizing your metadata, thumbnails, and retention hooks, we ensure your content is discovered by thousands of new viewers actively searching for your niche.",
    benefitsImage: "https://images.unsplash.com/photo-1611162618828-bc409f073cbf?auto=format&fit=crop&w=800&q=80",
    order: 7,
    isActive: true,
    features: [
      { title: "Keyword Optimization", desc: "Finding high-volume, low-competition tags and search phrases." },
      { title: "Click-Worthy Thumbnails", desc: "A/B testing custom thumbnails designed to maximize CTR." },
      { title: "Title & Description Mastery", desc: "Writing compelling titles that balance SEO with human curiosity." },
      { title: "Channel Audit & Strategy", desc: "Comprehensive review of your existing content to identify growth gaps." }
    ],
    process: [
      { step: "STEP 01", title: "Channel Audit", desc: "We review your existing YouTube channel, analyzing past performance, audience retention, and current SEO health.", color: "bg-yellow-500/10 text-yellow-400" },
      { step: "STEP 02", title: "Keyword Research", desc: "We identify high-search-volume, low-competition keywords that your target audience is actively looking for.", color: "bg-orange-500/10 text-orange-400" },
      { step: "STEP 03", title: "Title & Metadata", desc: "We craft highly clickable titles and optimize your video descriptions and tags for the YouTube algorithm.", color: "bg-green-500/10 text-green-400" },
      { step: "STEP 04", title: "Thumbnail Optimization", desc: "Our designers create or revamp custom thumbnails designed specifically to increase your Click-Through Rate (CTR).", color: "bg-purple-500/10 text-purple-400" },
      { step: "STEP 05", title: "Performance Tracking", desc: "We monitor the video's performance post-launch, analyzing metrics like watch time and CTR to inform future strategy.", color: "bg-rose-500/10 text-rose-400" }
    ],
    faqs: [
      { title: "High-Volume Keyword Targeting", content: "We identify exactly what your audience is searching for and optimize your videos to appear at the top of those results." },
      { title: "CTR-Optimized Thumbnails", content: "A good ranking means nothing without clicks. We design highly clickable thumbnails that stand out in the crowded YouTube feed." },
      { title: "Algorithm-Friendly Metadata", content: "We write detailed, keyword-rich descriptions and utilize the right tags to feed the YouTube algorithm exactly what it needs." },
      { title: "Audience Retention Analysis", content: "We analyze viewer drop-off points and provide actionable feedback for your future videos to increase average view duration." }
    ]
  }
];

export const initialBlogs = [
  {
    id: "blog_1",
    slug: "10-graphic-design-trends-to-watch-in-2024",
    title: "10 Graphic Design Trends to Watch in 2024",
    category: "Graphic Design",
    image: "/images/startup.jpg",
    excerpt: "Stay ahead of the curve. Discover the top visual trends that are capturing audience attention and elevating brand identities this year.",
    content: "Graphic design continues to evolve at breakneck speeds. In 2024, minimalist branding blended with 3D elements and bold kinetic typography is taking over the internet.",
    authorName: "Md Sakhawat Hossain",
    isPublished: true,
    publishedAt: new Date("2024-01-12").toISOString(),
    views: 1420
  },
  {
    id: "blog_2",
    slug: "ultimate-guide-to-modern-web-development",
    title: "The Ultimate Guide to Modern Web Development",
    category: "Web Development",
    image: "/images/corporate.jpg",
    excerpt: "From headless CMS to edge computing, learn how modern web development frameworks are ensuring lightning-fast and scalable websites.",
    content: "Modern web applications require high performance, SEO optimization, and reactive components. Next.js and Tailwind CSS allow teams to build world-class digital products with speed.",
    authorName: "Shohan Rahman",
    isPublished: true,
    publishedAt: new Date("2024-02-05").toISOString(),
    views: 2150
  },
  {
    id: "blog_3",
    slug: "why-video-editing-is-crucial-for-social-media-success",
    title: "Why Video Editing is Crucial for Social Media Success",
    category: "Video Editing",
    image: "/images/ecommerce.jpg",
    excerpt: "Short-form video is dominating the internet. Learn how professional video editing can dramatically increase your engagement and retention rates.",
    content: "Retention rate is the #1 metric platforms use to recommend videos. Strategic pacing, engaging visual hooks, and professional sound mixing are essential.",
    authorName: "Billal Hossain Rakib",
    isPublished: true,
    publishedAt: new Date("2024-02-18").toISOString(),
    views: 1890
  },
  {
    id: "blog_4",
    slug: "maximizing-roi-with-targeted-meta-ads",
    title: "Maximizing ROI with Targeted Meta Ads",
    category: "Meta Ads",
    image: "/images/storefront.jpg",
    excerpt: "Stop wasting ad spend. Here is our step-by-step framework for setting up highly profitable Facebook and Instagram ad campaigns.",
    content: "Understanding Meta's Advantage+ campaign architecture and pairing it with diverse creative angles is the key to scaling your ROAS.",
    authorName: "Shahariar Sovon",
    isPublished: true,
    publishedAt: new Date("2024-03-02").toISOString(),
    views: 3100
  },
  {
    id: "blog_5",
    slug: "how-to-lower-your-google-ads-cpc-in-30-days",
    title: "How to Lower Your Google Ads CPC in 30 Days",
    category: "Google Ads",
    image: "/images/startup.jpg",
    excerpt: "Are your search campaigns too expensive? Learn actionable strategies to improve your Quality Score and drive down your Cost Per Click.",
    content: "Improving Quality Score by aligning landing page relevance and search term intent directly lowers your average bid requirements.",
    authorName: "Shahariar Sovon",
    isPublished: true,
    publishedAt: new Date("2024-03-15").toISOString(),
    views: 1650
  },
  {
    id: "blog_6",
    slug: "psychology-behind-high-converting-ui-ux-design",
    title: "The Psychology Behind High-Converting UI/UX Design",
    category: "UI/UX Design",
    image: "/images/storefront.jpg",
    excerpt: "Great design isn't just about looking good—it's about directing user behavior. Uncover the psychological principles that drive conversions.",
    content: "Visual hierarchy, Fitts' Law, and cognitive load management dictate whether a user completes a purchase or bounces from your store.",
    authorName: "Md Sakhawat Hossain",
    isPublished: true,
    publishedAt: new Date("2024-03-28").toISOString(),
    views: 2420
  },
  {
    id: "blog_7",
    slug: "local-vs-global-seo-which-strategy-is-right",
    title: "Local vs. Global SEO: Which Strategy is Right for You?",
    category: "SEO",
    image: "/images/corporate.jpg",
    excerpt: "Whether you run a brick-and-mortar store or an international e-commerce brand, choosing the right SEO strategy is critical for organic growth.",
    content: "Google Business profile optimization, local citations, and geo-targeted schema markup make local businesses dominate their target zip codes.",
    authorName: "Shahariar Sovon",
    isPublished: true,
    publishedAt: new Date("2024-04-10").toISOString(),
    views: 1280
  },
  {
    id: "blog_8",
    slug: "cracking-the-youtube-algorithm-with-video-seo",
    title: "Cracking the YouTube Algorithm with Video SEO",
    category: "YouTube Video SEO",
    image: "/images/ecommerce.jpg",
    excerpt: "Don't let your videos get buried. Learn how to optimize your thumbnails, titles, and tags to rank #1 on the world's second-largest search engine.",
    content: "High CTR thumbnails combined with high 30-second retention spikes signal YouTube to push your content onto browse features and suggested feeds.",
    authorName: "Billal Hossain Rakib",
    isPublished: true,
    publishedAt: new Date("2024-04-22").toISOString(),
    views: 2950
  }
];

export const initialPortfolio = [
  { id: "port_1", title: "EduTech App Rebrand", slug: "edutech-app-rebrand", category: "Graphic Design", image: "/images/startup.jpg", isFeatured: true, order: 1 },
  { id: "port_2", title: "Brand Growth Strategy", slug: "brand-growth-strategy", category: "Social Media Management", image: "/images/storefront.jpg", isFeatured: true, order: 2 },
  { id: "port_3", title: "Aurora & Co. E-commerce", slug: "aurora-co-ecommerce", category: "Web Development", image: "/images/ecommerce.jpg", isFeatured: true, order: 3 },
  { id: "port_4", title: "Nexus Plaza Corporate", slug: "nexus-plaza-corporate", category: "Video Editing", image: "/images/corporate.jpg", isFeatured: true, order: 4 },
  { id: "port_5", title: "Social Media Campaign", slug: "social-media-campaign", category: "Meta Ads", image: "/images/startup.jpg", isFeatured: true, order: 5 },
  { id: "port_6", title: "Local Artisan Reach", slug: "local-artisan-reach", category: "Google Ads", image: "/images/storefront.jpg", isFeatured: false, order: 6 },
  { id: "port_7", title: "Channel Optimization", slug: "channel-optimization", category: "YouTube Video SEO", image: "/images/corporate.jpg", isFeatured: false, order: 7 }
];

export const initialPackages = [
  {
    id: "pkg_1",
    name: "Starter",
    price: "$999",
    description: "Perfect for small businesses looking to establish a digital presence.",
    isPopular: false,
    order: 1,
    isActive: true,
    features: [
      "Brand Identity (Logo & Guidelines)",
      "Basic Website (Up to 5 Pages)",
      "1 Month SEO Setup",
      "Social Media Templates"
    ]
  },
  {
    id: "pkg_2",
    name: "Professional",
    price: "$2,499",
    description: "Comprehensive solutions for growing brands needing a competitive edge.",
    isPopular: true,
    order: 2,
    isActive: true,
    features: [
      "Advanced Brand Identity",
      "E-Commerce or Custom Web App",
      "3 Months SEO & Content Strategy",
      "Google & Meta Ads Setup",
      "Priority Support"
    ]
  },
  {
    id: "pkg_3",
    name: "Enterprise",
    price: "Custom",
    description: "Tailored full-scale digital transformation for large corporations.",
    isPopular: false,
    order: 3,
    isActive: true,
    features: [
      "Full-Scale Rebranding",
      "Complex Web Platform Development",
      "Ongoing Marketing Management",
      "Dedicated Account Manager",
      "24/7 Premium Support"
    ]
  }
];

export const initialTeam = [
  {
    id: "team_1",
    slug: "md-sakhawat-hossain",
    name: "Md Sakhawat Hossain",
    role: "Senior Graphics Designer",
    img: "/images/team1.jpg",
    bio: "Md Sakhawat Hossain is a visionary Senior Graphics Designer with over a decade of experience in crafting compelling visual identities. He specializes in creating modern, minimalist, and highly effective design assets that elevate brands and drive engagement.",
    expertise: ["Brand Identity Design", "UI/UX Prototyping", "Vector Illustration", "Print Media", "Advanced Typography"],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "CorelDRAW"],
    experience: [
      { title: "Senior Graphics Designer", company: "Scaleminte", period: "2023 - Present" },
      { title: "Lead UI/UX Designer", company: "Creative Pixel Agency", period: "2020 - 2023" }
    ],
    education: [
      { degree: "B.Sc in Graphic Design & Multimedia", institution: "National University of Design", year: "2019" }
    ],
    fiverrStatus: "Top Rated Seller",
    fiverrLink: "https://www.fiverr.com",
    facebookUrl: "https://facebook.com",
    linkedinUrl: "https://linkedin.com",
    order: 1,
    isActive: true
  },
  {
    id: "team_2",
    slug: "shahariar-sovon",
    name: "Shahariar Sovon",
    role: "Digital Marketer Specialist",
    img: "/images/team2.jpg",
    bio: "Shahariar Sovon is an expert Digital Marketer Specialist known for his data-driven approach to scaling businesses online. From comprehensive SEO strategies to high-converting ad campaigns across Google and Meta platforms.",
    expertise: ["SEO & SEM", "Social Media Marketing", "PPC Campaigns", "Conversion Rate Optimization", "Email Marketing Strategy"],
    tools: ["Google Analytics", "Facebook Ads Manager", "SEMrush", "Mailchimp"],
    experience: [
      { title: "Digital Marketer Specialist", company: "Scaleminte", period: "2022 - Present" },
      { title: "SEO Strategist", company: "Growth Hub", period: "2019 - 2022" }
    ],
    education: [
      { degree: "BBA in Marketing", institution: "City Business School", year: "2018" }
    ],
    fiverrStatus: "Level 2 Seller",
    fiverrLink: "https://www.fiverr.com",
    facebookUrl: "https://facebook.com",
    linkedinUrl: "https://linkedin.com",
    order: 2,
    isActive: true
  },
  {
    id: "team_3",
    slug: "billal-hossain-rakib",
    name: "Billal Hossain Rakib",
    role: "Video Editor & AI Content Expert",
    img: "/images/team3.jpg",
    bio: "Billal Hossain Rakib brings stories to life through dynamic video editing and cutting-edge AI content generation. He seamlessly blends traditional editing techniques with modern AI tools to produce high-retention content.",
    expertise: ["Short-form Video Editing", "AI Prompt Engineering", "Motion Graphics", "Audio Mixing", "Content Strategy"],
    tools: ["Adobe Premiere Pro", "After Effects", "Midjourney", "ChatGPT"],
    experience: [
      { title: "Video Editor & AI Content Expert", company: "Scaleminte", period: "2023 - Present" },
      { title: "Freelance Video Editor", company: "Upwork", period: "2021 - 2023" }
    ],
    education: [
      { degree: "Diploma in Film & Media Studies", institution: "Institute of Media Arts", year: "2021" }
    ],
    fiverrStatus: "Top Rated Seller",
    fiverrLink: "https://www.fiverr.com",
    facebookUrl: "https://facebook.com",
    linkedinUrl: "https://linkedin.com",
    order: 3,
    isActive: true
  },
  {
    id: "team_4",
    slug: "shohan-rahman",
    name: "Shohan Rahman",
    role: "Web Developer",
    img: "/images/team4.jpg",
    bio: "Shohan Rahman is a passionate Web Developer who specializes in building fast, responsive, and highly secure web applications. Proficient in modern JavaScript frameworks like React and Next.js.",
    expertise: ["Frontend Development", "Backend API Integration", "Responsive UI", "Performance Optimization", "Web Security"],
    tools: ["React", "Next.js", "Node.js", "Tailwind CSS"],
    experience: [
      { title: "Web Developer", company: "Scaleminte", period: "2023 - Present" },
      { title: "Junior Frontend Developer", company: "Tech Solutions IT", period: "2021 - 2023" }
    ],
    education: [
      { degree: "B.Sc in Computer Science", institution: "Global Tech University", year: "2021" }
    ],
    fiverrStatus: "Level 2 Seller",
    fiverrLink: "https://www.fiverr.com",
    facebookUrl: "https://facebook.com",
    linkedinUrl: "https://linkedin.com",
    order: 4,
    isActive: true
  }
];

export const initialFaqs = [
  {
    id: "faq_1",
    question: "Do You Only Work With Car & Auto Repair Shops?",
    answer: "No, while we have experience in that niche, we work with a wide variety of industries including e-commerce, corporate, startups, and local businesses.",
    category: "general",
    order: 1,
    isActive: true
  },
  {
    id: "faq_2",
    question: "Do You Work With Shops Across Europe?",
    answer: "Yes, we are a global agency. We work with clients from North America, Europe, Asia, and beyond.",
    category: "general",
    order: 2,
    isActive: true
  },
  {
    id: "faq_3",
    question: "How Soon Will I See Results?",
    answer: "Depending on the service, you can see initial results within the first month. SEO and organic growth typically take 3-6 months for significant impact.",
    category: "general",
    order: 3,
    isActive: true
  },
  {
    id: "faq_4",
    question: "Which Package Is Right For Me?",
    answer: "It depends on your goals and current business stage. We recommend booking a consultation with us so we can tailor a package to your specific needs.",
    category: "general",
    order: 4,
    isActive: true
  },
  {
    id: "faq_5",
    question: "Do You Handle Everything For Me?",
    answer: "Yes! We offer end-to-end digital marketing and design solutions, so you can focus on running your business while we handle the creative and technical work.",
    category: "general",
    order: 5,
    isActive: true
  }
];

export const initialContacts = [
  {
    id: "cnt_1",
    firstName: "Alexander",
    lastName: "Wright",
    email: "alex@wrightenterprises.com",
    message: "Looking for an end-to-end rebranding package and custom e-commerce web application.",
    status: "UNREAD",
    notes: "Lead from organic search.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "cnt_2",
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah.j@lumina.io",
    message: "We need ongoing Meta Ads and Google Ads management with a monthly ad spend around $15,000.",
    status: "IN_PROGRESS",
    notes: "Scheduled discovery call for Thursday.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialUsers = [
  {
    id: "usr_admin",
    name: "Scaleminte Admin",
    email: "admin@scaleminte.com",
    passwordHash: bcrypt.hashSync("Admin@123456", 10),
    role: "ADMIN",
    isActive: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "usr_client",
    name: "Demo Client",
    email: "user@scaleminte.com",
    passwordHash: bcrypt.hashSync("User@123456", 10),
    role: "USER",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
