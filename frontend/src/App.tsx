import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomNavbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import WorkExperience from "./components/WorkExperience";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import "./App.css";

// Dil context'i
export const translations = {
  tr: {
    adminPanel: "Admin Panel - Yeni Proje Ekle / Düzenle",
    login: "Giriş Yap",
    home: "Anasayfa",
    loading: "Yükleniyor...",
    save: "Kaydet (Güncelle)",
    addProject: "➕ Proje Ekle",
    username: "Kullanıcı Adı",
    password: "Şifre",
    loginError: "Hatalı kullanıcı adı veya şifre",
    linkNotAvailable:
      "Bu link şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
    featuredProject: "Öne Çıkan Proje",
    titlePlaceholder: "Proje Başlığı",
    descriptionPlaceholder: "Proje Açıklaması",
    imagePlaceholder: "Görsel URL (opsiyonel)",
    codeLinkPlaceholder: "Kod Linki (opsiyonel)",
    liveLinkPlaceholder: "Canlı Link (opsiyonel)",
    // ... diğer metinler ...
  },
  en: {
    adminPanel: "Admin Panel - Add / Edit Project",
    login: "Login",
    home: "Home",
    loading: "Loading...",
    save: "Save (Update)",
    addProject: "➕ Add Project",
    username: "Username",
    password: "Password",
    loginError: "Invalid username or password",
    linkNotAvailable: "This link is not available. Please try again later.",
    featuredProject: "Featured Project",
    titlePlaceholder: "Project Title",
    descriptionPlaceholder: "Project Description",
    imagePlaceholder: "Image URL (optional)",
    codeLinkPlaceholder: "Code Link (optional)",
    liveLinkPlaceholder: "Live Link (optional)",
    // ... diğer metinler ...
  },
} as const;

export type LangContextType = {
  lang: keyof typeof translations;
  setLang: (l: keyof typeof translations) => void;
  t: (k: keyof (typeof translations)["tr"]) => string;
};
export const LangContext = createContext<LangContextType>({
  lang: "tr",
  setLang: () => {},
  t: (k) => k,
});
export type ThemeContextType = { dark: boolean; toggle: () => void };
export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggle: () => {},
});

function App() {
  const [lang, setLang] = useState<keyof typeof translations>("tr");
  const [dark, setDark] = useState(true);

  const t = (k: keyof (typeof translations)["tr"]) =>
    translations[lang][k] || k;

  const handleSetLang = (newLang: keyof typeof translations) => {
    console.log("Dil değiştiriliyor:", newLang);
    setLang(newLang);
  };

  const handleToggleTheme = () => {
    console.log("Tema değiştiriliyor...");
    setDark((d) => !d);
  };

  React.useEffect(() => {
    console.log("Tema state değişti:", dark);
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const token = localStorage.getItem("token");

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      <ThemeContext.Provider value={{ dark, toggle: handleToggleTheme }}>
        <Router>
          <Routes>
            {/* Ana sayfa tüm bileşenleri içeriyor */}
            <Route
              path="/"
              element={
                <>
                  <CustomNavbar />
                  <ScrollToTop />
                  <Hero />
                  <Summary />
                  <WorkExperience />
                  <SkillsSection />
                  <ProjectsSection />
                  <GoogleReCaptchaProvider
                    reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
                  >
                    <ContactSection />
                  </GoogleReCaptchaProvider>
                  <Footer />
                </>
              }
            />
            {/* Admin Login Sayfası */}
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* Korunan Admin Panel */}
            <Route
              path="/admin/dashboard"
              element={
                token ? <AdminPanel /> : <Navigate to="/admin/login" replace />
              }
            />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export default App;
