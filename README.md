# Dr. Prasenjit Dey — Academic Portfolio Website

A professional academic portfolio website for Dr. Prasenjit Dey, Assistant Professor, Department of Computer Science & Engineering, NIT Rourkela. Built with Next.js 16, TypeScript, Tailwind CSS, and PostgreSQL (Supabase).

---

## Live Site

> Add your Vercel URL here after deployment

**Admin Panel:** `https://your-domain.vercel.app/admin/login`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Animations | Framer Motion |
| Database | PostgreSQL via Prisma ORM |
| Hosting (DB) | Supabase (free tier) |
| Hosting (App) | Vercel |
| Auth | NextAuth v5 (credentials) |
| Email | Resend API |
| Icons | Lucide React |
| Theme | next-themes (dark/light mode) |

---

## Features

**Public site**
- Home — hero, stats, featured publications, news, research interests
- About — biography, education timeline, work experience, awards
- Publications — all 37 papers with search/filter by year and type, citation counts, BibTeX export
- Research — research areas, ongoing and completed sponsored projects
- Teaching — theory and lab courses with expandable course material links
- Students — current PhD/MTech scholars and alumni
- News — latest updates, grants, awards, and opportunities
- Blog — research updates and event write-ups
- Gallery — lab photos, conference photos, award ceremonies
- Downloads — CV (viewable + downloadable), course resources
- Careers — open PhD/JRF positions
- FAQs — common questions
- Contact — contact form with real email delivery via Resend

**Admin panel** (`/admin`)
- Secure login (email + password)
- Publications CRUD — add, edit, delete, mark as featured
- Students CRUD — add/update student profiles
- Projects CRUD — manage sponsored research projects
- Courses CRUD — manage course listings
- News CRUD — add announcements with publish/draft toggle
- Positions CRUD — manage open PhD/JRF positions
- Downloads CRUD — manage downloadable files
- Gallery CRUD — manage photos by category and album
- Settings — edit bio, stats, education, experience, awards
- Account — change admin password

---

## For the Professor — Admin Guide

### Accessing the Admin Panel

1. Open your browser and go to: `https://your-domain.vercel.app/admin/login`
2. Enter your credentials:
   - **Email:** `deyp@nitrkl.ac.in`
   - **Password:** `admin123` *(change this immediately — see below)*
3. You will be taken to the dashboard.

### Changing Your Password

1. Log into the admin panel
2. Click **Account** in the left sidebar
3. Enter your current password and a new password (minimum 8 characters)
4. Click Save

### Adding a New Publication

1. Go to **Publications** in the sidebar
2. Click **Add Publication**
3. Fill in: Title, Authors, Venue/Journal, Year, Type (Journal/Conference/Chapter/Book)
4. Add DOI if available (e.g. `10.1109/JIOT.2023.3247452`)
5. Check **Featured** to show it on the homepage
6. Click Save

### Adding a News Item

1. Go to **News** in the sidebar
2. Click **Add News Item**
3. Fill in title, short description, category, and date
4. Check **Featured** to show it prominently
5. Check **Published** to make it visible on the site
6. Click Save

### Adding a Student

1. Go to **Students** in the sidebar
2. Click **Add Student**
3. Fill in name, research topic, level (PhD/MTech/BTech), status, enrollment year
4. Click Save

### Updating Your Bio or Stats

1. Go to **Settings** in the sidebar
2. Update Short Bio, Long Bio, or stats (citations, h-index, etc.)
3. Click Save — changes go live immediately

### Adding a Gallery Photo

1. Upload the photo to `/public/images/gallery/` on the server (or via Vercel dashboard)
2. Go to **Gallery** in the admin panel
3. Click **Add Image**
4. Enter the image URL as `/images/gallery/your-filename.jpg`
5. Fill in title, category, and album
6. Click Save

### Adding an Open Position

1. Go to **Positions** in the sidebar
2. Click **Add Position**
3. Fill in title, type (PhD/JRF/MTech/Internship), requirements, and deadline
4. Set status to **open**
5. Click Save — it will appear on the Careers page

---

## Development Setup

### Prerequisites

- Node.js 20+
- npm 10+
- A Supabase account (free tier sufficient)
- A Resend account for contact form emails (free tier: 3000 emails/month)

### Installation

```bash
git clone https://github.com/NoPullRequests/FACULTYINFO.git
cd FACULTYINFO
npm install
```

### Environment Variables

Create a `.env` file in the project root (never commit this file):

```env
# Database — Supabase connection string (Session Pooler recommended)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Auth secret — generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
AUTH_SECRET="your-random-secret"

# Email — get from resend.com dashboard
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
```

### Database Setup

```bash
# Push schema to Supabase
npm run db:push

# Seed with initial data (publications, students, courses, projects, admin account)
npm run db:seed
```

Default admin credentials after seeding:
- **Email:** `deyp@nitrkl.ac.in`
- **Password:** `admin123`

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin panel:** Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `deyp@nitrkl.ac.in`
- Password: `admin123`

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `RESEND_API_KEY`
4. Click Deploy

Vercel auto-deploys on every push to `main`.

---

## Project Structure

```
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Initial data seed
├── public/
│   ├── cv/                  # CV PDF
│   └── images/              # Professor photo, gallery images
├── scripts/
│   ├── import-bibtex.ts     # Import publications from .bib file
│   └── import-csv.ts        # Import publications from CSV
├── src/
│   ├── app/
│   │   ├── (site)/          # Public-facing pages
│   │   ├── admin/           # Admin panel pages
│   │   └── api/             # API routes (admin CRUD, contact, auth)
│   ├── components/
│   │   ├── admin/           # Admin panel components
│   │   ├── cards/           # Publication, student cards
│   │   ├── layout/          # Navbar, footer, section headers
│   │   ├── sections/        # Hero, statistics, publications list
│   │   └── ui/              # shadcn/ui base components
│   ├── config/
│   │   └── site.ts          # Site-wide config (name, email, links)
│   ├── content/             # JSON fallback data
│   └── lib/
│       ├── content.ts       # Data fetching (DB with JSON fallback)
│       └── prisma.ts        # Prisma client singleton
```

---

## Importing Publications

**From BibTeX** (export from Google Scholar):
```bash
# Place your .bib file in the project root as publications.bib
npm run import:bibtex
```

**From CSV:**
```bash
# Place your CSV as publications.csv in the project root
npm run import:csv
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with initial data |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |
| `npm run import:bibtex` | Import publications from BibTeX file |
| `npm run import:csv` | Import publications from CSV file |

---

## Database Schema

Core models: `Publication`, `Student`, `Project`, `Course`, `News`, `Position`, `Download`, `GalleryImage`, `SiteSettings`, `User`

All content is stored in Supabase. The site falls back to static JSON files in `src/content/` if the database is unavailable, ensuring the public site always loads.

---

## Notes

- The `.env` file is gitignored — never commit secrets to the repository
- Admin panel is protected by JWT-based session auth via NextAuth v5
- The site works fully without a database (JSON fallback) — only admin edits require Supabase
- Contact form emails require `RESEND_API_KEY` to be set; without it the form shows an error with the direct email address
- On college/institutional WiFi, use the **Session Pooler** connection string from Supabase (port 5432 via pooler) — direct connections on port 5432 may be blocked

---

## License

Private repository. All rights reserved.
Built for Dr. Prasenjit Dey, NIT Rourkela.
