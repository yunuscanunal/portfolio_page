# 🧠 PORTFOLIO-PAGE

📄 Available in: [English](README.md) | [Türkçe](README.tr.md)

_Projelerinizi ve becerilerinizi güvenli bir şekilde sergileyin._

![Son Güncelleme](https://img.shields.io/github/last-commit/yunuscanunal/portfolio_page?style=for-the-badge)
![CI/CD](https://img.shields.io/github/actions/workflow/status/yunuscanunal/portfolio_page/ci-cd.yml?style=for-the-badge)
![Java](https://img.shields.io/badge/Backend-Java-blue?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7+-green?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Docker](https://img.shields.io/badge/Dockerize-Edilmiş-informational?style=for-the-badge&logo=docker)
![TypeScript](https://img.shields.io/badge/TypeScript-Katı-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Uyumlu-blue?style=for-the-badge&logo=postgresql)

> Bu uygulama geliştiricilerin projelerini modern bir arayüz ve güvenli bir sistemle sunmasına yardımcı olur.

---

## 📑 İçindekiler

- [Genel Bakış](#genel-bakış)
- [Neden Portfolio-Page?](#neden-portfolio-page)
- [Teknolojiler](#teknolojiler)
- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [API Uç Noktaları](#api-uç-noktaları)
- [Docker Kullanımı](#docker-kullanımı)
- [Lisans](#lisans)

---

## 📌 Genel Bakış

Bu tam yığın uygulama sayesinde:
- Projelerinizi listeleyebilir
- Güvenli giriş sistemiyle yeni projeler ekleyebilirsiniz
- Modern frontend sayesinde sergileyebilirsiniz

---

## 💡 Neden Portfolio-Page?

- 🧩 **Tam Yığın ve Modüler Yapı**
- 🔐 **JWT Kimlik Doğrulama & Rate Limiting**
- 🐳 **Docker Desteği (Frontend + Backend)**
- 🔄 **CI/CD ile Otomatik Deploy**
- 📦 **Yeniden Kullanılabilir API Yapısı**

---

## 🛠 Teknolojiler

### Backend
- Java 17, Spring Boot, Spring Security, JWT
- PostgreSQL, Hibernate
- Docker

### Frontend
- React + TypeScript
- Axios, Router DOM
- Docker + NGINX

---

## ✨ Özellikler

- Proje listeleme, ekleme, silme (korumalı)
- JWT ile kullanıcı girişi
- Global hata yakalama
- API Rate Limiting

---

## 🚀 Kurulum

### 1. Depoyu klonla
```bash
git clone https://github.com/yunuscanunal/portfolio_page.git
cd portfolio_page
```

### 2. Docker ile çalıştır
```bash
docker-compose up --build
```

- Frontend: [http://localhost:80](http://localhost:80)
- Backend: [http://localhost:8080](http://localhost:8080)

### 3. Manuel Çalıştırmak İstersen

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

## 📡 API Uç Noktaları

| Yöntem | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/projects` | Projeleri listele |
| POST | `/api/projects` | Yeni proje ekle (Auth gerekli) |
| DELETE | `/api/projects/{id}` | Proje sil (Auth gerekli) |
| POST | `/api/auth/login` | Giriş yap ve token al |

---

## 🐳 Docker Kullanımı

- Frontend ve backend izole konteynerlerde çalışır
- Frontend, NGINX üzerinden sunulur
- `docker-compose.yml` ana dizinde yer alır

---

## 🪪 Lisans

Bu proje MIT lisansı ile sunulmaktadır.
