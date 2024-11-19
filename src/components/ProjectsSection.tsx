import React, { useState } from "react";
import "./ProjectsSection.css";
import { FaGithub, FaGlobe } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Example Project 1",
    description:
      "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played songs, and detailed audio information for each track.",
    image: "https://via.placeholder.com/600x400?text=Example+Project+1",
    codeLink: "",
    liveLink: "",
  },
  {
    id: 2,
    title: "Example Project 2",
    description:
      "A platform for managing tasks and collaborating with team members. Includes features like kanban boards and real-time notifications.",
    image: "https://via.placeholder.com/600x400?text=Example+Project+2",
    codeLink: "",
    liveLink: "#",
  },
  {
    id: 3,
    title: "Example Project 3",
    description:
      "An e-commerce site with product listings, payment integration, and a smooth user experience.",
    image: "https://via.placeholder.com/600x400?text=Example+Project+3",
    codeLink: "",
    liveLink: "",
  },
  {
    id: 4,
    title: "Example Project 4",
    description:
      "A machine learning app for predicting stock prices based on historical data. Provides insightful visualizations and predictions.",
    image: "https://via.placeholder.com/600x400?text=Example+Project+4",
    codeLink: "",
    liveLink: "",
  },
];

const ProjectsSection: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

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
                    handleButtonClick(project.id, project.codeLink)
                  }
                >
                  <FaGithub size={50} />
                </button>
                <button
                  className="btn icon-btn"
                  onClick={() =>
                    handleButtonClick(project.id, project.liveLink)
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
