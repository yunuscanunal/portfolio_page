import React from "react";
import CustomNavbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import WorkExperience from "./components/WorkExperience";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import "./App.css";

function App() {
  return (
    <>
      <CustomNavbar />
      <ScrollToTop />
      <Hero />
      <Summary />
      <WorkExperience></WorkExperience>
      <SkillsSection></SkillsSection>
      <ProjectsSection></ProjectsSection>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
      >
        <ContactSection />
      </GoogleReCaptchaProvider>
      <Footer />
    </>
  );
}

export default App;
