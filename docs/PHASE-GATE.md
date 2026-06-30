# Phase Gate Checklist

Run this checklist **before starting the next phase**. Do not proceed until all required items pass.

---

## Phase 3a — Layout Shell ✅ COMPLETE

**Date verified:** 2026-06-30

### Automated checks

| Check | Command | Expected | Status |
|-------|---------|----------|--------|
| Production build | `npm run build` | Exit 0, all routes listed | ✅ |
| Lint | `npm run lint` | Exit 0, no errors | ✅ |
| Route smoke test | All 12 nav routes | HTTP 200 | ✅ |

### Manual checks

| Check | Status |
|-------|--------|
| Navbar reads from `src/config/site.ts` (no hardcoded name/email) | ✅ |
| Active route uses `usePathname()` + `isNavLinkActive()` | ✅ |
| Home `/` does not stay active on other routes | ✅ |
| Mobile menu (Sheet) works below `xl` breakpoint | ✅ |
| Dark/light toggle — no hydration flash on refresh | ✅ |
| `suppressHydrationWarning` on `<html>` | ✅ |
| Footer shows name, institution, email from config | ✅ |
| All 12 placeholder pages render | ✅ |

### Fixes applied during gate review

- `departmentShort: "CSE"` added — fixes `getSiteBranding()` abbreviation
- Desktop nav moved to `xl:` breakpoint — prevents 12-link overflow on `lg` screens
- `aria-current="page"` on active nav links — accessibility

### Known limitations (acceptable for 3a)

- No real content — placeholders only
- No `/collaborate` route (not in nav config)
- Theme toggle shows disabled button until client mount (intentional)

**Gate result: PASS → Proceed to Phase 3b**

---

## Phase 3b — Content Hydration ✅ COMPLETE

**Date verified:** 2026-06-30

### Automated checks

| Check | Command | Expected | Status |
|-------|---------|----------|--------|
| Production build | `npm run build` | Exit 0 | ✅ |
| Lint | `npm run lint` | Exit 0 | ✅ |
| Route smoke test | All 12 nav routes | HTTP 200 | ✅ |

### Manual checks

| Check | Status |
|-------|--------|
| `src/content/*.json` seeded from NIT page + Scholar | ✅ |
| Home: Hero, stats, featured publications, research tags | ✅ |
| Publications: list, year/type/search filters | ✅ |
| About: bio, education, experience, awards | ✅ |
| Students: current scholars + alumni | ✅ |
| Research: areas, projects | ✅ |
| Teaching: course lists | ✅ |
| Contact: email/office from `siteConfig` | ✅ |
| All text driven by config/content files | ✅ |

### Still placeholder (Phase 3c / post-prof meeting)

- Blog, Gallery, Downloads, Careers, FAQs pages
- Full 38 publications (6 seeded + total count noted)
- Professor photo, CV, office hours, contact form
- Course syllabi and workshop brochures

**Gate result: PASS → Proceed to Phase 4 when ready**

---

## Phase 4 — Database (Prisma + Supabase) ✅ COMPLETE

**Date verified:** 2026-06-30

### Automated checks

| Check | Command | Expected | Status |
|-------|---------|----------|--------|
| Prisma generate | `npx prisma generate` | Exit 0 | ✅ |
| Production build | `npm run build` | Exit 0, `/api/publications` listed | ✅ |
| Lint | `npm run lint` | Exit 0 | ✅ |
| JSON fallback (no DATABASE_URL) | `npm run build` | Site builds without DB | ✅ |

### What was added

| Item | Path |
|------|------|
| Prisma schema | `prisma/schema.prisma` |
| Seed from JSON | `prisma/seed.ts` |
| DB client singleton | `src/lib/prisma.ts` |
| Static JSON fallback | `src/lib/content-static.ts` |
| Async loaders (DB → JSON fallback) | `src/lib/content.ts` |
| Publications API | `GET /api/publications?search=&year=&type=` |
| Env template | `.env.example` |

### Connect Supabase (when ready)

```bash
cp .env.example .env.local
# Add your Supabase DATABASE_URL to .env.local
npm run db:push
npm run db:seed
```

Without `DATABASE_URL`, the site continues using `src/content/*.json` automatically.

