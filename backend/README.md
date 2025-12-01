# 🛡️ Portfolio Backend API

> **[🇹🇷 Türkçe İçerik için Tıklayın / Click here for Turkish](./README.tr.md)**

This directory houses the RESTful API services of the portfolio, built with **Java Spring Boot**. It serves as the secure core for data management, handling authentication and database operations.

## 🏛 System Architecture

The backend is designed as a stateless REST API, prioritizing security and reliability.

### Security Layers

- **JWT Authentication:** Uses stateless JSON Web Tokens to secure Admin endpoints (`POST`, `PUT`, `DELETE`). The token is validated via a custom filter before reaching controllers.
- **Rate Limiting:** Implements **Bucket4j** to throttle requests based on IP address, protecting the system against brute-force and DDoS attacks. It effectively handles proxy headers (e.g., `X-Forwarded-For`) for accurate client identification.
- **CORS Policy:** Features a dynamic Cross-Origin Resource Sharing configuration that strictly allows requests only from trusted domains (e.g., the Vercel frontend).

### Data Management

- **PostgreSQL:** Utilized as the primary relational database for storing Projects, Experiences, and User credentials.
- **JPA/Hibernate:** Manages object-relational mapping, ensuring efficient data access and transaction management.
- **Data Seeding:** Includes a startup routine that checks for the existence of an Admin user and automatically seeds one if missing, ensuring the system is always ready for management.

## 📡 API Capabilities

The API exposes endpoints to manage the portfolio content dynamically:

- **Public Access:**
  - Fetching all Projects.
  - Fetching all Experience logs.
- **Admin Access (Authenticated):**
  - Login & Token Generation.
  - Creating, Updating, and Deleting Projects.
  - Creating, Updating, and Deleting Experiences.

## 🛠 Tech Stack

| Category       | Technology                              |
| :------------- | :-------------------------------------- |
| **Framework**  | Spring Boot 3                           |
| **Language**   | Java 17                                 |
| **Database**   | PostgreSQL                              |
| **ORM**        | Hibernate / Spring Data JPA             |
| **Security**   | Spring Security, JJWT (io.jsonwebtoken) |
| **Throttling** | Bucket4j                                |
