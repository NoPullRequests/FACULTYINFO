# 🎯 START HERE - Your Next Steps

**Welcome!** Your academic portfolio website is complete and ready. This guide tells you exactly what to do next.

---

## ✅ What's Already Done

### Fully Implemented Features

**Public Website (14 pages):**
- ✅ Homepage with hero, stats, featured content
- ✅ About page
- ✅ Research page
- ✅ Publications with search/filter
- ✅ Teaching page
- ✅ Student directory with individual pages
- ✅ Blog page
- ✅ Gallery page
- ✅ Downloads center
- ✅ News feed
- ✅ Careers/Open positions
- ✅ FAQs page
- ✅ Collaboration page
- ✅ Contact page

**Admin Dashboard:**
- ✅ Secure login with NextAuth
- ✅ Dashboard home with overview
- ✅ Publications management (CRUD)
- ✅ Students management (CRUD)
- ✅ Courses management
- ✅ Projects management
- ✅ Settings page

**Features:**
- ✅ Dark mode with smooth transitions
- ✅ Fully mobile responsive
- ✅ Page transitions and animations
- ✅ Search functionality
- ✅ Filtering and sorting
- ✅ Skeleton loading states
- ✅ Professional typography
- ✅ WCAG accessibility compliant

**Developer Tools:**
- ✅ BibTeX import script
- ✅ CSV import script
- ✅ Database schema with Prisma
- ✅ Type-safe with TypeScript
- ✅ Seed data for testing

---

## 🎯 What YOU Need to Do

### Phase 1: Set Up Locally (15 minutes)

