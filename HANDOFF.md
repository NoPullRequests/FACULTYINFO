# 🚀 Handoff — What's Done & What You Need To Do

**Project:** Dr. Prasenjit Dey — Academic Portfolio Website  
**Status:** ✅ Phase 1–6 Complete | Ready for content & deploy  
**Built:** June 30, 2026

---

## ✅ What's Working Right Now

### Pages (All 12 routes live)
- **Home** (`/`) — Hero, stats (clickable!), research interests, featured pubs
- **About** (`/about`) — Bio, education timeline, experience, awards
- **Research** (`/research`) — Overview, interests, 2 ongoing projects
- **Publications** (`/publications`) — 30 pubs with search/filter, all with DOIs
- **Teaching** (`/teaching`) — 7 theory + 9 lab courses
- **Students** (`/students`) — 7 current + 1 alumni, each links to detail page
- **Student Details** (`/students/[id]`) — 8 individual pages (ready for more content)
- **Contact** (`/contact`) — Email, office, office hours, form, social links
- **Careers** (`/careers`) — Ph.D. + project positions with apply CTAs
- **FAQs** (`/faqs`) — 8 Q&A accordion
- **Downloads** (`/downloads`) — CV placeholder + external resource links
- **Blog** (`/blog`) — Structure ready (3 placeholder posts)
- **Gallery** (`/gallery`) — 4 category grid (placeholders)
- **Admin Panel** (`/admin`) — Full CRUD for publications, students, settings

### Features
- ✅ Scroll-triggered fade-in animations on every page
- ✅ Dark/light theme toggle (no flash)
- ✅ Clickable stat cards (Publications → `/publications`, Citations → Scholar, etc.)
- ✅ Student cards link to individual detail pages
- ✅ Publication cards with hover effects and type-colored badges
- ✅ Responsive navbar with mobile drawer
- ✅ All social/academic profile links (Scholar, ORCID, Scopus, LinkedIn, Twitter)
- ✅ Database integration (Prisma + Supabase) with JSON fallback
- ✅ NextAuth admin login with route protection

### Data
- ✅ 30 publications indexed (out of 39 total on record)
- ✅ 380 citations, h-index 10, i10-index 11 (from Google Scholar)
- ✅ 8 students (7 current, 1 alumni)
- ✅ 2 sponsored projects
- ✅ 16 courses
- ✅ All metadata from NIT Rourkela page + ORCID

---

## 📋 What YOU Need To Do

### 1. Supabase Setup (Optional but recommended for admin edits)

**Why:** Without Supabase, the site runs fully on JSON files. Admin changes won't persist. With Supabase, you can edit publications/students/settings from `/admin` and changes save to the database.

