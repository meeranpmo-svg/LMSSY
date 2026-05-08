# SYPA IICPR LMS Portal

Static, browser-only LMS portal for **SYPA IICPR Institute** — Mental & Physical Wellness Education.
Built per the internal Requirements & Feature Plan (May 2026).

> **Demo / test build.** All data is seeded into `localStorage` — there is no backend yet.
> Each browser is its own isolated instance. See "Going to production" below.

---

## What's included

### Public pages
- `index.html` — Student login (email or Student ID, password OR OTP, remember-me, forgot password)
- `register.html` — Student registration (all 14 required fields + photo + T&Cs)
- `verify.html` — Email verification gate
- `admin-login.html` — Separate, secured admin/faculty login (not linked from student login)

### Student area (`/student/`)
Dashboard · My Courses · Lesson player (with module list, resources, doubt box) · Tests & Assignments
· Take-test (auto-graded MCQ + assignment submit) · Grades & Feedback · Progress · Announcements
· Doubts thread · Profile

### Admin / Instructor (`/admin/`)
Dashboard · Courses & Modules · Content Upload · Students · Batches · Assessments · Grading
· Announcements · Doubt Management · Reports & Analytics

### Super Admin (`/super-admin/`)
Master Dashboard · Admin/Faculty management · Institute Settings · Fees & Records
· Master Reports (with CSV export)

---

## Demo logins

| Role        | Email / ID            | Password    |
|-------------|-----------------------|-------------|
| Student     | `priya@example.com`   | `student123`|
| Student     | `arjun@example.com`   | `student123`|
| Student     | `neha@example.com`    | `student123`|
| Admin       | `admin@sypa.in`       | `admin123`  |
| Super Admin | `super@sypa.in`       | `super123`  |

---

## Run locally

Any static-file server works. Two options:

```bash
# Option 1 — Python (no install needed)
python -m http.server 8094
#  → http://localhost:8094

# Option 2 — Docker
docker build -t sypa-iicpr-lms .
docker run -d -p 3002:80 sypa-iicpr-lms
#  → http://localhost:3002
```

---

## Deploy free

This is pure static HTML/CSS/JS — works on any static host:

- **GitHub Pages** — Settings → Pages → Source: Deploy from branch (`main`, root)
- **Netlify** — drop the repo, no build command, publish dir: `/`
- **Vercel / Cloudflare Pages** — same idea

---

## Project structure

```
sypa-lms/
├── index.html              ← Student login
├── register.html
├── verify.html
├── admin-login.html
├── Dockerfile
├── nginx.conf
├── assets/
│   ├── css/
│   │   ├── main.css        ← Brand variables, auth pages, components
│   │   └── dashboard.css   ← Sidebar, header, cards, tables
│   └── js/
│       ├── data.js         ← Seed data + localStorage helpers (single integration point)
│       ├── auth.js         ← Session, login, toast, helpers
│       └── shell.js        ← Shared sidebar/header for student/admin/super-admin
├── student/                ← 10 student pages
├── admin/                  ← 10 admin pages
└── super-admin/            ← 5 super-admin pages
```

---

## Going to production

Replace the `Data` module's `load`/`save` helpers in
[`assets/js/data.js`](assets/js/data.js) with real backend calls. Recommended: **Supabase**
(hosted Postgres + Auth + Storage, free tier, called directly from JS — no separate server).
The rest of the UI does not need to change; every page reads from `SYPA.Data.*`.

For real auth, replace the password check in `auth.js` with Supabase Auth (email + OTP both supported
out of the box).

---

## Brand

- Primary: violet `#6d28d9`
- Accent: warm coral `#f97316`
- Type: Poppins (headings) + Inter (body)
- Icons: Font Awesome 6

---

© 2026 SYPA IICPR Institute — Mental & Physical Wellness Education
