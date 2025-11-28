import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectProps {
  title: string;
  desc: string;
  tech: string[];
  theme: string;
  githubUrl?: string; // Linkleri opsiyonel olarak ekledik
  demoUrl?: string;
}

const ProjectCard = ({
  title,
  desc,
  tech,
  theme,
  githubUrl,
  demoUrl,
}: ProjectProps) => {
  return (
    <motion.div whileHover={{ y: -10 }} className="relative group">
      {/* Arka Plan Parlaması */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500
        ${
          theme === "dark"
            ? "from-cyber-primary to-cyber-secondary"
            : "from-blue-400 to-purple-400"
        }
      `}
      ></div>

      <div
        className={`relative p-6 border rounded-xl h-full flex flex-col justify-between backdrop-blur-sm transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-cyber-gray border-white/10 text-white"
            : "bg-white border-gray-200 text-gray-900 shadow-sm"
        }
      `}
      >
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3
              className={`text-2xl font-sans font-bold transition-colors ${
                theme === "dark"
                  ? "group-hover:text-cyber-primary"
                  : "group-hover:text-blue-600"
              }`}
            >
              {title}
            </h3>
            <div
              className={`flex gap-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {/* GitHub Linki */}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  <FaGithub className="text-xl" />
                </a>
              )}

              {/* Demo Linki */}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${
                    theme === "dark" ? "hover:text-white" : "hover:text-black"
                  }`}
                >
                  <FaExternalLinkAlt className="text-lg" />
                </a>
              )}
            </div>
          </div>
          <p
            className={`font-mono text-sm mb-6 leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {desc}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tech.map((t, i) => (
            <span
              key={i}
              className={`text-xs font-mono px-2 py-1 rounded border
              ${
                theme === "dark"
                  ? "text-cyber-secondary border-cyber-secondary/30 bg-cyber-secondary/10"
                  : "text-purple-600 border-purple-200 bg-purple-50"
              }
            `}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
