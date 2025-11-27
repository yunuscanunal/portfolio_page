// Bu dosya, uygulamanın hangi ortamda çalıştığına karar verir.
// Eğer Vercel'de ise oradaki tanımlı adresi, localde ise localhost'u kullanır.

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";
