import React, { useState, useEffect } from "react";
import "./ProjectsSection.css";

interface Project {
  id: number;
  title: string;
  description: string;
  link?: string;
  image?: string;
  codeLink?: string;
  liveLink?: string;
}

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
      <h3 className="project-title">Featured Project</h3>
      <div className="projects-container">
        {projects.map((project, idx) => (
          <div
            className={`project-row ${idx % 2 === 1 ? "row-reverse" : ""}`}
            key={project.id}
          >
            <div className="project-info">
              <div className="project-name">{project.title}</div>
              <div className="project-description">{project.description}</div>
              <div className="project-buttons">
                <button
                  className="btn"
                  onClick={() =>
                    handleButtonClick(project.id, project.codeLink || "#")
                  }
                  title="View Code"
                >
                  &lt;/&gt;
                </button>
                <button
                  className="btn"
                  onClick={() =>
                    handleButtonClick(project.id, project.liveLink || "#")
                  }
                  title="View Live"
                >
                  &#128065;
                </button>
              </div>
              {errors[project.id] && (
                <div className="error-message">
                  <span className="error-icon">!</span>
                  {errors[project.id]}
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
