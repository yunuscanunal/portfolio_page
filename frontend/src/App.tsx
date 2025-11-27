import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import { GlobalProvider } from "./context/GlobalContext";

function AppContent() {
  return (
    <div className="min-h-screen transition-colors duration-500 dark:bg-cyber-black dark:text-white bg-white text-gray-900 selection:bg-cyber-primary selection:text-black overflow-x-hidden">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
