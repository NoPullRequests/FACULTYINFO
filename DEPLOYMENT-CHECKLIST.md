# 🚀 Deployment Checklist

Complete guide to deploying your academic portfolio website to production.

---

## Pre-Deployment Checklist

### ✅ Content Preparation

#### Personal Information
- [ ] Replace all placeholder text with real content
- [ ] Upload professional headshot photo (high resolution, 500x500 minimum)
- [ ] Write comprehensive biography (short and detailed versions)
- [ ] Gather all academic credentials and employment history
- [ ] Collect social media links and contact information

#### Publications
- [ ] Export publications from Google Scholar (BibTeX or CSV)
- [ ] Run import script: `npm run import:bibtex` or `npm run import:csv`
- [ ] Review all imported publications in admin panel
- [ ] Add missing DOIs and PDF links
- [ ] Mark 3-5 publications as "featured" for homepage
- [ ] Verify all author names and venues are correct

#### Students
- [ ] Create list of current students (PhD, M.Tech, B.Tech)
- [ ] Add alumni with graduation years and current positions
- [ ] Collect student photos (with permission)
- [ ] Add research interests for each student
- [ ] Add to database via admin panel

#### Teaching
- [ ] List all current and past courses
- [ ] Prepare course syllabi (PDF format)
- [ ] Upload lecture notes
- [ ] Add assignments and resources
- [ ] Organize by semester/year

#### Research
- [ ] Document current research projects
- [ ] Add completed projects with outcomes
- [ ] List collaborators and institutions
- [ ] Include grant information
- [ ] Add project timelines

#### Additional Content
- [ ] Prepare gallery photos (conferences, lab, events)
- [ ] Organize downloadable files (CV, slides, datasets)
- [ ] Write blog posts or news items
- [ ] Create FAQ content
- [ ] Draft collaboration opportunities text

---

## 🗄️ Database Setup

### Option 1: Supabase (Recommended - Free Tier Available)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub or email
   - Create new project

2. **Get Connection String**
   - Go to Project Settings → Database
   - Copy the connection string (URI format)
   - It looks like: `postgresql://postgres:[password]@[host]:5432/postgres`

3. **Set Up Local Environment**
   ```bash
   # Create .env file
   DATABASE_URL="your-supabase-connection-string"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-with-openssl"
   ```

4. **Initialize Database**
   ```bash
   npm run db:push      # Create tables
   npm run db:seed      # Add sample data
   ```

### Option 2: Local PostgreSQL

1. **Install PostgreSQL**
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/)
   - Mac: `brew install postgresql`
   - Linux: `sudo apt install postgresql`

2. **Create Database**
   ```bash
   createdb faculty_db
   ```

3. **Set Connection String**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/faculty_db"
   ```

---

## 🔐 Security Configuration

### Generate Secret Keys

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Create .env File

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Authentication
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-generated-secret"

# Optional: Email service (for contact form)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Optional: File storage
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Change Default Admin Password

1. Log into admin panel: `/admin/login`
2. Go to Settings
3. Change password immediately
4. Use strong password (12+ characters, mixed case, numbers, symbols)

---

## 🌐 Deploy to Vercel

### Step 1: Prepare Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Academic portfolio website"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/faculty-site.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure project settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** (leave default)

### Step 3: Add Environment Variables

In Vercel dashboard, add these environment variables:

```
DATABASE_URL = your-supabase-connection-string
NEXTAUTH_URL = https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET = your-generated-secret
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Visit your site at `your-project.vercel.app`

### Step 5: Run Database Migrations

After first deployment:

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Run migrations:
   ```bash
   vercel env pull .env.local
   npm run db:push
   ```

---

## 🎨 Custom Domain Setup

### Option 1: Vercel Domain (Free)

1. Go to Project Settings → Domains
2. Add domain: `your-name.vercel.app`
3. DNS configured automatically

### Option 2: Custom Domain

1. Purchase domain (Namecheap, GoDaddy, etc.)
2. In Vercel, go to Project → Domains
3. Add your custom domain
4. Configure DNS:
   - **A Record:** Point to Vercel IP (76.76.21.21)
   - **CNAME:** Point www to cname.vercel-dns.com
5. Wait for DNS propagation (5-60 minutes)
6. SSL certificate auto-generated by Vercel

### Update Environment Variables

```env
NEXTAUTH_URL="https://your-custom-domain.com"
```

Redeploy after changing environment variables.

---

## 📧 Email Configuration (Optional)

For contact form to work, set up email service:

### Option 1: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get API key
4. Add to environment:
   ```env
   RESEND_API_KEY="re_xxxxxxxxxxxxx"
   EMAIL_FROM="noreply@yourdomain.com"
   EMAIL_TO="your-email@example.com"
   ```

### Option 2: Gmail SMTP

1. Enable 2-factor authentication on Gmail
2. Generate App Password
3. Add to environment:
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-app-password"
   ```

---

## 📊 Analytics Setup (Optional)

### Google Analytics

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get tracking ID (G-XXXXXXXXXX)
3. Add to `src/app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Vercel Analytics

1. Go to Project → Analytics
2. Enable Vercel Analytics (free)
3. Automatic tracking, no code needed

---

## 🔍 SEO Optimization

### Step 1: Create sitemap.xml

```bash
# Install sitemap generator
npm install next-sitemap
```

Create `next-sitemap.config.js`:

```js
module.exports = {
  siteUrl: 'https://your-domain.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
};
```

