import { motion } from "framer-motion";
import TechScene from "./TechScene";
import { useGlobal } from "../context/GlobalContext";

const About = () => {
  const { t, theme } = useGlobal();

  // Renkleri statik array'den atayalım çünkü translations dosyasında sadece text var
  const colors = ["bg-cyber-primary", "bg-cyber-secondary", "bg-cyber-accent"];

  return (
    <section
      id="about"
      className={`py-20 relative transition-colors duration-500 ${
        theme === "light" ? "bg-white" : "bg-cyber-black"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Sol Taraf: 3D Sahne */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center relative"
          >
            {/* Glow efekti (Sadece Dark Mode'da görünsün) */}
            {theme === "dark" && (
              <div className="absolute inset-0 bg-cyber-primary/10 blur-[100px] rounded-full pointer-events-none" />
            )}
            <TechScene />
          </motion.div>

          {/* Sağ Taraf: İçerik */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2
              className={`text-3xl md:text-4xl font-sans font-bold mb-6 flex items-center gap-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              <span
                className={
                  theme === "dark" ? "text-cyber-secondary" : "text-purple-600"
                }
              >
                01.
              </span>
              {t.about.title}
            </h2>

            <div
              className={`p-6 rounded-xl backdrop-blur-sm border transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-cyber-gray/40 border-white/10 text-gray-300"
                  : "bg-gray-50 border-gray-200 text-gray-600"
              }
            `}
            >
              <p className="font-mono mb-6 leading-relaxed">
                {t.about.description}
              </p>

              {/* Stats Bars */}
              <div className="space-y-4">
                {t.about.stats.map((stat, index) => (
                  <div key={index}>
                    <div
                      className={`flex justify-between text-xs font-mono mb-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <span>{stat.label}</span>
                      <span>{stat.value}%</span>
                    </div>
                    <div
                      className={`h-2 w-full rounded-full overflow-hidden border ${
                        theme === "dark"
                          ? "bg-black border-white/10"
                          : "bg-gray-200 border-gray-300"
                      }`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${colors[index]} shadow-[0_0_10px_currentColor]`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
