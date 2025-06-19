# 🧠 PORTFOLIO-PAGE
 Available in: [English](README.md) | [Türkçe](README.tr.md)
_Your Projects. Your Skills. All in One Place._

![Last Commit](https://img.shields.io/github/last-commit/yunuscanunal/portfolio_page?style=for-the-badge)
![Java](https://img.shields.io/badge/Backend-Java-blue?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7+-green?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-informational?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-blue?style=for-the-badge&logo=postgresql)

> Built using modern tools & technologies to showcase your personal software development portfolio.

---

## 🔎 Table of Contents

- [Overview](#overview)
- [Why Portfolio-Page?](#why-portfolio-page)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [License](#license)

---

## 📌 Overview

This full-stack portfolio app allows you to:
- Display your projects with links and images
- Manage them via a secure admin panel (JWT-auth protected)
- Easily deploy and showcase your skills with a professional frontend

---

## 💡 Why Portfolio-Page?

- ⚙️ **Modular Project Structure**: Clean separation of frontend and backend
- 🔐 **JWT Authentication**: Secure access for project CRUD operations
- 🧩 **React + TypeScript UI**: Responsive and modern design
- 🗃️ **PostgreSQL Integration**: Reliable relational data storage
- 🚀 **Production Ready**: Easily deployable on services like Render, Vercel or Railway

---

## 🛠 Tech Stack

### 🔙 Backend
- Java 17
- Spring Boot
- Spring Security + JWT
- Hibernate / JPA
- PostgreSQL

### 🔜 Frontend
- React
- TypeScript
- Axios
- React Router DOM

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yunuscanunal/portfolio_page.git
cd portfolio_page
```

### 2. Setup PostgreSQL
Create a database named `portfolio_db` and update your `application.properties`.

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio_db
spring.datasource.username=your_user
spring.datasource.password=your_password
jwt.secret=your_jwt_secret
```

### 3. Run Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 4. Run Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| GET    | `/api/projects`      | List all projects         |
| POST   | `/api/projects`      | Add new project (auth)    |
| DELETE | `/api/projects/{id}` | Delete project (auth)     |
| POST   | `/api/auth/login`    | Obtain JWT token          |

---

## 🖼️ Screenshots

_Add your own UI screenshots here for visual context._

---

## 🪪 License

This project is open-source and available under the [MIT License](LICENSE).