1. **Install Node.js** (if not already installed)
   - Go to [nodejs.org](https://nodejs.org)
   - Download LTS version (20+)
   - Install it

2. **Open Terminal/Command Prompt**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type `terminal`, press Enter

3. **Navigate to project folder**
   ```bash
   cd M:\3.PROJECT\FACULTYINFO
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment**
   - Copy `.env.example` to `.env`
   - For now, use the default values (we'll set up database in Phase 2)

6. **Test it works**
   ```bash
   npm run dev
   ```
   - Open browser to `http://localhost:3000`
   - You should see the website!

---

### Phase 2: Database Setup (20 minutes)

You have two options:

#### Option A: Supabase (Recommended - Free & Cloud-based)

1. **Create Supabase account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub or email (FREE)

2. **Create new project**
   - Click "New Project"
   - Name: "faculty-website"
   - Database password: Create a strong password (SAVE THIS!)
   - Region: Choose closest to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get connection string**
   - Go to "Project Settings" (gear icon)
   - Click "Database" in sidebar
   - Scroll to "Connection string"
   - Select "URI" tab
   - Copy the connection string
   - Replace `[YOUR-PASSWORD]` with your actual password

4. **Add to .env file**
   - Open `.env` file in your project
   - Replace the DATABASE_URL line with:
   ```env
   DATABASE_URL="your-copied-connection-string-here"
   ```

5. **Generate auth secret**
   - Open terminal
   - Windows: Run `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
   - Mac/Linux: Run `openssl rand -base64 32`
   - Copy the output

6. **Update .env file**
   ```env
   DATABASE_URL="your-supabase-connection-string"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="paste-your-generated-secret-here"
   ```

7. **Initialize database**
   ```bash
   npm run db:push    # Creates tables
   npm run db:seed    # Adds sample data
   ```

8. **Verify it worked**
   - Visit `http://localhost:3000`
   - Go to `/admin/login`
   - Login with:
     - Email: `admin@example.com`
     - Password: `password123`

#### Option B: Local PostgreSQL

Only if you prefer to run database locally (more complex):

1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Create database: `createdb faculty_db`
3. Update `.env`: `DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/faculty_db"`
4. Run: `npm run db:push` and `npm run db:seed`

---

### Phase 3: Collect Content (Time varies)

This is the most important part. You need to gather information from the professor.

#### Print this checklist and fill it out:

**Personal Information:**
- [ ] Full name: ___________________
- [ ] Designation: ___________________
- [ ] Department: ___________________
- [ ] Professional photo (high quality, 500x500 minimum)
- [ ] Short bio (2-3 sentences): ___________________
- [ ] Detailed bio (3-4 paragraphs)

**Contact:**
- [ ] Office location: ___________________
- [ ] Email: ___________________
- [ ] Phone (if public): ___________________
- [ ] Office hours: ___________________

**Social Media:**
- [ ] Google Scholar: ___________________
- [ ] LinkedIn: ___________________
- [ ] ResearchGate: ___________________
- [ ] ORCID: ___________________
- [ ] Twitter/X (if any): ___________________

**Academic Background:**
- [ ] PhD - Institution, Year: ___________________
- [ ] Master's - Institution, Year: ___________________
- [ ] Bachelor's - Institution, Year: ___________________

**Employment History:**
- [ ] Current position: ___________________
- [ ] Previous positions: ___________________

**Research:**
- [ ] Research interests (list 3-5 areas)
- [ ] Current projects (title, description, collaborators)
- [ ] Completed projects
- [ ] Grants received

**Teaching:**
- [ ] Current courses (code, name, credits)
- [ ] Past courses
- [ ] Do you have syllabi PDFs?
- [ ] Do you have lecture notes to share?

**Students:**
- [ ] Current PhD students (name, joining year, research topic)
- [ ] Current M.Tech students
- [ ] Current B.Tech students
- [ ] Alumni (name, graduation year, current position)

**Recognition:**
- [ ] Awards and honors
- [ ] Best paper awards
- [ ] Invited talks
- [ ] Editorial positions
- [ ] Professional memberships

#### Most Important: Publications!

You mentioned you have Google Scholar data. Here's what to do:

**Method 1: Google Scholar Website (Easiest)**

1. Go to the professor's Google Scholar profile
2. You provided: `https://scholar.google.com/citations?user=Z46lTvcAAAAJ&hl=en`
3. Click "Select all" (or select specific publications)
4. Click "Export" button
5. Choose "BibTeX"
6. Save file as `publications.bib`
7. Put the file in your project root folder (M:\3.PROJECT\FACULTYINFO\)
8. Run: `npm run import:bibtex publications.bib`

**Method 2: Old Website**

1. Go to: `https://www.nitrkl.ac.in/CS/~deyp/`
2. Copy publication list
3. Create a spreadsheet with columns:
   - Title
   - Authors
   - Year
   - Venue
   - Type (journal/conference/book)
   - DOI (if available)
   - Abstract
   - PDF_URL
   - Tags
4. Save as `publications.csv`
5. Run: `npm run import:csv publications.csv`

**Example publications.csv format:**
```
Title,Authors,Year,Venue,Type,DOI,Abstract,PDF_URL,Tags
"Paper Title Here","John Doe, Jane Smith",2024,"IEEE Conference",conference,10.1109/xxx,"Paper abstract",https://doi.org/xxx,"AI;ML"
```

See `publications.csv.example` in your project for full example.

---

### Phase 4: Add Content via Admin (30-60 minutes)

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Log into admin**
   - Go to `http://localhost:3000/admin/login`
   - Email: `admin@example.com`
   - Password: `password123`

3. **Change admin password first!**
   - Go to Settings
   - Update password
   - Use a strong password

4. **Update Site Settings**
   - Go to Settings
   - Update:
     - Full name
     - Email
     - Bio (short and detailed)
     - Social media links
     - Contact information
   - Save changes

5. **Review Publications**
   - Go to Publications
   - Check imported publications
   - Edit any incorrect entries
   - Add missing information (DOI, PDF links)
   - Mark 3-5 as "Featured" (these show on homepage)

6. **Add Students**
   - Go to Students
   - Click "Add Student"
   - Fill in:
     - Name
     - Program (PhD/M.Tech/B.Tech)
     - Status (Current/Alumni)
     - Research interests
     - Graduation year (if alumni)
     - Current position (if alumni)
   - Upload photo (optional, but recommended)
   - Save
   - Repeat for all students

7. **Add Courses**
   - Go to Courses
   - Click "Add Course"
   - Fill in:
     - Course code (e.g., "CS101")
     - Course name
     - Credits
     - Semester
     - Description
     - Syllabus (upload PDF if available)
   - Save
   - Repeat for all courses

8. **Add Projects**
   - Go to Projects
   - Click "Add Project"
   - Fill in:
     - Title
     - Description
     - Status (Current/Completed)
     - Start/End dates
     - Funding source
     - Collaborators
   - Save

9. **Test the public website**
   - Go to `http://localhost:3000`
   - Click through all pages
   - Verify content displays correctly
   - Test search functionality
   - Try dark mode toggle
   - Check on mobile (Chrome DevTools > Toggle device toolbar)

---

### Phase 5: Deploy to Internet (30-45 minutes)

Now let's make it live on the internet!

1. **Create GitHub account** (if you don't have one)
   - Go to [github.com](https://github.com)
   - Sign up (FREE)

2. **Install Git** (if not installed)
   - Windows: Download from [git-scm.com](https://git-scm.com)
   - Mac: Already installed or install with Xcode
   - Run: `git --version` to verify

3. **Push code to GitHub**
   ```bash
   # In your project folder
   git init
   git add .
   git commit -m "Initial commit: Academic website"
   
   # Create repository on GitHub first (github.com > New repository)
   # Name it: faculty-website
   # Keep it private
   # Don't initialize with README
   
   # Then connect and push:
   git remote add origin https://github.com/YOUR-USERNAME/faculty-website.git
   git branch -M main
   git push -u origin main
   ```

4. **Create Vercel account**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel

5. **Deploy the website**
   - On Vercel dashboard, click "Add New Project"
   - Click "Import" on your `faculty-website` repository
   - Configure:
     - Framework Preset: Next.js (auto-detected)
     - Root Directory: ./
     - Leave build settings as default
   - Click "Deploy"
   - Wait 2-3 minutes

6. **Add environment variables**
   - After deployment, go to Project Settings
   - Click "Environment Variables"
   - Add these three variables:
     ```
     DATABASE_URL = your-supabase-connection-string
     NEXTAUTH_URL = https://your-project-name.vercel.app
     NEXTAUTH_SECRET = your-generated-secret
     ```
   - Click "Save"

7. **Redeploy**
   - Go to "Deployments" tab
   - Click the three dots on latest deployment
   - Click "Redeploy"
   - Wait 2-3 minutes

8. **Your website is live!**
   - Visit: `https://your-project-name.vercel.app`
   - Share the URL!

---

### Phase 6: Custom Domain (Optional, 10 minutes)

If you want a custom domain like `profname.com`:

1. **Buy a domain**
   - Go to [Namecheap](https://namecheap.com) or [GoDaddy](https://godaddy.com)
   - Search for domain name
   - Purchase (costs $10-15/year)

2. **Connect to Vercel**
   - In Vercel project, go to Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions
   - Wait 5-60 minutes for DNS propagation

3. **Update environment variable**
   - Change `NEXTAUTH_URL` to your custom domain
   - Redeploy

---

## 🎨 Customization (Optional)

### Change Colors

1. Open `src/app/globals.css`
2. Modify the color values:
   ```css
   :root {
     --primary: 222.2 47.4% 11.2%;  /* Change this */
     --secondary: 210 40% 96.1%;     /* And this */
   }
   ```
3. Save and refresh browser

### Change Logo/Title

1. Open `src/components/layout/navbar.tsx`
2. Find the logo/title section
3. Modify as needed

### Add/Remove Pages

All pages are in `src/app/(site)/`
- To hide a page: Delete the folder
- To add a page: Create new folder with `page.tsx`

---

## 📊 Maintenance

### Regular Updates (Weekly)

1. Log into admin panel
2. Add new publications if any
3. Update news section
4. Check for contact form messages (once email is set up)

### Keep Software Updated (Monthly)

```bash
npm update
npm audit fix
git add .
git commit -m "Update dependencies"
git push
```

Vercel will automatically redeploy with updates.

---

## 🆘 Troubleshooting

### "Cannot connect to database"

- Check DATABASE_URL in .env is correct
- Verify Supabase project is running
- Try: `npm run db:push`

### "npm run dev" doesn't work

- Delete `node_modules` folder
- Run: `npm install` again
- Try: `npm run dev` again

### "Page not found" on deployment

- Check environment variables in Vercel
- Make sure NEXTAUTH_URL matches your domain
- Redeploy

### Admin login doesn't work

- Verify environment variables are set
- Check NEXTAUTH_SECRET is at least 32 characters
- Clear browser cookies
- Try incognito/private window

### Publications not showing

- Check if they imported correctly in admin panel
- Verify database connection
- Check console for errors (F12 in browser)

---

## 📚 Documentation Reference

All detailed guides are in your project folder:

1. **[QUICK-START-GUIDE.md](./QUICK-START-GUIDE.md)**
   - Quick setup commands
   - Common tasks
   - Troubleshooting

2. **[PROJECT-STATUS.md](./PROJECT-STATUS.md)**
   - Complete feature list
   - What's implemented
   - Content checklist

3. **[GOOGLE-SCHOLAR-IMPORT.md](./GOOGLE-SCHOLAR-IMPORT.md)**
   - Detailed import instructions
   - BibTeX and CSV formats
   - Import scripts usage

4. **[DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)**
   - Complete deployment guide
   - Security setup
   - Analytics configuration
   - Custom domain setup

5. **[FUTURE-ENHANCEMENTS.md](./FUTURE-ENHANCEMENTS.md)**
   - Ideas for future features
   - AI integration possibilities
   - Advanced functionality

---

## ✅ Quick Checklist

Print this and check off as you go:

**Setup:**
- [ ] Node.js installed
- [ ] Project dependencies installed (`npm install`)
- [ ] .env file configured
- [ ] Database set up (Supabase or local)
- [ ] Database initialized (`npm run db:push` and `npm run db:seed`)
- [ ] Website runs locally (`npm run dev`)
- [ ] Admin login works

**Content:**
- [ ] Collected personal information from professor
- [ ] Got Google Scholar publication data
- [ ] Imported publications
- [ ] Added student information
- [ ] Added course information
- [ ] Added research projects
- [ ] Updated site settings in admin
- [ ] Changed admin password

**Deployment:**
- [ ] Created GitHub account
- [ ] Pushed code to GitHub
- [ ] Created Vercel account
- [ ] Deployed to Vercel
- [ ] Added environment variables in Vercel
- [ ] Website is live and working
- [ ] Tested all pages on live site

**Optional:**
- [ ] Custom domain purchased and connected
- [ ] Google Analytics added
- [ ] Email service configured
- [ ] SEO sitemap generated

---

## 🎉 You're Done!

Once you've completed the checklist above, you have:

✅ A professional academic portfolio website  
✅ Running live on the internet  
✅ With a powerful admin dashboard  
✅ Mobile-friendly and modern  
✅ Easy to update and maintain  

### Share it with:
- Professor (obviously!)
- Department website (get it linked)
- LinkedIn profile
- Email signature
- Academic networks (ResearchGate, ORCID)

---

## 💡 Pro Tips

1. **Regular Updates:** Update publications and news weekly
2. **Backup:** Export database monthly (Prisma Studio > Export)
3. **Monitor:** Check Vercel dashboard for errors
4. **Content First:** Great content > fancy features
5. **Mobile Test:** Always check on phone before sharing
6. **Performance:** Keep images under 500KB
7. **Security:** Never share your NEXTAUTH_SECRET or database credentials

---

## 📞 Need Help?

1. **Check documentation files** (listed above)
2. **Vercel docs:** [vercel.com/docs](https://vercel.com/docs)
3. **Next.js docs:** [nextjs.org/docs](https://nextjs.org/docs)
4. **Prisma docs:** [prisma.io/docs](https://prisma.io/docs)
5. **Supabase docs:** [supabase.com/docs](https://supabase.com/docs)

---

**Good luck! You've got this! 🚀**

The website is ready and waiting for content. Follow the phases above step-by-step, and you'll have a stunning professional website live within a few hours.

*Last updated: June 30, 2026*
