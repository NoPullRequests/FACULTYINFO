# ⚡ Quick Start — Get Your Site Live in 30 Minutes

## Step 1: Preview Locally (2 minutes)

```bash
cd m:\3.PROJECT\FACULTYINFO
npm run dev
```

Open **http://localhost:3000** — site is already working!

---

## Step 2: Deploy to Vercel (10 minutes)

### 2a. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Create a new repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/facultyinfo.git
git push -u origin main
```

### 2b. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com/signup) → Sign up with GitHub
2. Click **Add New** → **Project**
3. Select your `facultyinfo` repo
4. Click **Deploy** (no settings needed)
5. Wait 2 minutes → Done! You'll get a URL like `https://facultyinfo-xyz.vercel.app`

**Site is now live!** All 12 pages work. No database needed yet (runs on JSON files).

---

## Step 3: Add Supabase (Optional — enables admin edits) (15 minutes)

### 3a. Create Supabase project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → New project
2. Name: `facultyinfo`, Password: (choose one), Region: Singapore
3. Wait 2 minutes for provisioning

### 3b. Get connection string
1. In Supabase → **Settings** → **Database** → **Connection string**
2. Copy the **URI** tab contents (starts with `postgresql://`)

### 3c. Add to Vercel
1. In Vercel dashboard → Your project → **Settings** → **Environment Variables**
2. Add these 4 variables:
   ```
   DATABASE_URL = postgresql://postgres:[YOUR-SUPABASE-PASSWORD]@db.xxx.supabase.co:5432/postgres
   AUTH_SECRET = [generate random 32 chars — see below]
   ADMIN_EMAIL = deyp@nitrkl.ac.in
   ADMIN_PASSWORD = [choose a strong password]
   ```
3. Generate `AUTH_SECRET`: Open terminal, run:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
4. Click **Save** in Vercel

### 3d. Initialize database
1. Create `.env.local` in your project folder (copy the 4 vars from Vercel)
2. Run:
   ```bash
   npm run db:push
   npm run db:seed
   ```

### 3e. Redeploy
1. In Vercel dashboard → **Deployments** → **Redeploy** (or just push a new commit to GitHub)

**Admin panel is now live!** Go to `https://your-site.vercel.app/admin/login` and log in.

---

## Step 4: Add Content (5 minutes each)

### Upload CV
1. Put your CV PDF in `public/cv.pdf`
2. Edit `src/app/(site)/downloads/page.tsx`:
   - Line 12: `href: "/cv.pdf"`
   - Line 15: `available: true`
   - Line 16: `size: "340 KB"` (your file size)
3. Push to GitHub → Vercel auto-deploys

### Update Office Hours
1. Edit `src/app/(site)/contact/page.tsx` line 66
2. Change `Monday – Friday: 10:00 AM – 5:00 PM` to your hours
3. Push to GitHub

### Add More Publications
1. Go to `https://your-site.vercel.app/admin/login`
2. Click **Publications** → **Add Publication**
3. Fill form → Save

---

## ✅ That's It!

Your site is live, looks professional, and has all 12 pages working.

**Next:** Add blog posts, gallery images, student bios when you have time. See `HANDOFF.md` for full details.

**Any issues?** Check `HANDOFF.md` Troubleshooting section or run `npm run build` to catch errors before deploying.

---

**Pro tip:** Bookmark your admin panel: `https://your-site.vercel.app/admin`
