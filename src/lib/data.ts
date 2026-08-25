export type L = { en: string; id: string };

const L = (en: string, id: string): L => ({ en, id });

export const site = {
  name: "Raihan Farhani",
  initials: "RF",
  role: L("Full-Stack Developer & UI Engineer", "Full-Stack Developer & UI Engineer"),
  tagline: L(
    "Crafting fast, accessible interfaces with obsessive attention to detail.",
    "Merancang antarmuka yang cepat, aksesibel, dan penuh perhatian pada detail."
  ),
  email: "m.raihan.farhani@gmail.com",
  location: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  availability: "Available for freelance / full-time",
  currentFocus: L("Building a SaaS analytics dashboard", "Membangun dashboard analitik SaaS"),
  githubUser: "xtwtcrret-spec",
} as const;

export const githubProfileUrl = `https://github.com/${site.githubUser}`;

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
  summary: L;
  description: L;
  role: L;
  tech: string[];
  workflow: L[];
  challenges: L[];
  outcomes: L[];
  gradient: string;
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "lumen-saas",
    title: "Lumen Analytics",
    category: "Web App",
    year: "2026",
    summary: L(
      "Real-time analytics dashboard concept with streaming charts and role-based access.",
      "Konsep dashboard analitik real-time dengan grafik streaming dan akses berbasis peran."
    ),
    description: L(
      "A multi-tenant analytics platform concept that ingests product events and renders live dashboards for growth teams. Built around a virtualized chart engine that stays at 60fps with 100k+ data points.",
      "Konsep platform analitik multi-tenant yang menyerap event produk dan menampilkan dashboard langsung untuk tim growth. Dibangun di atas mesin chart virtualisasi yang tetap 60fps dengan 100k+ titik data."
    ),
    role: L("Lead Full-Stack Developer", "Lead Full-Stack Developer"),
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis", "WebSockets"],
    workflow: [
      L("Discovery workshop & data model design", "Workshop discovery & desain model data"),
      L("Design system + component library in Storybook", "Design system + component library di Storybook"),
      L("Event ingestion pipeline with Redis streams", "Pipeline penyerapan event dengan Redis streams"),
      L("Virtualized charting layer & WebSocket live mode", "Lapisan chart virtualisasi & mode live WebSocket"),
      L("E2E tests, load testing, staged rollout", "Tes E2E, load testing, rollout bertahap"),
    ],
    challenges: [
      L(
        "Rendering 100k+ points without dropping frames — solved with canvas-based virtualization and windowed queries.",
        "Menampilkan 100k+ titik tanpa patah frame — diselesaikan dengan virtualisasi berbasis canvas dan query ter-window."
      ),
      L(
        "Multi-tenant row-level security enforced through Postgres RLS policies.",
        "Keamanan baris multi-tenant ditegakkan melalui policy Postgres RLS."
      ),
      L(
        "Cutting dashboard TTI from 6s to 1.4s via streaming SSR and route prefetching.",
        "Memangkas TTI dashboard dari 6s menjadi 1,4s lewat streaming SSR dan prefetching rute."
      ),
    ],
    outcomes: [
      L("12k monthly active users (beta)", "12k pengguna aktif bulanan (beta)"),
      L("99.98% uptime over 6 months", "Uptime 99,98% selama 6 bulan"),
      L("Lighthouse 98 performance", "Performa Lighthouse 98"),
    ],
    gradient: "from-blue-500/80 via-indigo-500/70 to-violet-600/80",
  },
  {
    id: "kopi-app",
    title: "Kopi Kita",
    category: "Mobile",
    year: "2025",
    summary: L(
      "Coffee ordering app with live queue tracking and loyalty rewards for local cafes.",
      "Aplikasi pesan kopi dengan pelacakan antrian langsung dan loyalitas untuk kafe lokal."
    ),
    description: L(
      "A cross-platform mobile app connecting customers with independent coffee shops. Features live preparation status, push notifications, and a stamp-based loyalty program.",
      "Aplikasi mobile lintas platform yang menghubungkan pelanggan dengan kedai kopi independen. Dilengkapi status pembuatan live, notifikasi push, dan program loyalitas berbasis stempel."
    ),
    role: L("React Native Developer", "React Native Developer"),
    tech: ["React Native", "Expo", "Node.js", "Firebase", "Stripe"],
    workflow: [
      L("User interviews with 20 cafe owners", "Wawancara pengguna dengan 20 pemilik kafe"),
      L("Rapid prototyping in Expo", "Prototyping cepat di Expo"),
      L("Offline-first order state machine", "State machine pesanan offline-first"),
      L("Payments integration & beta launch", "Integrasi pembayaran & peluncuran beta"),
    ],
    challenges: [
      L(
        "Unreliable cafe Wi-Fi — designed an offline-first sync engine with conflict resolution.",
        "Wi-Fi kafe tidak stabil — merancang sync engine offline-first dengan resolusi konflik."
      ),
      L(
        "Keeping APK size under 30MB using Hermes and asset optimization.",
        "Menjaga ukuran APK di bawah 30MB dengan Hermes dan optimasi aset."
      ),
    ],
    outcomes: [
      L("8 partner cafes in 3 months", "8 kafe mitra dalam 3 bulan"),
      L("4.8★ average store rating", "Rating toko rata-rata 4,8★"),
      L("38% repeat-order rate", "38% tingkat pesanan ulang"),
    ],
    gradient: "from-amber-500/80 via-orange-500/70 to-rose-500/80",
  },
  {
    id: "aurora-ds",
    title: "Aurora Design System",
    category: "UI/UX",
    year: "2025",
    summary: L(
      "Themeable component system with tokens, dark mode, and Figma code-sync pipeline.",
      "Sistem komponen tematik dengan token, dark mode, dan pipeline sinkronisasi Figma ke kode."
    ),
    description: L(
      "An end-to-end design system: Figma token library synced to code through an automated pipeline, shipped as a versioned npm package with docs site and visual regression coverage.",
      "Design system end-to-end: library token Figma tersinkron ke kode lewat pipeline otomatis, dirilis sebagai paket npm berversi dengan situs dokumentasi dan coverage regresi visual."
    ),
    role: L("Design Engineer", "Design Engineer"),
    tech: ["Figma", "React", "Radix UI", "Style Dictionary", "Chromatic"],
    workflow: [
      L("Token architecture & naming conventions", "Arsitektur token & konvensi penamaan"),
      L("Accessible primitives on top of Radix", "Primitif aksesibel di atas Radix"),
      L("Figma-to-code token sync automation", "Otomatisasi sinkronisasi token Figma ke kode"),
      L("Docs site with live playground", "Situs dokumentasi dengan playground live"),
    ],
    challenges: [
      L(
        "Keeping Figma and code perfectly in sync — built a CI job that diffs exported tokens on every PR.",
        "Menjaga Figma dan kode tetap sinkron — membangun job CI yang membedah token ekspor di setiap PR."
      ),
      L(
        "WCAG AA contrast across 14 brand themes, verified by automated contrast audits.",
        "Kontras WCAG AA di 14 tema brand, diverifikasi audit kontras otomatis."
      ),
    ],
    outcomes: [
      L("Adopted by 5 product teams", "Diadopsi 5 tim produk"),
      L("60% faster feature UI delivery", "Pengiriman UI fitur 60% lebih cepat"),
      L("Zero critical a11y issues", "Nol masalah a11y kritis"),
    ],
    gradient: "from-cyan-500/80 via-sky-500/70 to-blue-600/80",
  },
  {
    id: "formkit-id",
    title: "use-formkit",
    category: "Open Source",
    year: "2024",
    summary: L(
      "Tiny type-safe form library for React — 2kb, zero dependencies, schema-friendly.",
      "Library form React yang kecil dan type-safe — 2kb, tanpa dependensi, ramah skema."
    ),
    description: L(
      "A minimal headless form hook focused on type inference and bundle size. Supports Zod schemas out of the box and ships adapter-free field bindings.",
      "Hook form headless minimalis yang fokus pada inferensi tipe dan ukuran bundle. Mendukung skema Zod langsung dan binding field tanpa adaptor."
    ),
    role: L("Creator & Maintainer", "Kreator & Pengelola"),
    tech: ["TypeScript", "React", "Zod", "Vitest"],
    workflow: [
      L("API design against real-world forms", "Desain API terhadap formulir dunia nyata"),
      L("Core reducer + type inference layer", "Reducer inti + lapisan inferensi tipe"),
      L("Property-based testing of edge cases", "Testing berbasis properti untuk edge case"),
      L("Community feedback loop & releases", "Umpan balik komunitas & rilis"),
    ],
    challenges: [
      L(
        "Perfect discriminated-union inference for nested arrays took three API rewrites.",
        "Inferensi discriminated-union sempurna untuk nested array butuh tiga kali penulisan ulang API."
      ),
      L(
        "Documenting generics clearly enough for beginners without losing power-user ergonomics.",
        "Mendokumentasikan generics cukup jelas untuk pemula tanpa kehilangan ergonomi power-user."
      ),
    ],
    outcomes: [
      L("1.2k GitHub stars", "1,2k bintang GitHub"),
      L("18k weekly downloads", "18k unduhan mingguan"),
      L("24 community contributors", "24 kontributor komunitas"),
    ],
    gradient: "from-emerald-500/80 via-teal-500/70 to-cyan-600/80",
  },
  {
    id: "nusantara-travel",
    title: "Nusantara Travel",
    category: "Web App",
    year: "2024",
    summary: L(
      "Itinerary planner for Indonesian destinations with maps, budgets, and offline export.",
      "Perencana itinerary destinasi Indonesia dengan peta, anggaran, dan ekspor offline."
    ),
    description: L(
      "A trip planning web app where travelers compose day-by-day itineraries across the Indonesian archipelago, auto-calculating routes, budgets, and packing lists with printable offline exports.",
      "Aplikasi web perencana perjalanan tempat wisatawan menyusun itinerary harian di seluruh kepulauan Indonesia, menghitung rute, anggaran, dan daftar packing otomatis dengan ekspor offline yang bisa dicetak."
    ),
    role: L("Frontend Developer", "Frontend Developer"),
    tech: ["Next.js", "Mapbox GL", "tRPC", "Prisma", "PWA"],
    workflow: [
      L("Content model for destinations & routes", "Model konten untuk destinasi & rute"),
      L("Interactive map itinerary builder", "Builder itinerary peta interaktif"),
      L("Budget engine + currency handling", "Mesin anggaran + penanganan mata uang"),
      L("PWA offline export & print styles", "Ekspor offline PWA & gaya cetak"),
    ],
    challenges: [
      L(
        "Smooth pan/zoom over 17,000 islands required aggressive vector-tile caching.",
        "Pan/zoom mulus di atas 17.000 pulau membutuhkan caching vector-tile agresif."
      ),
      L(
        "Generating reliable PDFs client-side — solved with print-CSS instead of heavy PDF libraries.",
        "Membuat PDF andal di sisi klien — diselesaikan dengan print-CSS alih-alih library PDF berat."
      ),
    ],
    outcomes: [
      L("45k itineraries created", "45k itinerary dibuat"),
      L("Featured on Product Hunt #4 of the day", "Tampil di Product Hunt #4 hari itu"),
      L("Lighthouse 96", "Lighthouse 96"),
    ],
    gradient: "from-fuchsia-500/80 via-purple-500/70 to-indigo-600/80",
  },
  {
    id: "pulse-uiux",
    title: "Pulse Banking Concept",
    category: "UI/UX",
    year: "2023",
    summary: L(
      "Concept exploration for a calm, glanceable personal-finance mobile experience.",
      "Eksplorasi konsep pengalaman mobile personal-finance yang tenang dan sekilas-baca."
    ),
    description: L(
      "A self-initiated case study rethinking mobile banking: progressive disclosure of balances, spending insights as ambient visuals, and a strict typographic hierarchy tested with real users.",
      "Studi kasus inisiatif sendiri yang memikirkan ulang mobile banking: progressive disclosure saldo, insight pengeluaran sebagai visual ambien, dan hierarki tipografi ketat yang diuji dengan pengguna nyata."
    ),
    role: L("Product Designer", "Product Designer"),
    tech: ["Figma", "Prototyping", "User Testing"],
    workflow: [
      L("Competitive audit of 10 banking apps", "Audit kompetitif 10 aplikasi banking"),
      L("Jobs-to-be-done framing with 12 participants", "Framing jobs-to-be-done dengan 12 partisipan"),
      L("High-fidelity prototypes & motion specs", "Prototipe high-fidelity & spesifikasi motion"),
      L("Moderated usability testing, 3 iterations", "Usability testing termoderasi, 3 iterasi"),
    ],
    challenges: [
      L(
        "Balancing glanceability with financial privacy — introduced a persistent blur-until-auth state.",
        "Menyeimbangkan keterbacaan sekilas dengan privasi finansial — memperkenalkan state blur-sampai-autentikasi persisten."
      ),
    ],
    outcomes: [
      L("Task success up from 62% to 94%", "Keberhasilan tugas naik dari 62% ke 94%"),
      L("Case study featured on Behance galleries", "Studi kasus tampil di galeri Behance"),
    ],
    gradient: "from-rose-500/80 via-pink-500/70 to-fuchsia-600/80",
  },
];

