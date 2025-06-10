import React, { useState, useEffect } from "react";
import "./ProjectsSection.css";
import { FaGithub, FaGlobe } from "react-icons/fa";

type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  image?: string;
  codeLink?: string;
  liveLink?: string;
};

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then((res) => res.json())
      .then((data) => {
        // Gelen veriye sahte alanları ekleyerek dönüyoruz
        const enriched = data.map((p: any, index: number) => ({
          id: index + 1,
          title: p.title,
          description: p.description,
          link: p.link,
          image:
            "https://via.placeholder.com/600x400?text=" +
            encodeURIComponent(p.title),
          codeLink: p.link,
          liveLink: p.link,
        }));
        setProjects(enriched);
      })
      .catch((err) => {
        console.error("Veri alınırken hata:", err);
      });
  }, []);

  const handleButtonClick = (projectId: number, link: string) => {
    if (!link || link === "#") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [projectId]: "This link is not available. Please try again later.",
      }));

      // Hata mesajını 3 saniye sonra temizle
      setTimeout(() => {
        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[projectId];
          return updatedErrors;
        });
      }, 5000);
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-row ${
              index % 2 === 0 ? "row-normal" : "row-reverse"
            }`}
          >
            <div className="project-info">
              <h3 className="project-title">Featured Project</h3>
              <h2 className="project-name">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <div className="project-buttons">
                <button
                  className="btn icon-btn"
                  onClick={() =>
                    handleButtonClick(project.id, project.codeLink || "")
                  }
                >
                  <FaGithub size={50} />
                </button>
                <button
                  className="btn icon-btn"
                  onClick={() =>
                    handleButtonClick(project.id, project.liveLink || "")
                  }
                >
                  <FaGlobe size={50} />
                </button>
              </div>
              {errors[project.id] && (
                <div className="error-message">
                  <span>⚠️</span> {errors[project.id]}
                </div>
              )}
            </div>
            <div className="project-image-container">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
