export const site = {
  name: "Raihan Farhani",
  initials: "RF",
  role: "Full-Stack Developer & UI Engineer",
  tagline: "Crafting fast, accessible interfaces with obsessive attention to detail.",
  email: "m.raihan.farhani@gmail.com",
  location: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  availability: "Available for freelance / full-time",
  currentFocus: "Building a SaaS analytics dashboard",
} as const;

export type Category = "Web App" | "Mobile" | "UI/UX" | "Open Source";

export const categories: ("All" | Category)[] = [
  "All",
  "Web App",
  "Mobile",
  "UI/UX",
  "Open Source",
];

export interface Project {
  id: string;
  title: string;
  category: Category;
  year: string;
  summary: string;
  description: string;
  role: string;
  tech: string[];
  workflow: string[];
  challenges: string[];
  outcomes: string[];
  gradient: string;
  demoUrl: string;
  repoUrl: string;
}

const GITHUB_PROFILE = "https://github.com/xtwtcrret-spec";

export const projects: Project[] = [
  {
    id: "lumen-saas",
    title: "Lumen Analytics",
    category: "Web App",
    year: "2026",
    summary: "Real-time analytics dashboard concept with streaming charts and role-based access.",
    description:
      "A multi-tenant analytics platform concept that ingests product events and renders live dashboards for growth teams. Built around a virtualized chart engine that stays at 60fps with 100k+ data points.",
    role: "Lead Full-Stack Developer",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis", "WebSockets"],
    workflow: [
      "Discovery workshop & data model design",
      "Design system + component library in Storybook",
      "Event ingestion pipeline with Redis streams",
      "Virtualized charting layer & WebSocket live mode",
      "E2E tests, load testing, staged rollout",
    ],
    challenges: [
      "Rendering 100k+ points without dropping frames — solved with canvas-based virtualization and windowed queries.",
      "Multi-tenant row-level security enforced through Postgres RLS policies.",
      "Cutting dashboard TTI from 6s to 1.4s via streaming SSR and route prefetching.",
    ],
    outcomes: ["12k monthly active users (beta)", "99.98% uptime over 6 months", "Lighthouse 98 performance"],
    gradient: "from-blue-500/80 via-indigo-500/70 to-violet-600/80",
    demoUrl: "",
    repoUrl: GITHUB_PROFILE,
  },
  {
    id: "kopi-app",
    title: "Kopi Kita",
    category: "Mobile",
    year: "2025",
    summary: "Coffee ordering app with live queue tracking and loyalty rewards for local cafes.",
    description:
      "A cross-platform mobile app connecting customers with independent coffee shops. Features live preparation status, push notifications, and a stamp-based loyalty program.",
    role: "React Native Developer",
    tech: ["React Native", "Expo", "Node.js", "Firebase", "Stripe"],
    workflow: [
      "User interviews with 20 cafe owners",
      "Rapid prototyping in Expo",
      "Offline-first order state machine",
      "Payments integration & beta launch",
    ],
    challenges: [
      "Unreliable cafe Wi-Fi — designed an offline-first sync engine with conflict resolution.",
      "Keeping APK size under 30MB using Hermes and asset optimization.",
    ],
    outcomes: ["8 partner cafes in 3 months", "4.8★ average store rating", "38% repeat-order rate"],
    gradient: "from-amber-500/80 via-orange-500/70 to-rose-500/80",
    demoUrl: "",
    repoUrl: "",
  },
  {
    id: "aurora-ds",
    title: "Aurora Design System",
    category: "UI/UX",
    year: "2025",
    summary: "Themeable component system with tokens, dark mode, and Figma code-sync pipeline.",
    description:
      "An end-to-end design system: Figma token library synced to code through an automated pipeline, shipped as a versioned npm package with docs site and visual regression coverage.",
    role: "Design Engineer",
    tech: ["Figma", "React", "Radix UI", "Style Dictionary", "Chromatic"],
    workflow: [
      "Token architecture & naming conventions",
      "Accessible primitives on top of Radix",
      "Figma-to-code token sync automation",
      "Docs site with live playground",
    ],
    challenges: [
      "Keeping Figma and code perfectly in sync — built a CI job that diffs exported tokens on every PR.",
      "WCAG AA contrast across 14 brand themes, verified by automated contrast audits.",
    ],
    outcomes: ["Adopted by 5 product teams", "60% faster feature UI delivery", "Zero critical a11y issues"],
    gradient: "from-cyan-500/80 via-sky-500/70 to-blue-600/80",
    demoUrl: "",
    repoUrl: GITHUB_PROFILE,
  },
  {
    id: "formkit-id",
    title: "use-formkit",
    category: "Open Source",
    year: "2024",
    summary: "Tiny type-safe form library for React — 2kb, zero dependencies, schema-friendly.",
    description:
      "A minimal headless form hook focused on type inference and bundle size. Supports Zod schemas out of the box and ships adapter-free field bindings.",
    role: "Creator & Maintainer",
    tech: ["TypeScript", "React", "Zod", "Vitest"],
    workflow: [
      "API design against real-world forms",
      "Core reducer + type inference layer",
      "Property-based testing of edge cases",
      "Community feedback loop & releases",
    ],
    challenges: [
      "Perfect discriminated-union inference for nested arrays took three API rewrites.",
      "Documenting generics clearly enough for beginners without losing power-user ergonomics.",
    ],
    outcomes: ["1.2k GitHub stars", "18k weekly downloads", "24 community contributors"],
    gradient: "from-emerald-500/80 via-teal-500/70 to-cyan-600/80",
    demoUrl: "",
    repoUrl: GITHUB_PROFILE,
  },
  {
    id: "nusantara-travel",
    title: "Nusantara Travel",
    category: "Web App",
    year: "2024",
    summary: "Itinerary planner for Indonesian destinations with maps, budgets, and offline export.",
    description:
      "A trip planning web app where travelers compose day-by-day itineraries across the Indonesian archipelago, auto-calculating routes, budgets, and packing lists with printable offline exports.",
    role: "Frontend Developer",
    tech: ["Next.js", "Mapbox GL", "tRPC", "Prisma", "PWA"],
    workflow: [
      "Content model for destinations & routes",
      "Interactive map itinerary builder",
      "Budget engine + currency handling",
      "PWA offline export & print styles",
    ],
    challenges: [
      "Smooth pan/zoom over 17,000 islands required aggressive vector-tile caching.",
      "Generating reliable PDFs client-side — solved with print-CSS instead of heavy PDF libraries.",
    ],
    outcomes: ["45k itineraries created", "Featured on Product Hunt #4 of the day", "Lighthouse 96"],
    gradient: "from-fuchsia-500/80 via-purple-500/70 to-indigo-600/80",
    demoUrl: "",
    repoUrl: GITHUB_PROFILE,
  },
  {
    id: "pulse-uiux",
    title: "Pulse Banking Concept",
    category: "UI/UX",
    year: "2023",
    summary: "Concept exploration for a calm, glanceable personal-finance mobile experience.",
    description:
      "A self-initiated case study rethinking mobile banking: progressive disclosure of balances, spending insights as ambient visuals, and a strict typographic hierarchy tested with real users.",
    role: "Product Designer",
    tech: ["Figma", "Prototyping", "User Testing"],
    workflow: [
      "Competitive audit of 10 banking apps",
      "Jobs-to-be-done framing with 12 participants",
      "High-fidelity prototypes & motion specs",
      "Moderated usability testing, 3 iterations",
    ],
    challenges: [
      "Balancing glanceability with financial privacy — introduced a persistent blur-until-auth state.",
    ],
    outcomes: ["Task success up from 62% to 94%", "Case study featured on Behance galleries"],
    gradient: "from-rose-500/80 via-pink-500/70 to-fuchsia-600/80",
    demoUrl: "",
    repoUrl: "",
  },
];

