# 🏙️ Civic-Issues Reporting Platform

A full-stack web application enabling citizens to report civic issues (like sanitation, water, road damage, electricity, etc.) to relevant departments, while allowing departments and admins to manage and track the resolution process efficiently.

## 🔗 Live Deployments

- **Citizen Frontend** (Vercel): [https://civic-issues-delta.vercel.app](https://civic-issues-delta.vercel.app)
- **Department Dashboard** (Vercel): [https://civic-department.vercel.app](https://civic-department.vercel.app)
- **Admin Dashboard** (Vercel): [https://civic-issue-admin-ruddy.vercel.app](https://civic-issue-admin-ruddy.vercel.app)


---

## 🧩 Tech Stack

### Frontend
- **Vite + React** (Citizen, Admin, Department Panels)
- **TailwindCSS** for UI design
- **Socket.IO (WebSockets)** for real-time chat
- **Axios** for API communication
- **OpenCage Geocoding API** for address detection
- **Cloudinary** for image uploads

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **Cloudinary** (for report image hosting)
- **Nodemailer** (for email notifications)
- **Socket.IO** (for real-time messaging)
- **JWT Authentication**
- **Role-based Access Control** (citizen, department, admin)

---

## ✅ Features

### 👨‍👩‍👧‍👦 Citizen Portal
- Submit civic issue reports with location and image
- Auto-location detection or map pin
- Automatic department detection based on issue category
- Email confirmation on successful report submission

### 🏢 Department Dashboard
- View and manage department-specific reports
- Change report status (pending → in-progress → resolved)
- Real-time chat with citizens for clarification

### 👨‍💼 Admin Dashboard
- View all reports from all departments
- Manage department and user accounts
- Full control over report lifecycle

### ✉️ Notifications
- Automatic email to department and citizen after submission
- Clean HTML-styled email templates

---

## 🚀 How to Run Locally

### Backend Setup

```bash
cd backend
npm install
Create a .env file inside /backend:
PORT=5000
MONGO_URI=your_mongo_connection_string
EMAIL_USER=your_gmail_account
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret

Then start backend:

npm run dev
Frontend Setup (for any panel: citizen, admin, department)
cd [frontend-folder-name]
npm install
npm run dev

Folder Structure
CIVIC-ISSUES/
├── backend/             # Node.js + Express API
├── citizen-frontend/    # React frontend for citizens
├── admin-dashboard/     # Admin panel
├── department-panel/    # Department panel
├── .gitignore
├── README.md
