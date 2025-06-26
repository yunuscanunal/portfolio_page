import React, { useState } from "react";
import "./ContactSection.css";
import emailjs from "emailjs-com";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (!executeRecaptcha) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }
    // reCAPTCHA doğrulama token'i al
    const token = await executeRecaptcha("submit");
    setRecaptchaToken(token);

    //console.log("Recaptcha token:", token);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!, // EmailJS'den aldığınız Service ID
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!, // EmailJS'den aldığınız Template ID
        {
          ...formData,
          "g-recaptcha-response": token, // Token'i ekle
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY! // EmailJS'den aldığınız User ID
      )
      .then(
        (result) => {
          console.log("Message sent successfully:", result.text); // Başarılı gönderim
          setStatusMessage("Your message has been sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Formu sıfırla
          setRecaptchaToken(null); // Reset reCAPTCHA
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
          <button type="submit" className="btn submit-btn">
            Send Message
          </button>
        </form>

        {statusMessage && (
          <div
            className="status-message"
            style={{
              color: statusMessage.includes("successfully")
                ? "#4CAF50"
                : "#f44336",
              marginTop: "1rem",
              padding: "0.5rem",
              borderRadius: "4px",
              backgroundColor: statusMessage.includes("successfully")
                ? "rgba(76, 175, 80, 0.1)"
                : "rgba(244, 67, 54, 0.1)",
              border: `1px solid ${
                statusMessage.includes("successfully") ? "#4CAF50" : "#f44336"
              }`,
            }}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
