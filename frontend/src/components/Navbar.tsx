import React, { useState, useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";
import "./Navbar.css";
import { ThemeContext, LangContext } from "../App";
import type { LangContextType } from "../App";

const CustomNavbar: React.FC = () => {
  const [expanded, setExpanded] = useState(false); // Hamburger menü durumunu kontrol eden state
  const { dark, toggle } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LangContext);

  const handleToggle = () => setExpanded(!expanded); // Aç/Kapat durumu
  const handleClose = () => setExpanded(false); // Menü öğesine tıklandığında kapat

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      fixed="top"
      expanded={expanded}
      variant={dark ? "dark" : "light"}
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
              href="https://drive.google.com/file/d/12J6zAhfSZ3dBBXT1yqUeECWRGyiY3d8B/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cv-link"
            >
              <TbFileCv />
              <span className="tooltip">Click to see CV</span>
            </Nav.Link>

            {/* Tema ve Dil Seçiciler */}
            <div className="nav-controls d-flex align-items-center ms-lg-3">
              <button onClick={toggle} className="theme-toggle-btn">
                {dark ? "☀️" : "🌙"}
              </button>
              <select
                value={lang}
                onChange={(e) =>
                  setLang(e.target.value as LangContextType["lang"])
                }
                className="lang-select form-select form-select-sm"
              >
                <option value="tr">TR</option>
                <option value="en">EN</option>
              </select>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
