# <div align="center">Medical Booking System 🏥</div>

<div align="center">

[![React](https://img.shields.io/badge/-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/-JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

**A premium, full-stack healthcare platform engineered for seamless appointment scheduling and comprehensive clinic management.**

[View Live Demo](https://medical-booking-system.vercel.app/) · [Report Bug](https://github.com/yourusername/medical-booking-system/issues) · [Request Feature](https://github.com/yourusername/medical-booking-system/issues)

</div>

---

## 🚀 Overview

**Medical Booking System** is a state-of-the-art web application designed to simulate a modern digital healthcare environment. It simulates a complete ecosystem connecting patients with medical professionals through an intuitive, mobile-first interface, while providing administrators with a powerful command center to manage the clinic's operations.

The application features a distinct **Dark Glassmorphism UI**, providing a premium, high-tech aesthetic that stands out from traditional medical software.

## ✨ Key Features

### 👨‍⚕️ For Patients (Public Portal)
*   **Heroic Landing Page:** Engaging entrance with animated medical elements and clear calls to action.
*   **Smart Doctor Search:** Filter specialists by category, price range, and experience using an interactive sidebar/drawer.
*   **Seamless Booking Flow:** 
    *   **Step-by-Step Wizard:** Guided 4-step process (Doctor -> Time -> Details -> Confirm).
    *   **Real-time Slots:** Dynamic time slot availability based on doctor's schedule.
    *   **Mobile-First Design:** Fully responsive booking form that works perfectly on smartphones.
*   **Interactive UI:** Hover effects, smooth transitions, and fluid animations using Framer Motion.

### 🛡️ For Administrators (Command Center)
*   **Dashboard Analytics:** Visual overview of total bookings, revenue, active doctors, and pending actions.
*   **Booking Management:** 
    *   Status control (Pending/Confirmed/Cancelled).
    *   Filter appointments by status.
    *   Detailed patient and contact information.
*   **Doctor Management:** 
    *   Add/Edit/Remove doctors.
    *   Set consultation prices, experience levels, and upload profile images.
*   **Specialty Management:** Create and manage medical categories (e.g., Cardiology, Neurology).
*   **Security:** Integrated JWT Authentication for protected administrative routes.
*   **Responsive Layout:** Collapsible sidebar and optimized tables for mobile admin access.

---

## 🏗️ Technical Architecture

This project utilizes the **MERN Stack** for a robust, scalable full-stack solution.

| Layer | Technology | Key Details |
| :--- | :--- | :--- |
| **Frontend** | **React 18 (Vite)** | Component-based UI with fast HMR. |
| **Styling** | **Tailwind CSS** | Utility-first styling with custom configurations for the specific dark theme. |
| **Animations** | **Framer Motion** | Complex UI transitions and micro-interactions. |
| **Backend** | **Node.js & Express** | RESTful API with modular route architecture. |
| **Database** | **MongoDB Atlas** | Cloud-hosted NoSQL database with Mongoose ODM. |
| **Authentication** | **JWT (JSON Web Tokens)** | Stateless authentication middleware. |

### Project Structure

```bash
medical-booking-system/
├── backend/                 # Node.js API Server
│   ├── src/
│   │   ├── config/          # DB connection & global configs
│   │   ├── controllers/     # Route logic (Auth, Bookings, Doctors)
│   │   ├── middleware/      # Auth & Error handling
│   │   ├── models/          # Mongoose Schemas
│   │   ├── routes/          # API Route definitions
│   │   └── server.js        # Entry point
│   └── .env                 # Backend keys
│
├── frontend/                # React Client
│   ├── src/
│   │   ├── assets/          # Images & Global Styles
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page views (Home, Booking, Admin)
│   │   ├── services/        # API service layer (Axios)
│   │   ├── App.jsx          # Main Router
│   │   └── main.jsx         # Entry point
│   └── .env                 # Frontend keys
└── README.md                # Documentation
```

---

## ⚡ Getting Started

### Prerequisites
*   Node.js (v16+)
*   MongoDB Atlas Account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/medical-booking-system.git
cd medical-booking-system
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
```

Start the backend server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies.

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend application:
```bash
npm run dev
# Application runs on http://localhost:5173
```

---

## � API Documentation

The backend exposes a standard REST API. Here are the primary endpoints:

### Doctors
*   `GET /api/doctors` - Retrieve all doctors (supports filtering by specialty/price).
*   `GET /api/doctors/:id` - Get details of a single doctor.
*   `POST /api/doctors` - Create a new doctor (Admin only).
*   `PUT /api/doctors/:id` - Update doctor details (Admin only).
*   `DELETE /api/doctors/:id` - Remove a doctor (Admin only).

### Bookings
*   `POST /api/bookings` - Create a new appointment.
*   `GET /api/bookings` - Retrieve all bookings (Admin only).
*   `GET /api/bookings/doctor/:doctorId/date/:date` - Get available time slots.
*   `PUT /api/bookings/:id` - Update booking status (Admin only).

### Specialties
*   `GET /api/specialties` - Get all medical specialties.
*   `POST /api/specialties` - Create new specialty (Admin only).

---

## 🔐 Admin Access (Demo)

To access the Admin Dashboard, navigate to `/admin/login` and use the following credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@medbook.com` | `admin123` |

---

## 🔮 Roadmap & Future Improvements

*   [ ] **Payment Gateway:** Integration with Stripe to handle consultation fees upfront.
*   [ ] **Video Consultation:** WebRTC integration for direct doctor-patient video calls.
*   [ ] **Email Notifications:** Automated confirmation emails using Nodemailer.
*   [ ] **Patient Profiles:** User accounts for patients to track booking history.

---

## 🤝 Portfolio & Contact

**Developed by [Your Name]**

> This project was built to demonstrate advanced full-stack development skills, focusing on clean architecture, modern UI design, and responsive implementation.

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Site-2ea44f?style=for-the-badge&logo=google-chrome&logoColor=white)](https://yourportfolio.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)

<div align="center">
    <i>If you like this project, consider giving it a ⭐!</i>
</div>
