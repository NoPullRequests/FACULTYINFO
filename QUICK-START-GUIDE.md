# Quick Start Guide - Professor Website

## 🚀 Get It Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
Create a `.env` file in the root directory:

```env
# Database (Use Supabase free tier or local PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/faculty_db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Optional: For production
# NEXTAUTH_URL="https://yoursite.com"
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 3: Initialize Database
```bash
npm run db:push    # Create database tables
npm run db:seed    # Add sample data
```

### Step 4: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Access Admin Panel
1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Default credentials (from seed):
   - **Email:** admin@example.com
   - **Password:** password123

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (site)/                  # Public pages
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About page
│   │   ├── publications/        # Publications list
│   │   ├── research/            # Research areas
│   │   ├── teaching/            # Teaching page
│   │   ├── students/            # Students directory
│   │   ├── blog/                # Blog
│   │   ├── gallery/             # Photo gallery
│   │   ├── downloads/           # Downloads center
│   │   ├── news/                # News feed
│   │   ├── careers/             # Open positions
│   │   ├── faqs/                # FAQs
│   │   ├── collaborate/         # Collaboration
│   │   └── contact/             # Contact page
│   │
│   ├── admin/                   # Admin dashboard
│   │   ├── login/               # Login page
│   │   └── (panel)/             # Protected admin area
│   │       ├── page.tsx         # Dashboard home
│   │       ├── publications/    # Manage publications
│   │       ├── students/        # Manage students
│   │       ├── courses/         # Manage courses
│   │       ├── projects/        # Manage projects
│   │       └── settings/        # Site settings
│   │
│   └── api/                     # API routes
│       ├── auth/                # NextAuth endpoints
│       └── admin/               # Admin CRUD APIs
│
├── components/                  # React components
│   ├── layout/                  # Navbar, Footer
│   ├── admin/                   # Admin UI components
│   ├── providers/               # Context providers
│   └── ui/                      # shadcn/ui components
│
└── auth.ts                      # NextAuth configuration

prisma/
├── schema.prisma                # Database schema
└── seed.ts                      # Seed data script
```

---

## 🎯 Common Tasks

### Adding Content via Admin

1. **Add a Publication**
   - Go to `/admin/publications`
   - Click "Add Publication"
   - Fill in title, authors, year, venue, DOI
   - Save

2. **Add a Student**
   - Go to `/admin/students`
   - Click "Add Student"
   - Enter name, program, research interests
   - Upload photo
   - Save

3. **Update Profile**
   - Go to `/admin/settings`
   - Update bio, contact info, social links
   - Save changes

### Customizing the Site

#### Change Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  colors: {
    primary: '#your-color',
    // ...
  }
}
```

#### Change Logo/Title
Edit `src/components/layout/navbar.tsx`

#### Modify Homepage
Edit `src/app/(site)/page.tsx`

---

## 🗄️ Database Management

### View Database Contents
```bash
npm run db:studio
```
Opens Prisma Studio at [http://localhost:5555](http://localhost:5555)

### Reset Database
```bash
# WARNING: This deletes all data!
npx prisma migrate reset
npm run db:seed
```

### Backup Database
```bash
# PostgreSQL
pg_dump -U username -d faculty_db > backup.sql

# Restore
psql -U username -d faculty_db < backup.sql
```

---

## 📤 Deployment Guide

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/faculty-site.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `DATABASE_URL`
     - `NEXTAUTH_URL`
     - `NEXTAUTH_SECRET`
   - Deploy!

3. **Set Up Database**
   - Use [Supabase](https://supabase.com) for free PostgreSQL
   - Copy connection string to `DATABASE_URL`
   - Run migrations via Vercel CLI or Prisma Studio

### Option 2: Docker

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t faculty-site .
docker run -p 3000:3000 faculty-site
```

---

## 🔧 Troubleshooting

### Build Errors

**"Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Prisma errors**
```bash
npm run db:generate
npm run db:push
```

### Database Connection Issues

