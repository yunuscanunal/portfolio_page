import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import { useGlobal } from "../context/GlobalContext";

const Hero = () => {
  const { t, theme } = useGlobal();

  return (
    <section
      className={`h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        theme === "light" ? "bg-cyber-light" : "bg-cyber-black"
      }`}
    >
      {/* Arkaplan Efektleri */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10
        ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-accent/20 via-cyber-black to-cyber-black"
            : "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/40 via-gray-100 to-white"
        }
      `}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10 px-4"
      >
        <h2
          className={`font-mono text-lg md:text-xl mb-4 tracking-widest ${
            theme === "dark" ? "text-cyber-primary" : "text-cyber-accent"
          }`}
        >
          {t.hero.greeting}
        </h2>

        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold font-sans mb-6 relative inline-block ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <span
            className={`absolute -inset-1 blur-xl ${
              theme === "dark" ? "bg-cyber-primary/20" : "bg-blue-400/10"
            }`}
          ></span>
          <span
            className={`relative ${
              theme === "dark"
                ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                : ""
            }`}
          >
            FULL STACK
          </span>
          <br />
          <span
            className={`text-transparent bg-clip-text animate-pulse
            ${
              theme === "dark"
                ? "bg-gradient-to-r from-cyber-primary via-white to-cyber-secondary"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            }
          `}
          >
            DEVELOPER
          </span>
        </h1>

        <div
          className={`text-lg md:text-2xl font-mono mt-4 h-16 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <Typewriter
            options={{
              strings: t.hero.typewriter,
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-10">
          {/* Main CTA */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow:
                theme === "dark"
                  ? "0 0 20px rgba(0, 243, 255, 0.6)"
                  : "0 0 20px rgba(112, 0, 255, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className={`px-8 py-3 font-mono rounded-sm border transition-all duration-300
              ${
                theme === "dark"
                  ? "bg-transparent border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black"
                  : "bg-transparent border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-white"
              }
            `}
          >
            {t.hero.cta}
          </motion.button>

          {/* Social Links & CV */}
          <div className="flex gap-4">
            <motion.a
              href="https://github.com/yunuscanunal"
              target="_blank"
              whileHover={{ y: -5 }}
              className={`p-3 rounded-full border transition-colors
                ${
                  theme === "dark"
                    ? "border-white/20 text-white hover:border-white hover:bg-white/10"
                    : "border-black/20 text-black hover:border-black hover:bg-black/5"
                }
              `}
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/yunuscanunal"
              target="_blank"
              whileHover={{ y: -5 }}
              className={`p-3 rounded-full border transition-colors
                ${
                  theme === "dark"
                    ? "border-white/20 text-white hover:border-blue-500 hover:text-blue-500 hover:bg-white/10"
                    : "border-black/20 text-black hover:border-blue-600 hover:text-blue-600 hover:bg-black/5"
                }
              `}
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/1sdfUVdJ93VwHcY45x4weg44IhuX6NAQ9/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors font-mono text-sm
                ${
                  theme === "dark"
                    ? "border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary/10"
                    : "border-pink-600 text-pink-600 hover:bg-pink-50"
                }
              `}
            >
              <FaFileDownload />
              {t.hero.cv}
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Dekoratif Izgara */}
      <div
        className={`absolute bottom-0 w-full h-1/3 bg-gradient-to-t pointer-events-none
        ${
          theme === "dark"
            ? "from-cyber-primary/5 to-transparent"
            : "from-blue-500/5 to-transparent"
        }
      `}
      />
      <div className="absolute w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 ${
            theme === "dark" ? "border-cyber-primary" : "border-blue-600"
          }`}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={`w-1 h-2 rounded-full ${
              theme === "dark" ? "bg-cyber-primary" : "bg-blue-600"
            }`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
