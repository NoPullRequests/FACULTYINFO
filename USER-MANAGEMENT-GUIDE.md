# 👥 User Management System Guide

## Overview

The website now has a **complete user management system** with role-based access control. This allows:

1. **You (Developer)** - Super Admin with full control
2. **Professor** - Can manage all content daily/weekly
3. **Future Users** - Easy to add teaching assistants, co-authors, etc.

---

## 🎯 What's New

### Multi-User Support
- ✅ Multiple admin accounts
- ✅ Password hashing with bcrypt (secure)
- ✅ Role-based permissions (Super Admin vs Professor)
- ✅ User activation/deactivation
- ✅ Last login tracking
- ✅ User management UI at `/admin/users`

### User Roles

**SUPER_ADMIN (You)**
- Full access to everything
- Can create/edit/delete users
- Can manage all content
- Access to user management page

**PROFESSOR (The Professor)**
- Can manage all content (publications, students, courses, projects)
- Can update site settings
- Can change their own password
- Cannot create other users
- Cannot access user management page

---

## 🚀 Getting Started

### Initial Setup (First Time)

1. **Update Database Schema**
   ```bash
   npm run db:push
   ```
   This updates the User model with new fields (password, role, isActive, lastLogin)

2. **Seed Default Users**
   ```bash
   npm run db:seed
   ```
   This creates two default accounts:
   
   **Super Admin Account:**
   - Email: `admin@example.com`
   - Password: `admin123`
   - Role: SUPER_ADMIN
   
   **Professor Account:**
   - Email: `professor@example.com`
   - Password: `professor123`
   - Role: PROFESSOR

3. **Test Login**
   ```bash
   npm run dev
   ```
   - Go to http://localhost:3000/admin/login
   - Try logging in with both accounts
   - **Important:** Change both passwords immediately!

---

## 👤 Managing Users

### Accessing User Management

1. Log in as Super Admin (`admin@example.com`)
2. Go to `/admin/users` (visible in sidebar)
3. You'll see the user management dashboard

### Creating the Professor's Account

**Option 1: Use the Professor Demo Account**
1. Log in as Super Admin
2. Go to `/admin/users`
3. Edit the "Professor Demo" account
4. Update:
   - Name → Professor's actual name
   - Email → Professor's actual email
   - Password → New secure password
   - Keep Role as "PROFESSOR"
5. Save changes
6. Give the professor their new credentials

**Option 2: Create a New Account**
1. Log in as Super Admin
2. Go to `/admin/users`
3. Click "Add User" button
4. Fill in:
   - **Name:** Professor's full name
   - **Email:** Professor's email (e.g., `deyp@nitrkl.ac.in`)
   - **Password:** Temporary password (minimum 8 characters)
   - **Role:** Select "Professor"
5. Click "Create User"
6. Send credentials to professor (they can change password later)

---

## 🔐 Security Features

### Password Security
- ✅ Passwords are hashed with bcrypt (industry standard)
- ✅ Minimum 8 characters required
- ✅ Never stored in plain text
- ✅ Secure password comparison

### Session Security
- ✅ JWT-based sessions
- ✅ Secure authentication flow
- ✅ Last login tracking
- ✅ Session expiration

### Account Management
- ✅ Activate/deactivate users
- ✅ Role-based access control
- ✅ Secure password reset (change via admin)

---

## 📋 User Management Operations

### View All Users
- Go to `/admin/users`
- See list of all admin users
- View their role, status, last login, created date

### Create New User
1. Click "Add User"
2. Fill in form:
   - Name (required)
   - Email (required, must be unique)
   - Password (required, min 8 chars)
   - Role (Professor or Super Admin)
3. Click "Create User"

### Edit User
1. Click edit icon (pencil) next to user
2. Update fields:
   - Name
   - Email
   - Password (leave blank to keep current)
   - Role
3. Click "Update User"

### Activate/Deactivate User
- Click the status badge (Active/Inactive)
- User will be immediately activated or deactivated
- Inactive users cannot log in

### Delete User
1. Click delete icon (trash) next to user
2. Confirm deletion
3. User is permanently removed

---

## 🎓 Professor Daily Usage

### What the Professor Can Do

**After logging in at `/admin/login`:**

1. **Manage Publications** (`/admin/publications`)
   - Add new publications
   - Edit existing publications
   - Delete publications
   - Mark as featured
   - Search and filter

2. **Manage Students** (`/admin/students`)
   - Add current students
   - Update student information
   - Mark students as alumni
   - Update graduation status

