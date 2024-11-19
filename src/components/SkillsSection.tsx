import React from "react";
import "./SkillsSection.css";
import { FaReact, FaJava, FaGit, FaPython } from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiSpring,
  SiAngular,
} from "react-icons/si";

const skills = [
  { id: 1, icon: <FaReact />, name: "React" },
  { id: 2, icon: <SiTypescript />, name: "TypeScript" },
  { id: 3, icon: <SiJavascript />, name: "JavaScript" },
  { id: 4, icon: <SiPostgresql />, name: "PostgreSQL" },
  { id: 5, icon: <FaJava />, name: "Java" },
  { id: 6, icon: <SiSpring />, name: "Spring" },
  { id: 7, icon: <SiAngular />, name: "Angular" },
  { id: 8, icon: <FaGit />, name: "Git" },
  { id: 9, icon: <FaPython />, name: "Python" },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="skills-section">
      <h2 className="skills-title">
        I'm currently looking to join a{" "}
        <span className="highlight">cross-functional</span> team
      </h2>
      <p className="skills-subtitle">
        that values improving people's lives through accessible design
      </p>
      <div className="skills-wrapper">
        <div className="skills-row top">
          {skills.slice(0, Math.ceil(skills.length / 2)).map((skill) => (
            <div key={skill.id} className="skill-item">
              {skill.icon}
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
        <div className="skills-row bottom">
          {skills.slice(Math.ceil(skills.length / 2)).map((skill) => (
            <div key={skill.id} className="skill-item">
              {skill.icon}
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
