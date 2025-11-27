import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useGlobal } from "../context/GlobalContext";

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
    // Backend'den projeleri çek
    fetch("http://localhost:8080/api/projects")
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
          <div className="text-center font-mono text-gray-500">
            Scanning Database...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Backend'den gelen veriyi göster */}
            {projects.map((p, index) => (
              <ProjectCard
                key={index}
                title={p.title}
                desc={p.description}
                tech={p.techStack}
                theme={theme}
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
