import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useGlobal } from "../context/GlobalContext";
import { API_BASE_URL } from "../api/config";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string; // Backend modelinde varsa ekle
  demoUrl?: string;
}

const ProjectsSection = () => {
  const { t, theme } = useGlobal();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Projeler yüklenemedi", err);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="projects"
      className={`py-20 relative transition-colors duration-500 ${
        theme === "light" ? "bg-white" : "bg-cyber-black"
      }`}
    >
      {/* Dekoratif Çizgi */}
      <div
        className={`absolute top-0 left-10 w-px h-full bg-gradient-to-b hidden md:block
        ${
          theme === "dark"
            ? "from-transparent via-cyber-primary/50 to-transparent"
            : "from-transparent via-blue-300 to-transparent"
        }
      `}
      ></div>

      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-sans font-bold text-center mb-16 relative z-10 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <span
            className={
              theme === "dark" ? "text-cyber-primary" : "text-blue-600"
            }
          >
            03.
          </span>{" "}
          {t.projects.title}
        </motion.h2>

        {loading ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-64 rounded-xl border animate-pulse ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-200 border-gray-300"
                }`}
              >
                <div className="h-full p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div
                      className={`h-6 w-1/2 rounded ${
                        theme === "dark" ? "bg-white/10" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-4 w-full rounded ${
                        theme === "dark" ? "bg-white/10" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-4 w-3/4 rounded ${
                        theme === "dark" ? "bg-white/10" : "bg-gray-300"
                      }`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div
                      className={`h-6 w-16 rounded ${
                        theme === "dark" ? "bg-white/10" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-6 w-16 rounded ${
                        theme === "dark" ? "bg-white/10" : "bg-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto px-4">
            {/* Backend'den gelen veriyi göster */}
            {projects.map((p, index) => (
              <ProjectCard
                key={index}
                title={p.title}
                desc={p.description}
                tech={p.techStack}
                theme={theme}
                githubUrl={p.githubUrl}
                demoUrl={p.demoUrl}
              />
            ))}

            {/* Eğer hiç proje yoksa mesaj göster */}
            {projects.length === 0 && (
              <div className="col-span-full text-center text-gray-500 font-mono py-10">
                No projects detected in the system.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
