# 🧠 PORTFOLIO-PAGE

📄 Available in: [English](README.md) | [Türkçe](README.tr.md)

_Your Projects. Your Skills. All in One Place._

![Last Commit](https://img.shields.io/github/last-commit/yunuscanunal/portfolio_page?style=for-the-badge)
![CI/CD](https://img.shields.io/github/actions/workflow/status/yunuscanunal/portfolio_page/ci-cd.yml?style=for-the-badge)
![Java](https://img.shields.io/badge/Backend-Java-blue?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7+-green?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Docker](https://img.shields.io/badge/Dockerized-Yes-informational?style=for-the-badge&logo=docker)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supported-blue?style=for-the-badge&logo=postgresql)

> Built using modern tools & technologies to showcase your portfolio and manage your projects securely.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Why Portfolio-Page?](#-why-portfolio-page)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Docker Usage](#-docker-usage)
- [License](#-license)

---

## 📌 Overview

This full-stack application helps developers:
- Showcase personal projects
- Add/remove/edit them securely via an admin panel
- View them through a modern, responsive frontend

---

## 💡 Why Portfolio-Page?

- 🧩 **Full-Stack Modular Design**
- 🔐 **JWT Authentication & Rate Limiting**
- 🐳 **Dockerized Services (Frontend + Backend)**
- 🔄 **CI/CD Workflow via GitHub Actions**
- 📦 **Reusable and Scalable Backend**

---

## 🛠 Tech Stack

### Backend
- Java 17, Spring Boot, Spring Security, JWT
- PostgreSQL, Hibernate
- Docker

### Frontend
- React + TypeScript
- Axios, Router DOM
- Docker + NGINX

---

## ✨ Features

- Project listing, creation, deletion (secured)
- User login via JWT
- Custom global exception handler
- Rate limiting filter (API protection)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yunuscanunal/portfolio_page.git
cd portfolio_page
```

### 2. Run with Docker
```bash
docker-compose up --build
```

- Frontend: [http://localhost:80](http://localhost:80)
- Backend: [http://localhost:8080](http://localhost:8080)

### 3. Or Run Manually

Backend:
```bash
cd backend
./mvnw spring-boot:run
```

Frontend:
```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create new project (Auth required) |
| DELETE | `/api/projects/{id}` | Delete project (Auth required) |
| POST | `/api/auth/login` | Login and receive token |

---

## 🐳 Docker Usage

- Runs both backend and frontend in isolated containers.
- NGINX serves the frontend.
- Uses `docker-compose.yml` at root.

---

## 🪪 License

This project is licensed under the MIT License.
