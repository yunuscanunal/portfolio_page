import React, { useState } from "react";
import "./ContactSection.css";
import emailjs from "emailjs-com";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    emailjs
      .send(
        "service_j6nsrna", // EmailJS'den aldığınız Service ID
        "template_e0a1y4m", // EmailJS'den aldığınız Template ID
        formData,
        "DXHUSXBVZTl54iO-r" // EmailJS'den aldığınız User ID
      )
      .then(
        (result) => {
          console.log("Message sent successfully:", result.text); // Başarılı gönderim
          setStatusMessage("Your message has been sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Formu sıfırla
          clearStatusMessageAfterDelay();
        },
        (error) => {
          console.error("Failed to send message:", error); // Hata durumunda
          setStatusMessage("Failed to send message. Please try again later.");
          console.error(error);
          clearStatusMessageAfterDelay();
        }
      );
  };
  const clearStatusMessageAfterDelay = () => {
    setTimeout(() => {
      setStatusMessage(null);
    }, 5000); // 5 saniye sonra mesajı kaldır
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-description">
          I'm currently looking to join a cross-functional team that values
          improving people's lives through accessible design. If you're looking
          for a team member who is passionate about developing, I'd love to hear
          from you!
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn submit-btn">
            Send Message
          </button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </section>
  );
};

export default ContactSection;
