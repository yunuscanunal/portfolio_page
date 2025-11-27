import { useGlobal } from "../context/GlobalContext";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { t, theme } = useGlobal();

  // Linkler genelde sabittir, çeviriye koymaya gerek yok ama istenirse oraya da alınabilir
  const socialLinks = [
    {
      icon: <FaLinkedin size={20} />,
      href: "https://linkedin.com/in/yunuscanunal",
      label: "LinkedIn",
    },
    {
      icon: <FaGithub size={20} />,
      href: "https://github.com/yunuscanunal",
      label: "GitHub",
    },
    {
      icon: <FaInstagram size={20} />,
      href: "https://instagram.com/yunuscanunal",
      label: "Instagram",
    },
  ];

  return (
    <footer
      className={`border-t py-12 text-center relative z-10 transition-colors duration-500
      ${
        theme === "dark"
          ? "border-white/10 bg-cyber-dark text-gray-500"
          : "border-gray-200 bg-gray-100 text-gray-600"
      }
    `}
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        {/* Social Links */}
        <div className="flex gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`transition-all duration-300 transform hover:scale-110 hover:-translate-y-1
                ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-cyber-primary hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
                    : "text-gray-600 hover:text-blue-600"
                }
              `}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Copyright & Status */}
        <div className="space-y-2">
          <p className="text-sm font-mono">
            © {new Date().getFullYear()} YUNUSCAN UNAL.
            <span
              className={`ml-2 ${
                theme === "dark" ? "text-cyber-primary" : "text-blue-600"
              }`}
            >
              {t.footer.status}
            </span>
          </p>
          <p className="text-xs opacity-60 font-mono">{t.footer.designed}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
