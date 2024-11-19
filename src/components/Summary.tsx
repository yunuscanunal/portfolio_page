import React from "react";
import "./Summary.css";

const Summary: React.FC = () => {
  return (
    <section id="about" className="summary-section">
      <div className="summary-content">
        <h1 className="summary-title">I'm a Software Engineer</h1>
        <p className="summary-subtitle">
          Currently, I am looking for a full-time position as a software
          engineer.
        </p>
        <p className="summary-description">
          A self-taught backend developer with a passion for problem-solving and
          creating efficient solutions. I specialize in building scalable
          systems and applications that make a real impact. With experience in
          various technologies, I aim to bridge the gap between business needs
          and technology.
        </p>
      </div>
    </section>
  );
};

export default Summary;
