import React from "react";
import "./WorkExperience.css";
// import icon1 from "../assets/icon1.png";
// import icon2 from "../assets/icon2.png";
// import icon3 from "../assets/icon3.png";
// import icon4 from "../assets/icon4.png";
import { FaCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";

const experiences = [
  {
    id: 1,
    title: "Backend Developer",
    description: "Developed scalable APIs for mobile and web applications.",
    icon: <FaServer />,
  },
  {
    id: 2,
    title: "Full Stack Developer",
    description: "Built dynamic web applications using React and Node.js.",
    icon: <FaCode />,
  },
  {
    id: 3,
    title: "Data Engineer",
    description: "Optimized data pipelines for large-scale analytics.",
    icon: <FaDatabase />,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    description: "Automated deployment pipelines and infrastructure.",
    icon: <FaTools />,
  },
];

const WorkExperience: React.FC = () => {
  return (
    <section className="work-experience-section">
      <h2 className="section-title">Work Experience</h2>
      <div className="experience-grid">
        {experiences.map((exp) => (
          <div className="experience-card" key={exp.id}>
            <div className="card-icon">{exp.icon}</div>
            <div>
              <h3 className="card-title">{exp.title}</h3>
              <p className="card-description">{exp.description}</p>
              <button className="learn-more">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