export interface Skill {
  name: string;
  mark: string;
  blurb: L;
}

export const skills: Skill[] = [
  { name: "React", mark: "react", blurb: L("hooks, suspense, perf tuning", "hooks, suspense, tuning performa") },
  { name: "Next.js", mark: "nextjs", blurb: L("App Router, RSC, streaming SSR", "App Router, RSC, streaming SSR") },
  { name: "TypeScript", mark: "typescript", blurb: L("Strict typing, complex generics", "Typing ketat, generics kompleks") },
  { name: "Tailwind CSS", mark: "tailwindcss", blurb: L("Design tokens & plugin authoring", "Design tokens & penulisan plugin") },
  { name: "Python", mark: "python", blurb: L("Automation, data pipelines, FastAPI", "Otomasi, pipeline data, FastAPI") },
  { name: "Node.js", mark: "nodedotjs", blurb: L("APIs, workers, realtime services", "API, workers, layanan realtime") },
  { name: "PostgreSQL", mark: "postgresql", blurb: L("Schema design, RLS, query tuning", "Desain skema, RLS, tuning query") },
  { name: "Figma", mark: "figma", blurb: L("Design systems, dev handoff", "Design systems, handoff ke developer") },
];

export const stats = [
  { value: 15, suffix: "+" },
  { value: 3, suffix: "+" },
  { value: 9, suffix: "+" },
] as const;

