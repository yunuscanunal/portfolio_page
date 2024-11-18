import React from "react";
import "./Hero.css";
import avatar from "../assets/avatar.png";

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Sol taraf: Avatar */}
        <div className="avatar-container">
          <img src={avatar} alt="Avatar" className="avatar" />
        </div>

        {/* Sağ taraf: Metin */}
        <div className="text-container">
          <p className="intro">Hello! I am Yunuscan Ünal</p>
          <h1>
            A Developer who <br />
            <span className="highlight">Solves Problems</span>
          </h1>
          <p className="description">
            Because if you don't solve the problem, who else will?
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