Add to package.json:
```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

### Step 2: Update Meta Tags

Verify all pages have proper meta tags (already implemented).

### Step 3: Submit to Google

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership
4. Submit sitemap: `https://your-domain.com/sitemap.xml`

---

## 🖼️ Image Storage Setup (Optional)

For production file uploads:

### Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get credentials from dashboard
3. Add to environment:
   ```env
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

### Supabase Storage

1. In Supabase dashboard, go to Storage
2. Create new bucket: `publications`
3. Set permissions
4. Use Supabase client to upload files

---

## 🧪 Pre-Launch Testing

### Functionality Tests

- [ ] All pages load correctly
- [ ] Navigation works (all links)
- [ ] Admin login functions
- [ ] Can create/edit/delete publications
- [ ] Can create/edit/delete students
- [ ] Search functionality works
- [ ] Filters work properly
- [ ] Contact form sends emails
- [ ] Dark mode toggles correctly
- [ ] Mobile menu opens/closes

### Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing

1. **Google PageSpeed Insights**
   - Visit: [pagespeed.web.dev](https://pagespeed.web.dev)
   - Enter your URL
   - Target: 90+ score

2. **Lighthouse Audit**
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Run audit
   - Fix any issues

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Proper heading hierarchy
- [ ] Alt text on images
- [ ] Color contrast sufficient
- [ ] Focus indicators visible

---

## 📱 Mobile Optimization

- [ ] All pages responsive on mobile
- [ ] Touch targets at least 44x44px
- [ ] Text readable without zooming
- [ ] Images optimized for mobile
- [ ] Fast loading on 3G/4G

---

## 🔒 Security Hardening

### Rate Limiting

Add to API routes for protection against abuse:

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});
```

### Security Headers

Vercel automatically adds security headers, but verify:
- HTTPS enforced
- HSTS enabled
- XSS protection
- Content Security Policy

### Regular Updates

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Update packages
npm update
```

---

## 📋 Post-Deployment Tasks

### Week 1

- [ ] Monitor error logs in Vercel dashboard
- [ ] Check analytics for traffic
- [ ] Test contact form submissions
- [ ] Verify email notifications
- [ ] Fix any reported bugs
- [ ] Add any missing content

### Month 1

- [ ] Review user feedback
- [ ] Optimize slow pages
- [ ] Add more content (blog posts, news)
- [ ] Update publications
- [ ] Backup database

### Quarterly

- [ ] Update npm packages: `npm update`
- [ ] Security audit: `npm audit`
- [ ] Review analytics data
- [ ] Update student directory
- [ ] Refresh content

---

## 🔄 Maintenance Schedule

### Daily
- Check for contact form submissions
- Monitor uptime (use [UptimeRobot](https://uptimerobot.com))

### Weekly
- Add new publications
- Update news section
- Check error logs

### Monthly
- Database backup
- Update packages
- Review analytics
- Add blog posts

### Quarterly
- Security audit
- Performance review
- Content refresh
- Student directory update

---

## 💾 Backup Strategy

### Database Backups

**Automated (Supabase):**
- Free tier: 7-day backups
- Pro tier: Point-in-time recovery

**Manual Backup:**
```bash
# Export database
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20260630.sql
```

### Code Backups

- GitHub repository (primary)
- Local backups (git clone)
- Vercel automatic deployments

---

## 🚨 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Errors

1. Verify DATABASE_URL is correct
2. Check database is accessible
3. Run: `npm run db:generate`
4. Try: `npm run db:push`

### Authentication Issues

1. Verify NEXTAUTH_URL matches domain
2. Check NEXTAUTH_SECRET is set
3. Clear browser cookies
4. Check session expiry settings

### Images Not Loading

1. Verify image paths are correct
2. Check file permissions
3. Use Next.js Image component
4. Verify domain in next.config.ts

---

## 📞 Support Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)

### Community
- Next.js Discord: [discord.gg/nextjs](https://discord.gg/nextjs)
- Vercel Community: [vercel.com/community](https://vercel.com/community)

### Monitoring
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Google Search Console](https://search.google.com/search-console)

---

## ✅ Final Pre-Launch Checklist

### Content
- [ ] All placeholder text replaced
- [ ] Real photos uploaded
- [ ] Publications imported
- [ ] Students added
- [ ] Courses listed
- [ ] Contact info correct

### Technical
- [ ] Database connected
- [ ] Environment variables set
- [ ] Admin password changed
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Email service working

### Testing
- [ ] All pages tested
- [ ] Mobile responsive verified
- [ ] Cross-browser tested
- [ ] Forms working
- [ ] Links checked
- [ ] Performance optimized

### SEO & Analytics
- [ ] Meta tags added
- [ ] Sitemap submitted
- [ ] Google Analytics configured
- [ ] Search Console verified

### Legal
- [ ] Privacy policy added (if needed)
- [ ] Terms of service (if needed)
- [ ] GDPR compliance (if EU visitors)
- [ ] Cookie consent (if tracking)

---

## 🎉 Launch!

Once everything is checked:

1. **Announce Launch**
   - Email colleagues
   - Share on LinkedIn
   - Post on department website
   - Update email signatures

2. **Monitor First Week**
   - Watch error logs
   - Check user feedback
   - Monitor performance
   - Fix any issues quickly

3. **Iterate**
   - Add more content
   - Improve based on feedback
   - Keep updating regularly

---

**Congratulations on launching your academic portfolio!** 🚀

*Last updated: June 30, 2026*