export interface TimelineItem {
  id: string;
  type: "work" | "education";
  title: L;
  org: L;
  period: string;
  summary: L;
  details: L[];
  tags: string[];
}

export const timeline: TimelineItem[] = [
  {
    id: "t1",
    type: "work",
    title: L("Senior Frontend Engineer", "Senior Frontend Engineer"),
    org: L("Enterprise E-commerce · Jakarta", "E-commerce Enterprise · Jakarta"),
    period: "2024 — Present",
    summary: L(
      "Leading the storefront experience team for a high-traffic marketplace platform.",
      "Memimpin tim pengalaman storefront untuk platform marketplace bertrafik tinggi."
    ),
    details: [
      L(
        "Own Core Web Vitals for storefront pages; moved LCP from 3.8s to 1.9s.",
        "Bertanggung jawab atas Core Web Vitals halaman storefront; menurunkan LCP dari 3,8s ke 1,9s."
      ),
      L(
        "Led migration of 40+ screens to React Server Components with zero downtime.",
        "Memimpin migrasi 40+ layar ke React Server Components tanpa downtime."
      ),
      L(
        "Mentor 4 engineers; run the frontend guild's design-review sessions.",
        "Membimbing 4 engineer; menjalankan sesi design-review guild frontend."
      ),
    ],
    tags: ["Next.js", "Performance", "Leadership"],
  },
  {
    id: "t2",
    type: "work",
    title: L("Full-Stack Developer", "Full-Stack Developer"),
    org: L("Product Startup · Jakarta", "Startup Produk · Jakarta"),
    period: "2022 — 2024",
    summary: L(
      "Built internal tooling and merchant-facing dashboards for partner products.",
      "Membangun tooling internal dan dashboard untuk produk mitra."
    ),
    details: [
      L(
        "Shipped a merchant analytics suite adopted by 90% of partners within two quarters.",
        "Merilis suite analitik merchant yang diadopsi 90% mitra dalam dua kuartal."
      ),
      L(
        "Introduced contract-testing between frontend and 6 backend teams, cutting integration bugs by half.",
        "Memperkenalkan contract-testing antara frontend dan 6 tim backend, memangkas bug integrasi separuhnya."
      ),
      L(
        "Built a reusable charting package used across 3 internal apps.",
        "Membangun package charting reusable yang dipakai 3 aplikasi internal."
      ),
    ],
    tags: ["React", "Node.js", "Data Viz"],
  },
  {
    id: "t3",
    type: "work",
    title: L("Frontend Developer", "Frontend Developer"),
    org: L("Creative Agency · Jakarta", "Agency Kreatif · Jakarta"),
    period: "2021 — 2022",
    summary: L(
      "Agency life: marketing sites and interactive campaigns for regional brands.",
      "Hidup agency: situs marketing dan kampanye interaktif untuk brand regional."
    ),
    details: [
      L(
        "Delivered 15+ award-nominated campaign sites with heavy motion design.",
        "Menyelesaikan 15+ situs kampanye nominasi award dengan motion design berat."
      ),
      L(
        "Set up the studio's first shared Tailwind component library.",
        "Menyiapkan library komponen Tailwind bersama pertama di studio."
      ),
    ],
    tags: ["GSAP", "Tailwind", "Creative Dev"],
  },
  {
    id: "t4",
    type: "education",
    title: L("B.Sc. Computer Science", "S.Kom. Ilmu Komputer"),
    org: L("State University · Jakarta", "Universitas Negeri · Jakarta"),
    period: "2017 — 2021",
    summary: L(
      "Focus on human-computer interaction and distributed systems.",
      "Fokus pada interaksi manusia-komputer dan sistem terdistribusi."
    ),
    details: [
      L(
        "Thesis: perceived latency reduction techniques in single-page applications.",
        "Skripsi: teknik pengurangan latensi persepsian pada aplikasi satu halaman."
      ),
      L(
        "Teaching assistant for Interactive Design Studio, 3 semesters.",
        "Asisten dosen Interactive Design Studio selama 3 semester."
      ),
      L("Led the campus developer society (300+ members).", "Memimpin komunitas developer kampus (300+ anggota)."),
    ],
    tags: ["HCI", "Distributed Systems"],
  },
];