**Gate result: PASS**

---

## Phase 6 — Polish, Content Pages & Deploy ✅ COMPLETE

**Date verified:** 2026-06-30

### What was added

| Feature | Status |
|---------|--------|
| Scroll-triggered animations (FadeIn component) | ✅ |
| Hero with staggered entrance, social links, gradient avatar | ✅ |
| Statistics cards — clickable, route to pages | ✅ |
| Publication cards — hover lift, type-colored badges | ✅ |
| Student detail pages (`/students/[id]`) | ✅ |
| Contact page (form, office info, academic profiles) | ✅ |
| Careers page (Ph.D. positions, project roles, apply CTA) | ✅ |
| FAQs page (accordion, 8 Q&A items) | ✅ |
| Downloads page (CV placeholder, external resources) | ✅ |
| Blog page (placeholder structure, 3 sample posts) | ✅ |
| Gallery page (4 category grid, placeholder) | ✅ |

### Automated checks

| Check | Command | Expected | Status |
|-------|---------|----------|--------|
| Production build | `npm run build` | Exit 0, all 12 routes + 8 student pages | ✅ |
| Lint | `npm run lint` | Exit 0 | ✅ |

### Manual checks

| Check | Status |
|-------|--------|
| All stats cards link correctly (Pubs → `/publications`, Citations → Scholar, etc.) | ✅ |
| Student cards link to detail pages (`/students/stu-1` through `stu-8`) | ✅ |
| Scroll animations trigger on all pages | ✅ |
| Hero social links (LinkedIn, X, ORCID, Scopus, NIT) render and work | ✅ |
| Contact form fields styled, layout responsive | ✅ |
| Accordion works (FAQs expand/collapse smoothly) | ✅ |
| Publication cards show color-coded type badges | ✅ |

### Content ready for professor

| Item | Page | Ready? |
|------|------|--------|
| CV PDF | `/downloads` | No — upload to `/public/cv.pdf` and update href |
| Office hours | `/contact` | Placeholder (Mon–Fri 10–5) — update if different |
| Student detail content | `/students/[id]` | Schema ready — add bio, thesis, links per student |
| Blog posts | `/blog` | Structure ready — add real posts when available |
| Gallery images | `/gallery` | Structure ready — add photos to `/public/gallery/` |
| Teaching materials | `/downloads` | Placeholder — link syllabi/slides when ready |

**Gate result: PASS → Ready for Phase 7 (Deploy to Vercel)**

---

## Phase 5 — Admin Dashboard ✅ COMPLETE

**Date verified:** 2026-06-30

### Automated checks

| Check | Command | Expected | Status |
|-------|---------|----------|--------|
| Production build | `npm run build` | Exit 0, admin routes listed | ✅ |
| Lint | `npm run lint` | Exit 0 | ✅ |
| Public site unchanged | `/` still static | No regression | ✅ |

### What was added

| Item | Path |
|------|------|
| NextAuth credentials login | `src/auth.ts`, `/api/auth/[...nextauth]` |
| Route protection | `src/middleware.ts` → redirects to `/admin/login` |
| Admin panel (no public navbar) | `src/app/admin/(panel)/` |
| Publications CRUD | `/admin/publications` + API |
| Settings editor | `/admin/settings` + API |
| Students / Projects / Courses views | `/admin/students`, etc. |
| Env template | `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` |

### Admin setup

```bash
# Add to .env.local:
AUTH_SECRET="your-random-secret"
ADMIN_EMAIL="deyp@nitrkl.ac.in"
ADMIN_PASSWORD="your-password"
DATABASE_URL="..."   # required for CRUD saves

npm run db:push && npm run db:seed
npm run dev
# Visit http://localhost:3000/admin/login
```

Without `DATABASE_URL`, admin pages load read-only data from JSON. CRUD saves require Supabase.

**Gate result: PASS**

---

## Phase 6 — Polish & Deploy

_To be filled when ready._

---

## How to run the gate

```bash
cd m:\3.PROJECT\FACULTYINFO
npm run build
npm run lint
npm run dev
# Manually click through all nav links, toggle theme, test mobile drawer
```

Update this file with date and status when each phase passes.
