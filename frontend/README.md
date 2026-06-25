# 📌 PinIt - Organization Notice Board

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.18-black?style=flat-square&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**A modern, full-stack web application for managing organizations, posts, reminders, and notifications.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Deployment](#-deployment) • [Documentation](#-documentation)

</div>

---

## ✨ Features

<table>
<tr>
<td>

### 👥 Authentication
- Secure user registration & login
- JWT token-based auth
- bcryptjs password hashing
- Profile management

</td>
<td>

### 🏢 Organizations
- Create unlimited organizations
- Invite members via unique codes
- Manage organization members
- Join organizations easily

</td>
</tr>
<tr>
<td>

### 📝 Posts & Content
- Create 4 post types:
  - General announcements
  - Events with dates
  - Scholarships with deadlines
  - Organizational updates
- Tag posts for organization
- Search & filter posts

</td>
<td>

### 🔔 Reminders & Notifications
- Set date-based reminders
- Get notifications for posts
- Mark reminders as complete
- Real-time notification system
- Notification history

</td>
</tr>
</table>

---

## 🛠 Tech Stack

### Frontend
```
React 18              - UI Framework
Redux Toolkit         - State Management
React Router v6       - Client-side Routing
Tailwind CSS          - Styling
Axios                 - HTTP Client
Vite                  - Build Tool
```

### Backend
```
Node.js               - JavaScript Runtime
Express               - Web Framework
PostgreSQL            - Database
JWT                   - Authentication
bcryptjs              - Password Hashing
CORS                  - Cross-Origin Requests
```

### Deployment Ready
```
Vercel/Netlify        - Frontend Hosting
Render/Railway        - Backend Hosting
Neon                  - PostgreSQL Hosting
GitHub                - Version Control
```

---

## 📁 Project Structure

```
PinIt/
├── 📂 src/                          # Frontend React App
│   ├── 📂 components/               # Reusable Components
│   │   ├── auth/                    # Login, Register, Protected Routes
│   │   ├── layout/                  # Header, Layout, Navigation
│   │   ├── organization/            # Organization Cards
│   │   ├── posts/                   # Post Creation & Display
│   │   └── common/                  # Shared Components
│   ├── 📂 pages/                    # Page Components
│   │   ├── Dashboard.jsx
│   │   ├── OrganizationPage.jsx
│   │   ├── CreateOrganization.jsx
│   │   └── UserProfile.jsx
│   ├── 📂 redux/                    # State Management
│   │   ├── slices/                  # Redux Slices
│   │   ├── thunks/                  # Async Actions
│   │   └── store.js                 # Store Config
│   ├── 📂 api/                      # API Configuration
│   ├── App.jsx                      # Main App Component
│   └── main.jsx                     # Entry Point
│
├── 📂 backend/                      # Express Backend Server
│   ├── 📂 config/                   # Configuration
│   │   └── database.js              # PostgreSQL Setup
│   ├── 📂 controllers/              # Business Logic
│   │   ├── authController.js
│   │   ├── organizationController.js
│   │   ├── postController.js
│   │   ├── reminderController.js
│   │   └── notificationController.js
│   ├── 📂 middleware/               # Express Middleware
│   │   ├── auth.js                  # JWT Verification
│   │   └── errorHandler.js          # Error Handling
│   ├── 📂 routes/                   # API Routes
│   │   ├── authRoutes.js
│   │   ├── organizationRoutes.js
│   │   ├── postRoutes.js
│   │   ├── reminderRoutes.js
│   │   └── notificationRoutes.js
│   ├── server.js                    # Main Server File
│   ├── package.json
│   └── .env
│
├── 📄 README.md                     # This File
├── 📄 QUICKSTART.md                 # Quick Setup Guide
├── 📄 DEPLOYMENT.md                 # Deployment Instructions
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 .env
└── 📄 .gitignore

```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14 or higher
- **PostgreSQL** database (or free [Neon.tech](https://neon.tech) account)
- **npm** or **yarn**

### 1️⃣ Backend Setup (5 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with your database URL
echo "DATABASE_URL=postgresql://user:pass@host/dbname" > .env
echo "JWT_SECRET=your-secret-key-change-this" >> .env
echo "PORT=5000" >> .env

# Start backend server
npm run dev
# ✓ Server running on http://localhost:5000
```

### 2️⃣ Frontend Setup (2 minutes)

```bash
# Navigate to root directory
cd ..

# Install dependencies
npm install

# Start development server
npm run dev
# ✓ Frontend running on http://localhost:5173
```

### 3️⃣ Login & Test

1. Visit `http://localhost:5173`
2. Click **"Demo Login"**
3. Or register a new account
4. Explore features:
   - ✅ Dashboard
   - ✅ Create Organization
   - ✅ Create Posts
   - ✅ Set Reminders
   - ✅ Manage Profile

---

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register              Register new user
POST   /api/auth/login                 Login user
GET    /api/auth/profile               Get user profile (protected)
PATCH  /api/auth/profile               Update profile (protected)
```

### Organizations
```
GET    /api/organizations              Get user's organizations
POST   /api/organizations              Create organization
POST   /api/organizations/join         Join organization
GET    /api/organizations/:id          Get organization details
```

### Posts
```
GET    /api/posts/organization/:id     Get organization's posts
POST   /api/posts                      Create post
DELETE /api/posts/:id                  Delete post
GET    /api/posts/search               Search posts
```

### Reminders & Notifications
```
GET    /api/reminders                  Get user's reminders
POST   /api/reminders                  Create reminder
DELETE /api/reminders/:id              Delete reminder
PATCH  /api/reminders/:id/complete     Mark reminder complete

GET    /api/notifications              Get notifications
PATCH  /api/notifications/:id/read     Mark as read
DELETE /api/notifications/:id          Delete notification
```

---

## 🔑 Demo Credentials

```
📧 Email:    john@example.com
🔐 Password: password
```

---

## 📖 Documentation

| Guide | Description |
|-------|-------------|
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup guide |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment options |
| [README_FULL_STACK.md](README_FULL_STACK.md) | Full architecture & features |

---

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder to Vercel or Netlify
```

### Backend (Render/Railway/Heroku)
```bash
# Push backend folder to your hosting platform
# Set environment variables (DATABASE_URL, JWT_SECRET)
# Backend auto-deploys on git push
```

### Cost (Monthly)
| Service | Free Tier |
|---------|-----------|
| Frontend (Vercel) | ✅ FREE |
| Backend (Render) | ✅ FREE |
| Database (Neon) | ✅ FREE |
| Domain | ~$5-15 |
| **Total** | **$5-15/mo** |

---

## 🔒 Security Features

✅ **JWT Authentication** - Secure token-based auth  
✅ **Password Hashing** - bcryptjs with 10 rounds  
✅ **Protected Routes** - Only authenticated users  
✅ **CORS Enabled** - Safe cross-origin requests  
✅ **Token Validation** - Every protected endpoint  
✅ **User Authorization** - Can only access own data  

---

## 🎨 Screenshots & Usage

### Dashboard
- View all your organizations
- See upcoming reminders
- Quick access to create posts

### Organizations
- Create new organization groups
- Get unique invite codes
- Manage members

### Posts
- Create posts (general, event, scholarship, announcement)
- Add tags for categorization
- Set event dates & deadlines
- Search & filter posts

### Reminders
- Set reminders for important posts
- Get notifications on reminder date
- Mark reminders as complete

---

## 💻 Development

### Available Scripts

**Frontend:**
```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Build for production
npm run preview   # Preview production build
```

**Backend:**
```bash
cd backend
npm run dev       # Start with auto-reload
npm start         # Production mode
```

### Code Quality

✅ Simple, readable code  
✅ No over-engineering  
✅ Proper error handling  
✅ Well-organized structure  
✅ Production-ready  

---

## 🐛 Troubleshooting

### Backend won't start
```
❌ DATABASE_URL is wrong
✅ Double-check your PostgreSQL connection string

❌ Port 5000 in use
✅ Change PORT in backend/.env
```

### Frontend can't connect
```
❌ Backend not running
✅ Start backend first: cd backend && npm run dev

❌ CORS errors
✅ Ensure backend has CORS enabled
```

### Database errors
```
❌ Can't connect to Neon
✅ Check internet connection & credentials

❌ Permission denied
✅ Verify DATABASE_URL user has CREATE TABLE rights
```

---

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (backend/.env)
```env
DATABASE_URL=postgresql://user:pass@host:port/dbname
JWT_SECRET=your-super-secret-key-123
PORT=5000
NODE_ENV=development
```

---

## 🤝 Contributing

This is a full-stack college project. Feel free to:
- ✅ Fork and modify
- ✅ Use as template
- ✅ Submit improvements
- ✅ Learn from code

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial use.

---

## 🎉 Let's Build!

Ready to get started?

1. **Quick Setup:** See [QUICKSTART.md](QUICKSTART.md)
2. **Full Docs:** See [README_FULL_STACK.md](README_FULL_STACK.md)
3. **Deploy:** See [DEPLOYMENT.md](DEPLOYMENT.md)

---

<div align="center">

**Made with ❤️ for the community**

[⬆ Back to Top](#-pinit---organization-notice-board)

</div>
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint to check for code issues
- `npm run preview`: Preview the production build locally

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 