export interface Testimonial {
  quote: L;
  name: string;
  role: L;
}

export const testimonials: Testimonial[] = [
  {
    quote: L(
      "Delivered ahead of schedule, and the polish level exceeded what we scoped. The little interactions make the product feel expensive.",
      "Selesai sebelum jadwal, dan tingkat polish-nya melebihi scope kami. Interaksi kecilnya membuat produk terasa mahal."
    ),
    name: "Sari W.",
    role: L("Product Manager · Startup", "Product Manager · Startup"),
  },
  {
    quote: L(
      "A rare mix of design sensitivity and engineering rigor. The handoff documentation alone saved our team weeks.",
      "Kombinasi langka antara kepekaan desain dan rigor engineering. Dokumentasi handoff-nya saja menghemat waktu tim kami berminggu-minggu."
    ),
    name: "Daniel P.",
    role: L("Engineering Lead", "Engineering Lead"),
  },
  {
    quote: L(
      "Communication was clear at every step. Our conversion rate improved noticeably right after launch.",
      "Komunikasinya jelas di setiap langkah. Conversion rate kami naik signifikan setelah peluncuran."
    ),
    name: "Maya K.",
    role: L("Small Business Owner", "Pemilik Usaha Kecil"),
  },
];

export interface Service {
  icon: "globe" | "layout" | "zap";
  title: L;
  desc: L;
  points: L[];
}

