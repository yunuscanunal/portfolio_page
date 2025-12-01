# 🛡️ Portfolio Backend API

> **[Click here for English / İngilizce İçerik için Tıklayın](./README.md)**

Bu klasör, **Java Spring Boot** ile geliştirilmiş portfolyo RESTful API servislerini barındırır. Veri yönetimi, kimlik doğrulama ve veritabanı işlemleri için güvenli bir çekirdek görevi görür.

## 🏛 Sistem Mimarisi

Backend, güvenlik ve güvenilirliği ön planda tutan, durumsuz (stateless) bir REST API olarak tasarlanmıştır.

### Güvenlik Katmanları

- **JWT Kimlik Doğrulama:** Admin uç noktalarını (`POST`, `PUT`, `DELETE`) korumak için durumsuz JSON Web Token kullanır. Token, isteğin kontrolcülere ulaşmasından önce özel bir filtre ile doğrulanır.
- **Rate Limiting (Hız Sınırlama):** IP adresine dayalı istek sınırlaması için **Bucket4j** uygular; bu sayede sistemi kaba kuvvet (brute-force) ve DDoS saldırılarına karşı korur. Proxy başlıklarını (`X-Forwarded-For` vb.) işleyerek gerçek istemciyi doğru tespit eder.
- **CORS Politikası:** İsteklerin yalnızca güvenilir alan adlarından (örneğin Vercel ön yüzü) gelmesine izin veren dinamik bir yapılandırmaya sahiptir.

### Veri Yönetimi

- **PostgreSQL:** Projeler, Deneyimler ve Kullanıcı kimlik bilgilerini saklamak için birincil ilişkisel veritabanı olarak kullanılır.
- **JPA/Hibernate:** Nesne-ilişkisel eşlemeyi (ORM) yöneterek verimli veri erişimi ve işlem (transaction) güvenliği sağlar.
- **Veri Hazırlama (Seeding):** Başlangıçta Admin kullanıcısının varlığını kontrol eden ve yoksa otomatik olarak oluşturan bir rutin içerir, böylece sistem her zaman yönetime hazır hale gelir.

## 📡 API Yetenekleri

API, portfolyo içeriğini dinamik olarak yönetmek için şu uç noktaları sunar:

- **Halka Açık Erişim:**
  - Tüm Projeleri listeleme.
  - Tüm Deneyim kayıtlarını listeleme.
- **Admin Erişimi (Kimlik Doğrulamalı):**
  - Giriş Yapma & Token Üretme.
  - Proje Ekleme, Güncelleme ve Silme.
  - Deneyim Ekleme, Güncelleme ve Silme.

## 🛠 Teknoloji Yığını

| Kategori             | Teknoloji                               |
| :------------------- | :-------------------------------------- |
| **Çatı (Framework)** | Spring Boot 3                           |
| **Dil**              | Java 17                                 |
| **Veritabanı**       | PostgreSQL                              |
| **ORM**              | Hibernate / Spring Data JPA             |
| **Güvenlik**         | Spring Security, JJWT (io.jsonwebtoken) |
| **Hız Sınırlama**    | Bucket4j                                |
