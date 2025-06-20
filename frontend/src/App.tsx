import React from "react";
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

function App() {
  const token = localStorage.getItem("token");

  return (
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
  );
}

export default App;
