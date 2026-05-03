# 🎓 Student Performance Prediction System

## 📌 Project Overview

The **Student Performance Prediction System** is a full stack web application designed to predict whether a student will pass or fail based on attendance and study hours.

It integrates **frontend, backend, database, and machine learning** into one complete system.

---

## 🎯 Objectives

* Develop a full stack application
* Implement authentication system
* Integrate ML model
* Store prediction history
* Provide dashboard with analytics

---

## 🚀 Features

### 🔐 Authentication Features

* User Registration
* Secure Login (JWT)
* Protected Routes

### 📊 Dashboard Features

* Prediction form
* Real-time results
* History table
* Statistics (Total, Pass, Fail)
* Charts visualization

### 🧠 Machine Learning Features

* Logistic Regression model
* Inputs:

  * Attendance
  * Study Hours
* Output:

  * Pass / Fail

### 🗄️ Database Features

* Stores users
* Stores predictions

---

## 🛠️ Tech Stack

### 🎨 Frontend Technologies

* React.js
* Material UI
* Recharts

### ⚙️ Backend Technologies

* Node.js
* Express.js

### 🗄️ Database

* MongoDB (Mongoose)

### 🤖 Machine Learning

* Python
* Scikit-learn

---

## 🧱 Project Structure

```plaintext
student-performance/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   └── ProtectedRoute.js
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Prediction.js
│   └── app.js
│
├── model/
│   ├── train.py
│   └── predict.py
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 Prerequisites

* Node.js
* MongoDB
* Python 3.x

---

### 🔹 Backend Setup

```bash
cd server
npm install
node app.js
```

Server runs on:

```plaintext
http://localhost:5000
```

---

### 🔹 Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on:

```plaintext
http://localhost:3000
```

---

### 🔹 Machine Learning Setup

```bash
cd model
python train.py
```

---

## 🔗 API Endpoints

### 🔐 Authentication APIs

* `POST /register`
* `POST /login`

### 📊 Prediction API

* `POST /predict`

### 📁 History API

* `GET /history`

---

## 🧠 Machine Learning Model Details

* Algorithm: Logistic Regression
* Features:

  * Attendance (%)
  * Study Hours
* Output:

  * Pass / Fail

Model is stored using `pickle`.

---

## 📊 Dashboard Functionality

* Input form
* Result display
* History table
* Statistics summary
* Chart visualization

---

## 🔐 Security Features

* Password hashing (bcrypt)
* JWT authentication
* Protected routes

---

## 📷 Screenshots

*Add these in your repo:*

* Login Page
* Register Page
* Dashboard
* Chart View

---

## 🌐 Deployment

### Frontend Deployment

* Vercel

### Backend Deployment

* Render

### Database Deployment

* MongoDB Atlas

---

## ⚠️ Limitations

* Small dataset
* Basic ML model
* Can improve UI

---

## 🔮 Future Enhancements

* More input features
* Better ML model
* Admin panel
* PDF reports
* Advanced analytics

---

## 👨‍💻 Author

**Shlok Gupta Ritesh**
**Suchit Tyagi**

---

## 📜 License

This project is for academic purposes only.
