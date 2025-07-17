import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/portfolioIcon.svg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";
import "./Navbar.css";

const CustomNavbar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <Logo className="navbar-logo" />
        </Navbar.Brand>

        {/* Hamburger Menü */}
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />

        {/* Menü Öğeleri */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" onClick={handleClose}>
              Home
            </Nav.Link>
            <Nav.Link href="#about" onClick={handleClose}>
              About
            </Nav.Link>
            <Nav.Link href="#experience" onClick={handleClose}>
              Experience
            </Nav.Link>
            <Nav.Link href="#projects" onClick={handleClose}>
              Lab
            </Nav.Link>
            <Nav.Link href="#contact" onClick={handleClose}>
              Contact
            </Nav.Link>
            <Nav.Link
              href="https://linkedin.com/in/yunuscanunal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Nav.Link>
            <Nav.Link
              href="https://github.com/yunuscanunal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Nav.Link>
            {/* CV Opener */}
            <Nav.Link
              href="https://drive.google.com/file/d/1ZWNNGcHXQJcId-KHpNsLewHW_qlcZzPf/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cv-link"
            >
              <TbFileCv />
              <span className="tooltip">Click to see CV</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
