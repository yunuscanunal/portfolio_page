import React, { useState } from "react";
import { authFetch } from "../api/apiService";
import { useNavigate } from "react-router-dom";

const AdminPanel: React.FC = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    image: "",
    codeLink: "",
    liveLink: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Yetkisiz erişim. Lütfen giriş yapınız.");
      return;
    }

    try {
      const response = await authFetch("http://localhost:8080/api/projects", {
        method: "POST",
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        alert("✅ Proje başarıyla eklendi");
        setProjectData({
          title: "",
          description: "",
          image: "",
          codeLink: "",
          liveLink: "",
        });
      } else {
        const err = await response.text();
        console.error(err);
        alert("❌ Proje eklenemedi");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Sunucu hatası");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Panel - Yeni Proje Ekle</h2>
      <input
        name="title"
        value={projectData.title}
        onChange={handleChange}
        placeholder="Başlık"
        style={{ display: "block", marginBottom: "10px" }}
      />
      <textarea
        name="description"
        value={projectData.description}
        onChange={handleChange}
        placeholder="Açıklama"
        style={{
          display: "block",
          marginBottom: "10px",
          width: "300px",
          height: "100px",
        }}
      />
      <input
        name="image"
        value={projectData.image}
        onChange={handleChange}
        placeholder="Görsel URL"
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        name="codeLink"
        value={projectData.codeLink}
        onChange={handleChange}
        placeholder="GitHub Link"
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        name="liveLink"
        value={projectData.liveLink}
        onChange={handleChange}
        placeholder="Canlı Link"
        style={{ display: "block", marginBottom: "10px" }}
      />
      <button onClick={handleSubmit}>➕ Proje Ekle</button>
      <button onClick={() => navigate("/")}>Anasayfa</button>
    </div>
  );
};

export default AdminPanel;
