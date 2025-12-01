# 🎨 Portfolio Frontend

> **[Click here for English / İngilizce İçerik için Tıklayın](./README.md)**

Bu klasör, portfolyo projesinin **React** ve **Vite** ile geliştirilmiş istemci tarafı uygulamasını içerir. Yüksek performanslı, fütüristik bir kullanıcı deneyimi sunmak ve akıcı 3D animasyonlar sağlamak üzere tasarlanmıştır.

## 🏗 Mimari ve Tasarım

Ön yüz mimarisi, tip güvenliği ve ölçeklenebilirlik için **TypeScript** kullanılarak bileşen tabanlı bir yapıda kurgulanmıştır.

### Temel Özellikler

- **Fütüristik Arayüz:** **Tailwind CSS** ve özel Cyberpunk estetiği kullanılarak çarpıcı bir görsel deneyim oluşturuldu.
- **3D Etkileşim:** Dijital dünyayı temsil eden interaktif "TechScene" küresi için **Three.js** (React Three Fiber) entegrasyonu yapıldı.
- **Akıcı Geçişler:** Sayfa geçişleri ve element animasyonları, pürüzsüz bir kullanıcı deneyimi için **Framer Motion** ile güçlendirildi.
- **Sunucusuz İletişim:** İletişim formu, özel bir mail sunucusu olmadan çalışır; doğrudan iletim için **EmailJS** ve bot koruması için **Google reCAPTCHA v2** kullanır.

### Önemli Bileşenler

- **`AdminPanel`:** Backend API ile haberleşerek dinamik içerikleri (Projeler ve Deneyimler) JWT güvenliği altında yöneten korumalı panel.
- **`GlobalContext`:** Çoklu dil desteği (TR/EN) ve Tema değişimi (Koyu/Açık) gibi uygulama genelindeki durumları yönetir ve kullanıcı tercihlerini saklar.
- **`ProjectCard`:** API'den çekilen portfolyo öğelerini sergilemek için kullanılan, yeniden kullanılabilir ve animasyonlu bileşen.

## 🛠 Teknoloji Yığını

| Kategori             | Teknoloji                        |
| :------------------- | :------------------------------- |
| **Çatı (Framework)** | React 19, Vite                   |
| **Dil**              | TypeScript                       |
| **Stil**             | Tailwind CSS, PostCSS            |
| **Animasyon**        | Framer Motion                    |
| **3D Grafik**        | Three.js, React Three Fiber/Drei |
| **Güvenlik**         | Google reCAPTCHA v2              |