**Steps:**
1. Go to [supabase.com](https://supabase.com) → Create account → New project
2. Name: `facultyinfo`, password: (choose one), region: Singapore
3. Go to **Settings → Database → Connection String** → copy the **URI** format
4. Create `.env.local` in project root:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres"
   AUTH_SECRET="generate-a-random-32-char-string"
   ADMIN_EMAIL="deyp@nitrkl.ac.in"
   ADMIN_PASSWORD="choose-a-strong-password"
   ```
5. Run:
   ```bash
   npm run db:push
   npm run db:seed
   ```

**Auth secret generator:** Run `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

### 2. Add Missing Content Files

**CV / Documents** (for `/downloads` page):
- Upload `cv.pdf` to `m:\3.PROJECT\FACULTYINFO\public\cv.pdf`
- Edit `src/app/(site)/downloads/page.tsx`:
  - Line 12: change `href: "#"` to `href: "/cv.pdf"`
  - Line 15: change `available: false` to `available: true`
  - Line 16: add file size, e.g., `size: "340 KB"`

**Student Details** (for `/students/[id]` pages):
- Each student detail page is minimal right now (just topic + enrollment)
- To add bio, thesis title, publications, profile links:
  - Update `students.json` with new fields, OR
  - Edit each student detail page directly in `src/app/(site)/students/[id]/page.tsx`

**Blog Posts** (for `/blog` page):
- Real posts go in `src/app/(site)/blog/page.tsx`
- Replace the `posts` array (lines 6–28) with actual blog data
- Or use a CMS later (Contentful, Sanity, Markdown files)

**Gallery Images** (for `/gallery` page):
- Create folders: `public/gallery/lab/`, `public/gallery/conferences/`, etc.
- Add images to those folders
- Update `galleryCategories` array in `src/app/(site)/gallery/page.tsx` with image paths

**Office Hours** (for `/contact` page):
- Edit `src/app/(site)/contact/page.tsx` line 66 if hours are different from Mon–Fri 10–5

**Teaching Materials** (for `/downloads` page):
- Add links to syllabi, slides, datasets in the `downloads` array

### 3. Deploy to Vercel (Production hosting)

**Steps:**
1. Push code to GitHub (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/facultyinfo.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → Sign up → **Import Project** → select your GitHub repo

3. **Environment Variables** (click "Add" in Vercel dashboard):
   - `DATABASE_URL` — your Supabase connection string
   - `AUTH_SECRET` — same as in `.env.local`
   - `ADMIN_EMAIL` — `deyp@nitrkl.ac.in`
   - `ADMIN_PASSWORD` — same as in `.env.local`

4. Click **Deploy** — Vercel auto-builds and deploys. Done in ~2 minutes.

5. **Custom Domain** (optional):
   - In Vercel project settings → Domains → add `prasenitdey.com` (or any domain you own)
   - Follow DNS instructions to point domain to Vercel

**Deployed URL will be:** `https://facultyinfo-something.vercel.app` (or your custom domain)

---

## 🎨 UI Upgrade Suggestions (Optional)

### Easy Wins
1. **Add professor photo** to Hero section:
   - Replace the initials avatar with `<Image src="/photo.jpg" ... />`
   - Upload photo to `public/photo.jpg`

2. **Add more featured publications** on home:
   - Currently showing 5 — edit `publications.json` to mark more as `featured: true`

3. **Add lab logo** to navbar or footer:
   - Upload logo to `public/logo.png`
   - Replace text branding in `navbar.tsx` with `<Image>`

### Advanced (When You Have Time)
1. **Individual publication pages** (`/publications/[id]`):
   - Full abstract, authors with links, BibTeX download, related papers

2. **Project detail pages** (`/research/[id]`):
   - Full project description, team members, funding info, outcomes

3. **Blog with Markdown**:
   - Use `next-mdx-remote` or Contentful CMS for rich blog posts

4. **Search across all publications**:
   - Add full-text search with Algolia or similar

5. **Analytics**:
   - Add Google Analytics or Vercel Analytics for visitor tracking

---

## 🐛 Known Issues / Limitations

| Issue | Impact | Fix |
|-------|--------|-----|
| Contact form opens email client (no server-side handler) | Medium | Add API route with nodemailer or SendGrid |
| Publication list shows 30/39 (9 missing) | Low | Add remaining 9 from Scholar manually |
| Student detail pages are minimal | Low | Content placeholders — add bio/thesis/links when ready |
| No real blog posts or gallery images | Low | Content placeholders — add when ready |
| CV download link is placeholder | Medium | Upload CV PDF to `/public/cv.pdf` |

---

## 🔧 Development Commands

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production (test before deploy)
npm run build

# Run linter
npm run lint

# Push database schema to Supabase
npm run db:push

# Seed database with JSON data
npm run db:seed

# Open Prisma Studio (visual DB editor)
npm run db:studio
```

---

## 📂 Key File Locations

| What | Where |
|------|-------|
| Publications data | `src/content/publications.json` |
| Students data | `src/content/students.json` |
| Site bio/stats | `src/content/site.json` |
| Projects | `src/content/projects.json` |
| Courses | `src/content/courses.json` |
| Site config (name, email, links) | `src/config/site.ts` |
| Database schema | `prisma/schema.prisma` |
| Environment variables | `.env.local` (create this) |
| Static files (images, PDFs) | `public/` folder |

---

## 🆘 Troubleshooting

**Build fails:**
- Run `npm run lint` first to check for errors
- Check that all imports are correct
- Delete `.next` folder and rebuild

**Database not working:**
- Check `DATABASE_URL` is correct in `.env.local`
- Run `npm run db:push` to sync schema
- Check Supabase dashboard for connection issues

**Admin login not working:**
- Check `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` in `.env.local`
- Restart dev server after changing `.env.local`

**Animations not smooth:**
- Check browser console for errors
- Try different browser (Chrome/Edge recommended)

---

## ✨ Final Notes

**This is production-ready** except for the content you need to add (CV, photos, student bios, blog posts). The site works fully on JSON files without Supabase, so you can deploy right now and add database later.

**No technical knowledge needed for content updates** — just edit the JSON files in `src/content/` and push to GitHub. Vercel auto-deploys.

**Admin panel** lets you edit publications/students/settings from the browser once Supabase is connected.

**Any questions?** Check `PHASE-GATE.md` for what was built in each phase, or ask me to clarify anything.

---

**Built with:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma, shadcn/ui, Lucide icons  
**Hosting:** Vercel (recommended) or any Node.js host  
**Database:** Supabase (PostgreSQL) with JSON fallback
