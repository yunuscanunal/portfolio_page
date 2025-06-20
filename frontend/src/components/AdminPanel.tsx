import React, { useState, useEffect } from "react";
import { authFetch } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import "./AdminPanel.css";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Projeleri çek
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch("http://localhost:8080/api/projects", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        setError("Failed to fetch projects.");
      }
    } catch (err) {
      setError("Server error.");
    } finally {
      setLoading(false);
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
    // Alan doğrulama
    let error = "";
    if (name === "title" && value.trim() === "") error = "Title is required";
    if (name === "description" && value.trim() === "")
      error = "Description is required";
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Proje ekle veya güncelle
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized access. Please login.");
      return;
    }
    // Alanlar için son kontrol
    const errors: { [key: string]: string } = {};
    if (projectData.title.trim() === "") errors.title = "Title is required";
    if (projectData.description.trim() === "")
      errors.description = "Description is required";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    setError(null);
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
        setError("Operation failed.");
      }
    } catch (error) {
      setError("Server error.");
    } finally {
      setLoading(false);
    }
  };

  // Proje sil
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch(`http://localhost:8080/api/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProjects();
      } else {
        setError("Delete failed.");
      }
    } catch (error) {
      setError("Server error.");
    } finally {
      setLoading(false);
    }
  };

  // Düzenle butonu
  const handleEdit = (project: Project) => {
    setProjectData(project);
    setEditId(project.id);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel - Add / Edit Project</h2>
      {error && <div className="error-message">{error}</div>}
      {loading && <Spinner />}
      <input
        name="title"
        className="form-control"
        value={projectData.title}
        onChange={handleChange}
        placeholder="Project Title"
      />
      {fieldErrors.title && (
        <div className="error-message">{fieldErrors.title}</div>
      )}
      <textarea
        name="description"
        className="form-control"
        value={projectData.description}
        onChange={handleChange}
        placeholder="Project Description"
      />
      {fieldErrors.description && (
        <div className="error-message">{fieldErrors.description}</div>
      )}
      <input
        name="image"
        className="form-control"
        value={projectData.image}
        onChange={handleChange}
        placeholder="Image URL (optional)"
      />
      <input
        name="codeLink"
        className="form-control"
        value={projectData.codeLink}
        onChange={handleChange}
        placeholder="Code Link (optional)"
      />
      <input
        name="liveLink"
        className="form-control"
        value={projectData.liveLink}
        onChange={handleChange}
        placeholder="Live Link (optional)"
      />
      <button onClick={handleSubmit} className="btn-custom">
        {editId ? "Save (Update)" : "➕ Add Project"}
      </button>
      <button onClick={() => navigate("/")} className="btn-custom">
        Home
      </button>

      <hr />
      <h3>Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id} style={{ marginBottom: "10px" }}>
            <b>{project.title}</b> - {project.description}
            <button
              onClick={() => handleEdit(project)}
              style={{ marginLeft: 10 }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(project.id)}
              style={{ marginLeft: 10 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
