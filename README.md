<div align="center">

<br />

# 📌 PinIt

### Organization Notice Board — Built for teams that move fast

<br />

[![Node.js](https://img.shields.io/badge/Node.js-v14+-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br />

> A modern full-stack web app for managing organizations, posts, reminders, and notifications — all in one place.

<br />

[Features](#-features) · [Tech Stack](#-tech-stack) · [Quick Start](#-quick-start) · [API Reference](#-api-reference) · [Deployment](#-deployment)

<br />

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

**👤 Authentication**
- JWT token-based auth
- bcryptjs password hashing (10 rounds)
- Secure registration & login
- Profile management

</td>
<td width="50%">

**🏢 Organizations**
- Create unlimited organizations
- Invite members via unique codes
- Role-based member management
- Easy join flow

</td>
</tr>
<tr>
<td width="50%">

**📝 Posts & Content**
- 4 post types: General · Event · Scholarship · Announcement
- Tag-based organization
- Full-text search & filtering
- Deadline & date tracking

</td>
<td width="50%">

**🔔 Reminders & Notifications**
- Date-based personal reminders
- Real-time notification system
- Notification history
- Mark reminders complete

</td>
</tr>
</table>

---

## 🔒 Security

PinIt ships with enterprise-grade security out of the box.

| Layer | Protection |
|---|---|
| **Helmet** | CSP, X-Frame-Options, HSTS, MIME sniffing prevention |
| **Rate Limiting** | Login: 5/15min · Register: 3/hr · API: 100/15min |
| **Input Validation** | Email (RFC 5322), password length, ISO 8601 dates, XSS escaping |
| **ORM** | Sequelize — zero raw SQL, parameterized queries throughout |
| **Tokens** | Bearer format validation, 7-day expiry, automatic sanitization |
| **Other** | CORS whitelist · 10KB payload cap · HPP prevention · Gzip compression |

---

## 🛠 Tech Stack

**Frontend**

```
React 18          UI framework
Redux Toolkit     State management
React Router v6   Client-side routing
Tailwind CSS      Styling
Axios             HTTP client
Vite              Build tool
```

**Backend**

```
Node.js           Runtime
Express           Web framework
PostgreSQL        Database
Sequelize         ORM
JWT               Authentication
bcryptjs          Password hashing
Helmet            HTTP security headers
express-validator Input validation
express-rate-limit Rate limiting
```

---

## 📁 Project Structure

```
PinIt/
├── src/                          # React frontend
│   ├── components/
│   │   ├── auth/                 # Login, Register, Protected Routes
│   │   ├── layout/               # Header, Navigation
│   │   ├── organization/         # Org cards & management
│   │   ├── posts/                # Post creation & display
│   │   └── common/               # Shared components
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── OrganizationPage.jsx
│   │   ├── CreateOrganization.jsx
│   │   └── UserProfile.jsx
│   ├── redux/
│   │   ├── slices/
│   │   ├── thunks/
│   │   └── store.js
│   └── api/
│
└── backend/
    ├── config/
    │   ├── database.js
    │   └── sequelize.js
    ├── models/
    │   ├── User.js
    │   ├── Organization.js
    │   ├── OrganizationMember.js
    │   ├── Post.js
    │   ├── PostTag.js
    │   ├── Reminder.js
    │   ├── Notification.js
    │   └── index.js              # All associations
    ├── controllers/
    │   ├── authController.js
    │   ├── organizationController.js
    │   ├── postController.js
    │   ├── reminderController.js
    │   └── notificationController.js
    ├── middleware/
    │   ├── auth.js
    │   ├── validation.js
    │   ├── rateLimiter.js
    │   └── errorHandler.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── organizationRoutes.js
    │   ├── postRoutes.js
    │   ├── reminderRoutes.js
    │   └── notificationRoutes.js
    └── server.js
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js v14+
- PostgreSQL (or a free [Neon.tech](https://neon.tech) account)

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=your-secret-key-min-32-chars
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
# ✓ Database connection established
# ✓ Database schema synchronized
# ✓ Server running on http://localhost:5000
```

### 2. Frontend

```bash
# from the root directory
npm install
npm run dev
# ✓ Frontend running on http://localhost:5173
```

### 3. Demo login

```
Email:    john@example.com
Password: password
```

---

## 📡 API Reference

### Auth

```
POST   /api/auth/register       Register new user
POST   /api/auth/login          Login
GET    /api/auth/profile        Get profile          [protected]
PATCH  /api/auth/profile        Update profile       [protected]
```

### Organizations

```
GET    /api/organizations        List user's orgs     [protected]
POST   /api/organizations        Create org           [protected]
POST   /api/organizations/join   Join via code        [protected]
GET    /api/organizations/:id    Get org details      [protected]
```

### Posts

```
GET    /api/posts/organization/:id   List org posts   [protected]
POST   /api/posts                    Create post      [protected]
DELETE /api/posts/:id                Delete post      [protected]
GET    /api/posts/search             Search posts     [protected]
```

### Reminders & Notifications

```
GET    /api/reminders                 List reminders       [protected]
POST   /api/reminders                 Create reminder      [protected]
DELETE /api/reminders/:id             Delete reminder      [protected]
PATCH  /api/reminders/:id/complete    Mark complete        [protected]

GET    /api/notifications             List notifications   [protected]
PATCH  /api/notifications/:id/read    Mark as read         [protected]
DELETE /api/notifications/:id         Delete               [protected]
```

---

## 🌐 Deployment

### Frontend → Vercel / Netlify

```bash
npm run build
# Deploy the generated dist/ folder
```

### Backend → Render / Railway

Push the `backend/` folder to your platform and set the environment variables from the `.env` section above.

### Estimated cost

| Service | Tier |
|---|---|
| Vercel (frontend) | Free |
| Render (backend) | Free |
| Neon (PostgreSQL) | Free |
| Custom domain | ~$5–15/mo |

---

## 🐛 Troubleshooting

**Backend won't start**
- Check `DATABASE_URL` — most common issue
- Port 5000 in use? Set a different `PORT` in `.env`

**Frontend can't reach backend**
- Make sure the backend is running first
- Check `VITE_API_URL` in the frontend `.env`

**Database errors**
- Verify your PostgreSQL user has `CREATE TABLE` rights
- For Neon, check that the connection string includes `?sslmode=require`

---

## 📜 License

MIT — free to use, modify, and distribute.

---

<div align="center">

<br />

**[⬆ Back to top](#-pinit)**

</div>
