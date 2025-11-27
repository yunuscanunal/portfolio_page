import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import { useGlobal } from "../context/GlobalContext";

const Navbar = () => {
  const { t, theme, toggleTheme, language, toggleLanguage } = useGlobal();
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigasyon öğelerini çeviriden al
  const navItems = [
    { id: "Home", label: t.nav.home },
    { id: "About", label: t.nav.about },
    { id: "Experience", label: t.nav.experience },
    { id: "Projects", label: t.nav.projects },
    { id: "Contact", label: t.nav.contact },
  ];

  const scrollToSection = (id: string) => {
    setActive(id);
    setIsOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4 md:py-6"
        }`}
      >
        <div className="flex justify-center px-4">
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`w-full max-w-6xl backdrop-blur-md border rounded-full px-6 py-3 shadow-lg flex justify-between items-center relative
              ${
                theme === "dark"
                  ? "bg-cyber-gray/80 border-white/10"
                  : "bg-white/80 border-black/10 text-black"
              }
            `}
          >
            {/* Logo */}
            <div
              className={`font-sans font-bold text-xl tracking-tighter cursor-pointer ${
                theme === "dark" ? "text-cyber-primary" : "text-cyber-accent"
              }`}
              onClick={() => scrollToSection("Home")}
            >
              YU.
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.id} className="relative">
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`text-sm font-mono tracking-widest uppercase transition-colors duration-300 
                        ${
                          active === item.id
                            ? theme === "dark"
                              ? "text-cyber-primary drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
                              : "text-cyber-accent font-bold"
                            : theme === "dark"
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-black"
                        }`}
                    >
                      {`<${item.label} />`}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Toggles (Desktop) */}
              <div className="flex items-center gap-4 border-l pl-6 border-gray-500/30">
                <button
                  onClick={toggleTheme}
                  className={`transition-colors ${
                    theme === "dark"
                      ? "text-yellow-400 hover:text-yellow-200"
                      : "text-orange-500 hover:text-orange-700"
                  }`}
                >
                  {theme === "dark" ? (
                    <FaSun size={18} />
                  ) : (
                    <FaMoon size={18} />
                  )}
                </button>
                <button
                  onClick={toggleLanguage}
                  className={`flex items-center gap-1 font-mono text-xs ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  <FaGlobe size={16} />
                  <span>{language.toUpperCase()}</span>
                </button>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-4">
              {/* Mobile Toggles */}
              <button
                onClick={toggleTheme}
                className={
                  theme === "dark" ? "text-yellow-400" : "text-orange-500"
                }
              >
                {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>
              <button
                onClick={toggleLanguage}
                className={`font-mono text-xs ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {language.toUpperCase()}
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-colors ${
                  theme === "dark"
                    ? "text-white hover:text-cyber-primary"
                    : "text-black hover:text-cyber-accent"
                }`}
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </motion.nav>
        </div>
      </div>

      {/* Mobile Dropdown Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center pt-20
              ${
                theme === "dark"
                  ? "bg-cyber-black/95"
                  : "bg-white/95 text-black"
              }
            `}
          >
            <ul className="flex flex-col space-y-8 text-center">
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-2xl font-sans font-bold tracking-widest uppercase 
                      ${
                        active === item.id
                          ? theme === "dark"
                            ? "text-cyber-primary"
                            : "text-cyber-accent"
                          : theme === "dark"
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
