import React, { useState, useEffect } from "react";
import { authFetch } from "../api/apiService";
import { useNavigate } from "react-router-dom";

// Proje tipi
interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  codeLink?: string;
  liveLink?: string;
}

const AdminPanel: React.FC = () => {
  const [projectData, setProjectData] = useState<Project>({
    id: 0,
    title: "",
    description: "",
    image: "",
    codeLink: "",
    liveLink: "",
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Projeleri çek
  const fetchProjects = async () => {
    const res = await authFetch("http://localhost:8080/api/projects", {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  // Proje ekle veya güncelle
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Yetkisiz erişim. Lütfen giriş yapınız.");
      return;
    }
    try {
      let response;
      if (editId) {
        // Güncelle
        response = await authFetch(
          `http://localhost:8080/api/projects/${editId}`,
          {
            method: "PUT",
            body: JSON.stringify(projectData),
          }
        );
      } else {
        // Ekle
        const { id, ...projectDataWithoutId } = projectData;
        response = await authFetch("http://localhost:8080/api/projects", {
          method: "POST",
          body: JSON.stringify(projectDataWithoutId),
        });
      }
      if (response.ok) {
        alert(editId ? "Proje güncellendi" : "Proje eklendi");
        setProjectData({
          id: 0,
          title: "",
          description: "",
          image: "",
          codeLink: "",
          liveLink: "",
        });
        setEditId(null);
        fetchProjects();
      } else {
        alert("İşlem başarısız");
      }
    } catch (error) {
      alert("Sunucu hatası");
    }
  };

  // Proje sil
  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;
    const res = await authFetch(`http://localhost:8080/api/projects/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Proje silindi");
      fetchProjects();
    } else {
      alert("Silme başarısız");
    }
  };

  // Düzenle butonu
  const handleEdit = (project: Project) => {
    setProjectData(project);
    setEditId(project.id);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Panel - Yeni Proje Ekle / Düzenle</h2>
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
      <button onClick={handleSubmit}>
        {editId ? "Kaydet (Güncelle)" : "➕ Proje Ekle"}
      </button>
      <button onClick={() => navigate("/")}>Anasayfa</button>

      <hr />
      <h3>Projeler</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id} style={{ marginBottom: "10px" }}>
            <b>{project.title}</b> - {project.description}
            <button
              onClick={() => handleEdit(project)}
              style={{ marginLeft: 10 }}
            >
              Düzenle
            </button>
            <button
              onClick={() => handleDelete(project.id)}
              style={{ marginLeft: 10 }}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
