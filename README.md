# MERN Stack Survey Application

A full-stack survey submission application built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **TypeScript**.

The backend is engineered using **Clean Architecture** principles and **Dependency Injection** (InversifyJS) to ensure scalability, testability, and separation of concerns.

🔗 **Live Demo:** [https://survey-app-chi-gilt.vercel.app/](https://survey-app-chi-gilt.vercel.app/)

## 🚀 Features

* **User Side:**
    * Responsive Survey Form (Name, Email, Address, etc.).
    * Real-time form validation.
    * Success feedback upon submission.
* **Admin Side:**
    * Secure Admin Login.
    * Dashboard to view a list of all survey submissions.
* **Technical Highlights:**
    * **Clean Architecture** on the backend (Domain, Application, Infrastructure, Presentation layers).
    * **Dependency Injection** using InversifyJS.
    * **TypeScript** for type safety across the full stack.
    * **Responsive UI** using Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios
* **Routing:** React Router DOM

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB & Mongoose
* **Architecture:** Clean Architecture (Onion Architecture)
* **DI Container:** InversifyJS & Reflect Metadata

---

## 📂 Project Structure

The project is divided into two main folders:

```text
survey-app/
├── backend/            # Express Server (Clean Architecture)
│   ├── src/
│   │   ├── Core/       # Domain & Application Layers (Pure Logic)
│   │   ├── Infrastructure/ # DB & External Services
│   │   └── Presentation/   # Controllers & Routes
├── frontend/           # React Client
└── README.md
```


## ⚙️ Local Setup & Installation

Follow these steps to run the application locally.

### 1. Clone the Repository

git clone https://github.com/Moosabilal/survey-app.git
cd survey-app

### 2. Backend Setup

* **Navigate to the backend folder, install dependencies, and start the server.** *

cd backend
npm install

* **Create a .env file in the backend directory with the following variables:** *

PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key_here

* **Run the Backend:** *

npm run dev

* **The server will start on http://localhost:5000** *

### 3. Frontend Setup

* **Open a new terminal, navigate to the frontend folder, install dependencies, and start the client.** *

cd ../frontend
npm install

* **Create a .env file in the frontend directory:** *

VITE_API_URL=http://localhost:5000/api

* **Run the Frontend:** *

npm run dev

* **The client will start on http://localhost:5173** *