export const services: Service[] = [
  {
    icon: "globe",
    title: L("Web Application Development", "Pengembangan Aplikasi Web"),
    desc: L(
      "End-to-end builds with Next.js — from data model to deployment.",
      "Pembangunan end-to-end dengan Next.js — dari model data hingga deployment."
    ),
    points: [
      L("SSR / static / PWA architectures", "Arsitektur SSR / statis / PWA"),
      L("Auth, payments, CMS integrations", "Auth, pembayaran, integrasi CMS"),
      L("CI/CD on Vercel included", "CI/CD di Vercel termasuk"),
    ],
  },
  {
    icon: "layout",
    title: L("UI Engineering & Design Systems", "UI Engineering & Design System"),
    desc: L(
      "Pixel-perfect, accessible interfaces backed by scalable component libraries.",
      "Antarmuka pixel-perfect dan aksesibel dengan component library yang skalabel."
    ),
    points: [
      L("Token-driven theming (light/dark)", "Theming berbasis token (terang/gelap)"),
      L("WCAG AA accessibility audits", "Audit aksesibilitas WCAG AA"),
      L("Figma-to-code pipelines", "Pipeline Figma ke kode"),
    ],
  },
  {
    icon: "zap",
    title: L("Performance Optimization", "Optimasi Performa"),
    desc: L(
      "Core Web Vitals rescue work for sites that feel slow or rank poorly.",
      "Penyelamatan Core Web Vitals untuk situs yang terasa lambat atau ranking buruk."
    ),
    points: [
      L("Bundle analysis & code-splitting", "Analisis bundle & code-splitting"),
      L("Image, font & caching strategy", "Strategi gambar, font & caching"),
      L("Before/after Lighthouse reports", "Laporan Lighthouse sebelum/sesudah"),
    ],
  },
];

export const resumeSummary = L(
  "Full-stack developer specialized in the React ecosystem, with 3+ years of shipping production web and mobile products. I care about performance budgets, accessible interaction design, and clean handoffs between design and engineering.",
  "Developer full-stack yang spesialis di ekosistem React, dengan 3+ tahun merilis produk web dan mobile produksi. Saya peduli pada anggaran performa, desain interaksi aksesibel, dan handoff bersih antara desain dan engineering."
);

export interface Social {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "x";
}

export const socials: Social[] = [
  { label: "GitHub", url: githubProfileUrl, icon: "github" },
  { label: "Raihan Farhani", url: "https://www.linkedin.com/in/raihan-farhani", icon: "linkedin" },
  { label: "X", url: "https://x.com/xtwtcrret-spec", icon: "x" },
];
