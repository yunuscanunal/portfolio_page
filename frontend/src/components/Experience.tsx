import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { useGlobal } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api/config";

// Backend'den gelen veri tipi
interface ExperienceData {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  techStack: string[];
}

const Experience = () => {
  const { t, theme } = useGlobal();
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/experiences`) // <-- Güncellendi      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="experience"
      className={`py-20 relative transition-colors duration-500 ${
        theme === "light" ? "bg-gray-50" : "bg-cyber-black"
      }`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-sans font-bold mb-12 text-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <span
            className={
              theme === "dark" ? "text-cyber-primary" : "text-blue-600"
            }
          >
            02.
          </span>{" "}
          {t.experience.title}
        </motion.h2>

        <div
          className={`relative border-l-2 ml-4 md:ml-10 space-y-12 ${
            theme === "dark" ? "border-white/10" : "border-gray-300"
          }`}
        >
          {loading && (
            <div className="pl-12 text-gray-500 font-mono">
              Loading Experiences...
            </div>
          )}

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-all duration-300
                ${
                  theme === "dark"
                    ? "bg-cyber-black border-cyber-primary group-hover:bg-cyber-primary group-hover:shadow-neon-blue"
                    : "bg-white border-blue-600 group-hover:bg-blue-600"
                }
              `}
              />

              <div
                className={`p-6 rounded-lg border backdrop-blur-sm transition-all duration-300
                ${
                  theme === "dark"
                    ? "bg-cyber-gray/30 border-white/5 hover:border-cyber-primary/30 hover:bg-cyber-gray/50 text-white"
                    : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-md text-gray-800"
                }
              `}
              >
                <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                  <div>
                    <h3
                      className={`text-xl font-bold transition-colors ${
                        theme === "dark"
                          ? "group-hover:text-cyber-primary"
                          : "group-hover:text-blue-600"
                      }`}
                    >
                      {exp.role}
                    </h3>
                    <span
                      className={`font-mono text-sm flex items-center gap-2 ${
                        theme === "dark"
                          ? "text-cyber-secondary"
                          : "text-purple-600"
                      }`}
                    >
                      <FaBriefcase className="text-xs" /> {exp.company}
                    </span>
                  </div>
                  <div
                    className={`font-mono text-xs flex items-center gap-2 px-3 py-1 rounded-full border 
                    ${
                      theme === "dark"
                        ? "text-gray-500 bg-black/40 border-white/5"
                        : "text-gray-600 bg-gray-100 border-gray-200"
                    }
                  `}
                  >
                    <FaCalendarAlt /> {exp.period}
                  </div>
                </header>

                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((t, i) => (
                    <span
                      key={i}
                      className={`text-xs font-mono px-2 py-1 rounded border
                      ${
                        theme === "dark"
                          ? "text-cyber-primary/80 bg-cyber-primary/10 border-cyber-primary/10"
                          : "text-blue-700 bg-blue-50 border-blue-100"
                      }
                    `}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {!loading && experiences.length === 0 && (
            <div className="pl-12 text-gray-500 font-mono">
              No experience records found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
