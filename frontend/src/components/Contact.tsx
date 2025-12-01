import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useGlobal } from "../context/GlobalContext";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const { t, theme } = useGlobal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honey: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const mountTime = useRef(0);
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  useEffect(() => {
    mountTime.current = Date.now();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const validateForm = () => {
    if (formData.honey !== "") {
      console.warn("Bot detected via honeypot.");
      return t.contact.errors.spam;
    }
    const timeElapsed = Date.now() - mountTime.current;
    if (timeElapsed < 3000) {
      console.warn("Form filled too fast. Possible bot.");
      return t.contact.errors.spam;
    }
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      return t.contact.errors.required;
    }
    if (!emailRegex.test(formData.email)) {
      return t.contact.errors.invalidEmail;
    }
    if (formData.message.length < 10) {
      return t.contact.errors.short;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("loading");
    const lastSent = localStorage.getItem("lastEmailSent");
    if (lastSent) {
      const timeDiff = Date.now() - parseInt(lastSent);
      // 1 saat (3600000 ms) engel koy
      if (timeDiff < 3600000) {
        setStatus("error");
        setErrorMsg("Please wait 1 hour before sending another message.");
        return;
      }
    }
    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      setStatus("error");
      return;
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Yunuscan",
          "g-recaptcha-response": captchaToken,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Public Key
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "", honey: "" });
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
      mountTime.current = Date.now();
      localStorage.setItem("lastEmailSent", Date.now().toString());
      setTimeout(() => setStatus("idle"), 5000);
      setStatus("success");
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setErrorMsg("Failed to send message. Please try again later.");
    }
  };
  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <section
      id="contact"
      className={`py-24 relative overflow-hidden transition-colors duration-500 ${
        theme === "light" ? "bg-gray-50" : "bg-cyber-black"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b pointer-events-none
        ${
          theme === "dark"
            ? "from-transparent to-cyber-primary/5"
            : "from-transparent to-blue-100/30"
        }
      `}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`max-w-3xl mx-auto p-8 md:p-12 rounded-2xl backdrop-blur-md border shadow-xl transition-all duration-300
            ${
              theme === "dark"
                ? "bg-cyber-gray/40 border-cyber-primary/30 shadow-neon-blue text-white"
                : "bg-white/90 border-blue-200 shadow-blue-200/50 text-gray-900"
            }
          `}
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-center">
            {t.contact.title}
          </h2>

          <p
            className={`mb-10 font-mono text-center leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.contact.desc}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 font-mono">
            {/* Honeypot Field (Gizli) */}
            <input
              type="text"
              name="honey"
              value={formData.honey}
              onChange={handleChange}
              className="hidden"
              autoComplete="off"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className={`text-xs tracking-widest ${
                    theme === "dark" ? "text-cyber-primary" : "text-blue-600"
                  }`}
                >
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 bg-transparent border rounded focus:outline-none transition-all
                    ${
                      theme === "dark"
                        ? "border-white/20 focus:border-cyber-primary focus:shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }
                  `}
                />
              </div>

              <div className="space-y-2">
                <label
                  className={`text-xs tracking-widest ${
                    theme === "dark" ? "text-cyber-primary" : "text-blue-600"
                  }`}
                >
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 bg-transparent border rounded focus:outline-none transition-all
                    ${
                      theme === "dark"
                        ? "border-white/20 focus:border-cyber-primary focus:shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }
                  `}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className={`text-xs tracking-widest ${
                  theme === "dark" ? "text-cyber-primary" : "text-blue-600"
                }`}
              >
                {t.contact.form.message}
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 bg-transparent border rounded focus:outline-none transition-all resize-none
                  ${
                    theme === "dark"
                      ? "border-white/20 focus:border-cyber-primary focus:shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }
                `}
              />
            </div>
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={onCaptchaChange}
                theme={theme === "dark" ? "dark" : "light"}
              />
            </div>

            {/* Status Messages */}
            {status === "error" && (
              <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 text-sm rounded">
                ⚠ {errorMsg}
              </div>
            )}
            {status === "success" && (
              <div className="p-3 bg-green-500/20 border border-green-500 text-green-500 text-sm rounded">
                ✓ {t.contact.form.success}
              </div>
            )}

            <div className="text-center pt-4">
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full md:w-auto px-8 py-4 border font-mono text-lg rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    theme === "dark"
                      ? "bg-cyber-primary/10 border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30"
                  }
                `}
              >
                {status === "loading"
                  ? t.contact.form.sending
                  : t.contact.form.submit}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
