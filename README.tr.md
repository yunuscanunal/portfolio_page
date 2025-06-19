# 🧠 PORTFOLIO-PAGE

_Projelerinizi, becerilerinizi ve deneyimlerinizi tek bir yerde sergileyin._

![Son Güncelleme](https://img.shields.io/github/last-commit/yunuscanunal/portfolio_page?style=for-the-badge)
![Java](https://img.shields.io/badge/Backend-Java-blue?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7+-green?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-informational?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-blue?style=for-the-badge&logo=postgresql)

> Yazılım geliştirici portföyümü sergilemek için modern araçlarla geliştirilmiş bir tam yığın uygulama.

---

## 🔎 İçindekiler

- [Genel Bakış](#genel-bakış)
- [Neden Portfolio-Page?](#neden-portfolio-page)
- [Teknolojiler](#teknolojiler)
- [Kurulum](#kurulum)
- [API Uç Noktaları](#api-uç-noktaları)
- [Ekran Görüntüleri](#ekran-görüntüleri)
- [Lisans](#lisans)

---

## 📌 Genel Bakış

Bu tam yığın portföy uygulaması ile:
- Projelerinizi başlık, açıklama ve bağlantılarla sergileyin
- Güvenli JWT kimlik doğrulama ile yeni projeler ekleyin / silin
- Modern ve responsive bir arayüz ile kendinizi tanıtın

---

## 💡 Neden Portfolio-Page?

- ⚙️ **Modüler Yapı**: Frontend ve backend temiz şekilde ayrılmıştır
- 🔐 **JWT Kimlik Doğrulama**: Proje işlemleri koruma altında
- 🧩 **React + TypeScript Arayüz**: Modern ve kullanıcı dostu tasarım
- 🗃️ **PostgreSQL Entegrasyonu**: Güvenilir veri saklama
- 🚀 **Yayına Hazır**: Render, Vercel, Railway gibi platformlara deploy edilebilir

---

## 🛠 Teknolojiler

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

## 🚀 Kurulum

### 1. Depoyu klonlayın
```bash
git clone https://github.com/yunuscanunal/portfolio_page.git
cd portfolio_page
```

### 2. PostgreSQL Veritabanı Oluşturun
`portfolio_db` isimli bir veritabanı oluşturun ve `application.properties` dosyasını düzenleyin:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio_db
spring.datasource.username=veritabani_kullanici_adi
spring.datasource.password=veritabani_parola
jwt.secret=gizli_jwt_anahtariniz
```

### 3. Backend’i Başlatın
```bash
cd backend
./mvnw spring-boot:run
```

### 4. Frontend’i Başlatın
```bash
cd frontend
npm install
npm start
```

---

## 📡 API Uç Noktaları

| Yöntem | Endpoint              | Açıklama                   |
|--------|------------------------|-----------------------------|
| GET    | `/api/projects`       | Tüm projeleri getirir       |
| POST   | `/api/projects`       | Yeni proje ekler (auth)     |
| DELETE | `/api/projects/{id}`  | Proje siler (auth)          |
| POST   | `/api/auth/login`     | JWT token alımı             |

---

## 🖼️ Ekran Görüntüleri

_Arayüzden ekran görüntüleri burada yer alabilir._

---

## 🪪 Lisans

Bu proje açık kaynaklıdır ve [MIT Lisansı](LICENSE) ile sunulmaktadır.
