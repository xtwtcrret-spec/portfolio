# Raihan Farhani — Portfolio

Personal portfolio website built with a modern & minimalist aesthetic: Bento Grid layout,
micro-interactions, command palette, dark/light mode, and smooth animations.

**Live:** https://portfolio-livid-alpha-xovnavbmfh.vercel.app

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://motion.dev) — animations, tilt, magnetic buttons
- [Lenis](https://lenis.darkroom.engineering) — smooth scrolling
- [Lucide Icons](https://lucide.dev)
- Deployed on [Vercel](https://vercel.com)

## Features

- Floating glassmorphism navbar with scroll-spy
- Animated hero with mouse-reactive grid glow
- Bento grid: featured project, animated counters, tech-stack tooltips, live Jakarta clock
- Project showcase with category filter + detail modal
- Expandable experience/education timeline
- Testimonials section
- Contact form (Web3Forms API route + honeypot spam trap)
- `Ctrl/Cmd+K` command palette
- EN / ID language toggle (persisted)
- SEO: sitemap, robots, OpenGraph image, JSON-LD Person schema
- Accessibility: keyboard nav, ARIA, `prefers-reduced-motion` support

## Development

```bash
npm install
npm run dev
```

Optional assets that enable features automatically when present in `public/`:

| File | Unlocks |
|------|---------|
| `public/profile.jpg` | Profile photo in hero |
| `public/cv.pdf` | Download CV buttons |

Contact form requires a `WEB3FORMS_KEY` environment variable (free key at web3forms.com).

## Customization

All content lives in `src/lib/data.ts`; UI strings (EN/ID) in `src/lib/i18n.ts`.
