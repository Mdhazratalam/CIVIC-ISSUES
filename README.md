#  CivicEye — Smart Civic Issue Reporting Platform

CivicEye is a full-stack, multi-role web application designed to bridge the gap between **citizens** and **municipal departments**.  
It empowers citizens to **report civic problems** (like potholes, electricity faults, sanitation issues, etc.), while departments and administrators manage, resolve, and track these issues — all in **real time**.

---

##  Live Deployments

| App Section | URL |
|--------------|-----|
| **Citizen App (Frontend)** | [https://civic-issues-delta.vercel.app](https://civic-issues-delta.vercel.app) |
| **Department Dashboard** | [https://civic-department.vercel.app](https://civic-department.vercel.app) |
| **Admin Dashboard** | [https://civic-issue-admin-ruddy.vercel.app](https://civic-issue-admin-ruddy.vercel.app) |
| **Landing Page (Civic Hub)** | [https://civic-issues-main-page.vercel.app](https://civic-issues-main-page.vercel.app) |
| **Backend (API Server)** | [https://civic-issues-0c9c.onrender.com](https://civic-issues-0c9c.onrender.com) |

---

##  Tech Stack

### **Frontend (All Dashboards)**
- React.js (Vite)
- TailwindCSS
- Framer Motion (for animations)
- Axios for API communication
- React Hot Toast (notifications)
- Socket.IO Client (real-time chat)
- Cloudinary (image hosting)

### **Backend**
- Node.js + Express.js
- MongoDB Atlas (cloud database)
- Mongoose (ODM)
- Socket.IO (real-time communication)
- JWT Authentication
- Cloudinary SDK
- CORS configured for multiple frontends
- Render (for backend deployment)

---

##  Roles and Features

### Citizen
- Register and login securely
- Report civic issues with image, location & description
- Track issue status: Pending → In Progress → Resolved
- Real-time chat with the assigned department
- Delete own reports
- View issues on an interactive map

###  Department
- Login with department credentials
- View assigned issues with images and details
- Update status (Pending → In Progress → Resolved)
- Upload proof images for completed work
- Real-time chat with citizens

###  Admin
- Manage all users and departments
- View analytics & reports of all issues
- Monitor city-wide status distribution (Pending, In Progress, Resolved)
- Maintain system transparency

---

##  Real-Time Chat (Socket.IO)
Both citizens and departments can communicate through a **live chat window** associated with each report.  
- Automatically joins chat rooms based on report IDs  
- Real-time updates via WebSocket (Socket.IO)  
- No page refresh required

---

##  Map Integration
Citizens can view the location of their reports directly on a map view (integrated via coordinates — latitude & longitude fields).

---

## 📸 Image Uploads (Cloudinary)
All images (proofs, reports) are securely uploaded to **Cloudinary CDN**, ensuring fast access and optimized performance.

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository

git clone https://github.com/Mdhazratalam/CIVIC-ISSUES.git
cd CIVIC-ISSUES


2️⃣ Install Dependencies
Each directory has its own package.json:
cd backend && npm install
cd ../frontend && npm install
cd ../admin-dashboard && npm install
cd ../department-dashboard && npm install
cd ../civic-hub && npm install


3️⃣ Set Up Environment Variables
Create a .env file in /backend:

PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
FRONTEND_URL=https://civic-issues-delta.vercel.app

4️⃣ Start Backend
cd backend
npm run dev

5️⃣ Start Frontend (Example for Citizen App)

cd frontend
npm run dev

📊 Deployment
Backend: Render (https://civic-issues-0c9c.onrender.com)

Frontend (Citizen/Admin/Dept/Hub): Vercel


👨‍💻 Author
Md Hazrat Alam
🎓 Engineering Student (Computer Science)
💡 Passionate about full-stack development, civic-tech, and AI-driven innovation.

📧 Email me alammdhazrat743@gmail.com

🔗 GitHub 