3. **Manage Courses** (`/admin/courses`)
   - Add new courses
   - Edit course details
   - Update syllabi
   - Manage course materials

4. **Manage Projects** (`/admin/projects`)
   - Add research projects
   - Update project status
   - Edit project details
   - Mark as current/completed

5. **Update Settings** (`/admin/settings`)
   - Update personal bio
   - Change contact information
   - Update social media links
   - Modify profile information

6. **Change Password** (via Settings)
   - Update their own password
   - For security

### What the Professor CANNOT Do
- ❌ Create other admin users
- ❌ Access user management page
- ❌ Change other users' passwords
- ❌ Delete users

---

## 🔄 Workflow Examples

### Scenario 1: Professor Updates Publications Weekly

**Professor's Workflow:**
1. Log in to `/admin/login` with their credentials
2. Go to "Publications" in sidebar
3. Click "Add Publication"
4. Fill in details (title, authors, year, venue, DOI, abstract)
5. Upload PDF or add URL
6. Add tags
7. Click "Save"
8. Publication is immediately live on the website
9. Log out (optional, or just close browser)

**Frequency:** Weekly or as new papers are published

---

### Scenario 2: Professor Updates Student Directory

**Professor's Workflow:**
1. Log in to admin panel
2. Go to "Students"
3. For new student:
   - Click "Add Student"
   - Fill in name, program, research interests
   - Upload photo
   - Save
4. For graduating student:
   - Edit student
   - Change status to "Alumni"
   - Add graduation year
   - Add current position
   - Save
5. Changes are immediately visible on public site

**Frequency:** 
- Beginning of semester (add new students)
- End of semester (update graduations)
- Ongoing (update research topics, photos)

---

### Scenario 3: Professor Updates Course Information

**Professor's Workflow:**
1. Log in to admin
2. Go to "Courses"
3. For new course:
   - Click "Add Course"
   - Enter code, name, credits, description
   - Upload syllabus PDF
   - Save
4. For existing course:
   - Edit course
   - Update description or materials
   - Save

**Frequency:** Beginning of each semester

---

### Scenario 4: Professor Changes Password

**Professor's Workflow:**
1. Log in to admin
2. Go to "Settings"
3. Scroll to "Change Password" section
4. Enter new password (min 8 characters)
5. Confirm new password
6. Click "Update Password"
7. Log out and log back in with new password

**Frequency:** As needed for security

---

## 🛠️ Setup Instructions for You

### Step 1: Update Database (One Time)

```bash
# In project folder
cd M:\3.PROJECT\FACULTYINFO

# Update database schema
npm run db:push

# Seed default users
npm run db:seed
```

Expected output:
```
Creating admin users...
✓ Admin users created
  - Super Admin: admin@example.com / admin123
  - Professor: professor@example.com / professor123
```

### Step 2: Test Locally

```bash
# Start dev server
npm run dev

# Open browser to http://localhost:3000/admin/login
```

**Test Super Admin:**
- Email: `admin@example.com`
- Password: `admin123`
- You should see "Users" in the sidebar

**Test Professor:**
- Log out
- Log in as `professor@example.com` / `professor123`
- You should NOT see "Users" in the sidebar

### Step 3: Create Professor's Real Account

1. Log in as Super Admin
2. Go to `/admin/users`
3. Create new user:
   - Name: Professor's actual name
   - Email: Their NIT email (e.g., `deyp@nitrkl.ac.in`)
   - Password: Temporary password
   - Role: **Professor** (NOT Super Admin)
4. Save

### Step 4: Give Credentials to Professor

Send them:
- Website URL: `https://your-site.vercel.app` (after deployment)
- Admin URL: `https://your-site.vercel.app/admin/login`
- Email: Their email you used
- Password: The temporary password
- Instructions: "Please change your password after first login"

---

## 🔒 Best Practices

### For You (Super Admin)

1. **Change the default Super Admin password immediately**
   - Don't use `admin123` in production!
   - Use a strong password (12+ characters, mixed case, numbers, symbols)

2. **Create a separate account for the professor**
   - Don't share your Super Admin credentials
   - Give them PROFESSOR role only

3. **Keep your Super Admin credentials secure**
   - Store in password manager
   - Never commit to Git
   - Never share with anyone

4. **Back up user data**
   - Export user list periodically
   - Keep backup of credentials

5. **Monitor user activity**
   - Check last login dates
   - Deactivate unused accounts

### For Professor

1. **Change password after first login**
   - Don't use the temporary password
   - Choose a strong, unique password

2. **Keep credentials secure**
   - Don't share login credentials
   - Log out after use (or close private browser window)

