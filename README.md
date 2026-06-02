# LearnX — Next-Gen Learning Dashboard

A high-fidelity, animated student learning dashboard built for the Frontend Intern Challenge. Designed around a premium "Obsidian OS" aesthetic — deep dark backgrounds, electric cyan accents, and buttery-smooth Framer Motion animations throughout.

**Live Demo:** [[your-vercel-url.vercel.app](https://your-vercel-url.vercel.app) ](https://next-gen-learning-dashboard-sage.vercel.app/) 
**Repository:** [[github.com/your-username/next-gen-learning-platform](https://github.com/your-username/next-gen-learning-platform)](https://github.com/rishitbisoyi/next-gen-learning-dashboard)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Syne (display) + Space Mono (mono) via `next/font/google` |
| Deployment | Vercel |

---

## Architecture

### Server / Client Component Split

The data-fetching layer is kept entirely on the server to avoid exposing Supabase credentials to the browser and to eliminate client-side loading waterfalls.

```
app/
└── page.tsx              ← Server Component — fetches courses via getCourses()
    ├── Sidebar.tsx        ← Client Component ("use client") — interactive nav state
    ├── BentoGrid.tsx      ← Client Component — Framer Motion entrance animations
    │   ├── HeroTile.tsx   ← Client Component — streak badge animation
    │   ├── CourseCard.tsx ← Client Component — hover spring + progress animation
    │   └── ActivityTile.tsx ← Client Component — staggered grid reveal
    └── MobileNav.tsx      ← Client Component — active tab state
```

**Rule of thumb used:** A component becomes `"use client"` only when it needs `useState`, `useEffect`, or Framer Motion (`motion.*`). Everything else stays a Server Component.

### Data Fetching

`lib/getCourses.ts` runs exclusively on the server:

```ts
const { data, error } = await supabase.from("courses").select("*");
```

- Uses `@supabase/supabase-js` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables
- Throws on error so Next.js catches it and renders `app/error.tsx`
- The result is passed as a prop into `<BentoGrid courses={courses} />` — no client-side fetching, no `useEffect`

### Loading & Error States

- `app/loading.tsx` — automatically shown by Next.js during server-side data fetching. Uses pulsing `.skeleton` CSS classes with a custom `pulse-dark` keyframe animation.
- `app/error.tsx` — catches thrown errors from `getCourses()`. Renders a styled error card with a retry button that calls `reset()`.

---

## Supabase Setup

### Database Schema

```sql
create table courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null,
  icon_name   text not null,
  created_at  timestamptz default now()
);
```

### Seed Data

```sql
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns',  75, 'Code'),
  ('Next.js Mastery',          55, 'Rocket'),
  ('Data Structures',          90, 'Brain'),
  ('TypeScript Pro',           40, 'FileCode');
```

### Supported `icon_name` Values

`Code` · `Rocket` · `Brain` · `FileCode` · `Cpu` · `Globe` · `Database` · `Layers`

Each maps to a unique accent color in `CourseCard.tsx`.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase project values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ Never commit `.env.local`. It is listed in `.gitignore`. Only `.env.example` (with empty values) is committed.

---

## Animation Architecture

All animations are handled by Framer Motion with strict adherence to performance best practices.

### Zero Layout Shifts

Every animation uses **only `transform` and `opacity`** — properties that are handled by the GPU compositor and never trigger browser repaints or layout recalculations:

```ts
// ✅ Correct — compositor-only properties
whileHover={{ scale: 1.025, y: -4 }}

// ❌ Never used — triggers layout
whileHover={{ width: "110%", marginTop: -4 }}
```

### Spring Physics

All interactive animations use spring physics for a natural, non-linear feel:

```ts
transition={{ type: "spring", stiffness: 300, damping: 20 }}
```

| Use case | Stiffness | Damping | Feel |
|---|---|---|---|
| Card hover | 300 | 20 | Snappy, energetic |
| Entrance stagger | 260 | 24 | Smooth, settled |
| Sidebar nav highlight | 380 | 30 | Fast, precise |

### Staggered Page Load

Tiles don't appear all at once. `BentoGrid` uses `staggerChildren: 0.12` so each tile enters sequentially, sliding up 24px while fading in:

```ts
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1    },
};
```

### `layoutId` for Nav Indicator

The active sidebar highlight and mobile nav indicator use Framer Motion's `layoutId` for automatic FLIP animation — the background pill animates smoothly between items without any manual coordinate calculation:

```tsx
{isActive && (
  <motion.div layoutId="active-nav" className="absolute inset-0 rounded-xl"
    style={{ background: "var(--accent-dim)" }}
    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
)}
```

### Progress Bar Animation

Each course card's progress bar animates from `0%` to the fetched value on mount, with a shimmer sweep effect after:

```ts
<motion.div
  initial={{ width: 0 }}
  animate={{ width: `${course.progress}%` }}
  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
/>
```

---

## Responsive Design

| Breakpoint | Sidebar | Grid |
|---|---|---|
| Mobile `< 768px` | Hidden; replaced by bottom nav bar | Single column |
| Tablet `768–1024px` | Icon-only (72px wide) | 2-column grid |
| Desktop `> 1024px` | Full sidebar with labels (240px) | 3-column bento grid |

---

## Design System

The entire UI is driven by CSS custom properties defined in `globals.css`:

```css
--bg-base:       #080c10   /* Page background */
--bg-surface:    #0d1117   /* Sidebar */
--bg-card:       rgba(16,22,30,0.85)  /* Glass cards */
--accent:        #00e5cc   /* Cyan — primary accent */
--accent-dim:    rgba(0,229,204,0.12) /* Tinted backgrounds */
--border-subtle: rgba(255,255,255,0.06)
--border-glow:   rgba(0,229,204,0.35) /* Hover border */
```

Course cards each get a unique accent color derived from their `icon_name` field, creating visual variety without additional database fields.

---

## Running Locally

```bash
# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Challenges & Decisions

**Font loading with Tailwind v4 + Turbopack:** CSS `@import url()` for Google Fonts caused a PostCSS parsing error because Turbopack injects `@font-face` rules above the stylesheet, making the `@import` appear out of order. Solved by loading fonts exclusively via `next/font/google` in `layout.tsx`, which handles font injection at the framework level with no CSS import needed.

**Server vs Client boundary:** `BentoGrid` needs to be a Client Component for Framer Motion, but `page.tsx` fetches data on the server. The solution is to fetch in the Server Component and pass data as props — the standard RSC pattern. This keeps credentials server-side while giving the client full animation control.

**Activity grid sizing:** CSS `aspect-square` on grid cells causes unpredictable heights depending on container width. Fixed with explicit `gridTemplateRows: "repeat(7, 11px)"` so cells are always square regardless of viewport.