**Check connection string format:**
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

**Test connection:**
```bash
npm run db:studio
```

### Authentication Not Working

1. Check `NEXTAUTH_SECRET` is set
2. Verify `NEXTAUTH_URL` matches your domain
3. Clear browser cookies and try again

---

## 📊 Performance Tips

### Optimize Images
- Use WebP format
- Compress before uploading
- Use Next.js Image component (already implemented)

### Enable Caching
Add to `next.config.ts`:
```typescript
images: {
  minimumCacheTTL: 60,
}
```

### Database Optimization
- Add indexes to frequently queried fields
- Use pagination for large lists
- Cache API responses

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Use strong `NEXTAUTH_SECRET`
- [ ] Enable HTTPS in production
- [ ] Set up CORS if needed
- [ ] Regular dependency updates: `npm audit`
- [ ] Database backups scheduled
- [ ] Environment variables secured
- [ ] Rate limiting on APIs (consider adding)

---

## 📝 Content Guidelines

### Writing for Academic Audience

**Bio Guidelines:**
- Keep professional tone
- Highlight key achievements
- Update regularly
- Include current research focus

**Publication Entries:**
- Use consistent citation format
- Include DOI when available
- Add keywords/tags
- Link to PDFs when possible

**Student Directory:**
- Update graduation years
- Track alumni positions
- Add current research topics
- Include photos (with permission)

---

## 🎨 Design Customization

### Change Theme Colors

Edit `src/app/globals.css`:
```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* Modify these values */
}
```

### Add Custom Fonts

1. Add font files to `public/fonts/`
2. Import in `globals.css`
3. Update Tailwind config

### Modify Layout

All layouts are in `src/app/`:
- Public site: `(site)/layout.tsx`
- Admin panel: `admin/(panel)/layout.tsx`

---

## 🚨 Important Notes

### Before Going Live

1. **Replace All Placeholder Content**
   - Update sample publications
   - Replace dummy student data
   - Add real contact information
   - Upload actual photos

2. **Configure Email**
   - Set up SMTP or use Resend/SendGrid
   - Test contact form
   - Set up notification emails

3. **SEO Setup**
   - Add meta descriptions
   - Create sitemap
   - Submit to Google Search Console
   - Set up Google Analytics (optional)

4. **Legal**
   - Add privacy policy (if collecting data)
   - Add terms of service (if needed)
   - Ensure GDPR compliance (if EU visitors)

### Maintenance Schedule

**Weekly:**
- Check for new publications to add
- Update news section
- Monitor contact form submissions

**Monthly:**
- Update student directory
- Check for broken links
- Review analytics

**Quarterly:**
- Update npm packages: `npm update`
- Database backup
- Security audit: `npm audit fix`

---

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org)

### Tools
- [Vercel](https://vercel.com) - Hosting
- [Supabase](https://supabase.com) - Database
- [Prisma Studio](https://www.prisma.io/studio) - Database GUI
- [Cloudinary](https://cloudinary.com) - Image hosting

### Community
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Next.js Discord](https://discord.gg/nextjs)

---

## ✅ Pre-Launch Checklist

- [ ] All content replaced with real data
- [ ] Images optimized and uploaded
- [ ] Admin password changed
- [ ] Database backed up
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Contact form tested
- [ ] Mobile responsive verified
- [ ] Dark mode tested
- [ ] All links working
- [ ] SEO meta tags added
- [ ] Google Analytics set up (optional)
- [ ] Privacy policy added (if needed)
- [ ] Sitemap generated

---

## 🎉 You're Ready!

Your professional academic website is ready to go live. It has:

✅ Modern, clean design  
✅ Full admin dashboard  
✅ Mobile responsive  
✅ Dark mode  
✅ Fast performance  
✅ SEO friendly  
✅ Accessible  
✅ Easy to maintain  

**Need help?** Review the main `PROJECT-STATUS.md` for detailed information about all features and components.

---

*Last updated: June 30, 2026*