export interface Skill {
  name: string;
  mark: string;
  blurb: string;
}

export const skills: Skill[] = [
  { name: "React", mark: "react", blurb: "hooks, suspense, perf tuning" },
  { name: "Next.js", mark: "nextjs", blurb: "App Router, RSC, streaming SSR" },
  { name: "TypeScript", mark: "typescript", blurb: "Strict typing, complex generics" },
  { name: "Tailwind CSS", mark: "tailwindcss", blurb: "Design tokens & plugin authoring" },
  { name: "Python", mark: "python", blurb: "Automation, data pipelines, FastAPI" },
  { name: "Node.js", mark: "nodedotjs", blurb: "APIs, workers, realtime services" },
  { name: "PostgreSQL", mark: "postgresql", blurb: "Schema design, RLS, query tuning" },
  { name: "Figma", mark: "figma", blurb: "Design systems, dev handoff" },
];

export const stats = [
  { value: 15, suffix: "+" },
  { value: 3, suffix: "+" },
  { value: 9, suffix: "+" },
] as const;

export interface TimelineItem {
  id: string;
  type: "work" | "education";
  title: string;
  org: string;
  period: string;
  summary: string;
  details: string[];
  tags: string[];
}

export const timeline: TimelineItem[] = [
  {
    id: "t1",
    type: "work",
    title: "Senior Frontend Engineer",
    org: "Enterprise E-commerce · Jakarta",
    period: "2024 — Present",
    summary: "Leading the storefront experience team for a high-traffic marketplace platform.",
    details: [
      "Own Core Web Vitals for storefront pages; moved LCP from 3.8s to 1.9s.",
      "Led migration of 40+ screens to React Server Components with zero downtime.",
      "Mentor 4 engineers; run the frontend guild's design-review sessions.",
    ],
    tags: ["Next.js", "Performance", "Leadership"],
  },
  {
    id: "t2",
    type: "work",
    title: "Full-Stack Developer",
    org: "Product Startup · Jakarta",
    period: "2022 — 2024",
    summary: "Built internal tooling and merchant-facing dashboards for partner products.",
    details: [
      "Shipped a merchant analytics suite adopted by 90% of partners within two quarters.",
      "Introduced contract-testing between frontend and 6 backend teams, cutting integration bugs by half.",
      "Built a reusable charting package used across 3 internal apps.",
    ],
    tags: ["React", "Node.js", "Data Viz"],
  },
  {
    id: "t3",
    type: "work",
    title: "Frontend Developer",
    org: "Creative Agency · Jakarta",
    period: "2021 — 2022",
    summary: "Agency life: marketing sites and interactive campaigns for regional brands.",
    details: [
      "Delivered 15+ award-nominated campaign sites with heavy motion design.",
      "Set up the studio's first shared Tailwind component library.",
    ],
    tags: ["GSAP", "Tailwind", "Creative Dev"],
  },
  {
    id: "t4",
    type: "education",
    title: "B.Sc. Computer Science",
    org: "State University · Jakarta",
    period: "2017 — 2021",
    summary: "Focus on human-computer interaction and distributed systems.",
    details: [
      "Thesis: perceived latency reduction techniques in single-page applications.",
      "Teaching assistant for Interactive Design Studio, 3 semesters.",
      "Led the campus developer society (300+ members).",
    ],
    tags: ["HCI", "Distributed Systems"],
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Delivered ahead of schedule, and the polish level exceeded what we scoped. The little interactions make the product feel expensive.",
    name: "Sari W.",
    role: "Product Manager · Startup",
  },
  {
    quote: "A rare mix of design sensitivity and engineering rigor. The handoff documentation alone saved our team weeks.",
    name: "Daniel P.",
    role: "Engineering Lead",
  },
  {
    quote: "Communication was clear at every step. Our conversion rate improved noticeably right after launch.",
    name: "Maya K.",
    role: "Small Business Owner",
  },
];

export interface Social {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "x";
}

export const socials: Social[] = [
  { label: "GitHub", url: "https://github.com/xtwtcrret-spec", icon: "github" },
  { label: "Raihan Farhani", url: "https://www.linkedin.com/in/raihan-farhani", icon: "linkedin" },
  { label: "X", url: "https://x.com/xtwtcrret-spec", icon: "x" },
];