3. **Update content regularly**
   - Weekly: Check for new publications
   - Monthly: Update student information
   - Semester: Update courses

4. **Use strong passwords**
   - Minimum 8 characters
   - Include uppercase, lowercase, numbers
   - Avoid common words

---

## 🚨 Troubleshooting

### "Invalid email or password"
- Check email is correct (case-sensitive)
- Check password is correct
- Verify account is Active (check with Super Admin)

### "Cannot access /admin/users"
- This page is only for Super Admins
- Professors don't need access to user management
- If you need to create users, contact the Super Admin

### "Password too short"
- Minimum 8 characters required
- Choose a longer password

### "User with this email already exists"
- Email addresses must be unique
- Check if user already exists in user list
- Use a different email address

### Forgot Password
- Contact Super Admin
- They can reset your password via Edit User
- Or they can create a new account

### Account Deactivated
- Contact Super Admin
- They can reactivate your account
- Click the status badge to toggle Active/Inactive

---

## 📊 Database Schema

### User Model

```prisma
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  name      String
  password  String    // Hashed with bcrypt
  role      String    @default("PROFESSOR") // SUPER_ADMIN or PROFESSOR
  isActive  Boolean   @default(true)
  lastLogin DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### Fields Explained

- **id:** Unique identifier (auto-generated UUID)
- **email:** Login email (must be unique)
- **name:** Display name
- **password:** Hashed password (never stored in plain text)
- **role:** SUPER_ADMIN or PROFESSOR
- **isActive:** Can the user log in?
- **lastLogin:** When did they last log in?
- **createdAt:** When was the account created?
- **updatedAt:** When was the account last modified?

---

## 🔐 API Endpoints

### User Management API

All endpoints require Super Admin authentication.

**GET /api/admin/users**
- List all users
- Returns: Array of user objects (no passwords)

**POST /api/admin/users**
- Create new user
- Body: `{ email, name, password, role }`
- Returns: Created user object

**GET /api/admin/users/[id]**
- Get single user
- Returns: User object

**PATCH /api/admin/users/[id]**
- Update user
- Body: `{ email?, name?, password?, role?, isActive? }`
- Returns: Updated user object

**DELETE /api/admin/users/[id]**
- Delete user
- Returns: Success message

---

## 📝 Migration Guide

### If You Had the Old System

**Old System:**
- Single admin account via environment variables
- Email and password in `.env` file
- No user management UI

**New System:**
- Multiple database-backed users
- Password hashing
- User management UI
- Role-based access

**Migration Steps:**

1. **Update database**
   ```bash
   npm run db:push
   ```

2. **Seed new users**
   ```bash
   npm run db:seed
   ```

3. **Remove old env vars** (optional)
   - Can remove `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`
   - Keep `AUTH_SECRET` and `DATABASE_URL`

4. **Login with new credentials**
   - Use `admin@example.com` / `admin123`
   - Change password immediately

---

## ✅ Feature Checklist

- [x] Multi-user support
- [x] Password hashing (bcrypt)
- [x] Role-based access (Super Admin / Professor)
- [x] User management UI
- [x] Create/Read/Update/Delete users
- [x] Activate/deactivate accounts
- [x] Last login tracking
- [x] Secure authentication
- [x] API endpoints
- [x] Build passing
- [x] Documentation complete

---

## 🎉 Summary

**For You (Developer):**
1. Run `npm run db:push` and `npm run db:seed`
2. Log in as Super Admin
3. Create professor's account at `/admin/users`
4. Give credentials to professor
5. Done!

**For Professor:**
1. Receive login credentials from you
2. Log in at `/admin/login`
3. Change password in Settings
4. Manage content daily/weekly as needed
5. No coding required!

**Security:**
- ✅ Passwords hashed with bcrypt
- ✅ Secure JWT sessions
- ✅ Role-based permissions
- ✅ Account activation control
- ✅ Production-ready

---

## 📞 Support

**If the professor has questions:**
- How to add publications? → Show them the admin panel
- Forgot password? → You reset it via Edit User
- Need new feature? → Contact you (the developer)
- Website not updating? → Check if they saved changes

**If you have questions:**
- Check this documentation
- Review the code in `src/app/admin/(panel)/users/`
- Test locally first with `npm run dev`
- Check API routes in `src/app/api/admin/users/`

---

**Last updated:** June 30, 2026  
**Version:** 1.0.0  
**Status:** ✅ Complete and Ready

---

**The professor can now manage the website themselves, updating content as often as they need, without any coding required!** 🎓✨
