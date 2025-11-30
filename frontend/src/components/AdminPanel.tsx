import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaTimes, FaHome } from "react-icons/fa"; // FaEdit ve FaTimes eklendi
import { API_BASE_URL } from "../api/config";

const API_URL = `${API_BASE_URL}/api`;

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
}
interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  techStack: string[];
}

const AdminPanel: React.FC = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"projects" | "experiences">(
    "projects"
  );
  const [msg, setMsg] = useState("");

  // Editing State (Hangi ID düzenleniyor?)
  const [editingId, setEditingId] = useState<number | null>(null);

  // Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // Forms
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    demoUrl: "",
  });
  const [expForm, setExpForm] = useState({
    company: "",
    role: "",
    period: "",
    description: "",
    techStack: "",
  });

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/admin/login");
      } else {
        const loadData = async () => {
          try {
            const pRes = await fetch(`${API_URL}/projects`);
            const eRes = await fetch(`${API_URL}/experiences`);
            if (pRes.ok) setProjects(await pRes.json());
            if (eRes.ok) setExperiences(await eRes.json());
          } catch (err) {
            console.error(err);
          }
        };
        loadData();
      }
    }
  }, [isAuthenticated, loading, navigate]);

  const fetchData = async () => {
    try {
      const pRes = await fetch(`${API_URL}/projects`);
      const eRes = await fetch(`${API_URL}/experiences`);
      if (pRes.ok) setProjects(await pRes.json());
      if (eRes.ok) setExperiences(await eRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  // --- EDIT HANDLERS ---

  const handleEditProject = (project: Project) => {
    setEditingId(project.id);
    setProjectForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "), // Array'i string'e çevir
      githubUrl: project.githubUrl || "",
      demoUrl: project.demoUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Forma git
  };

  const handleEditExperience = (exp: Experience) => {
    setEditingId(exp.id);
    setExpForm({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      description: exp.description,
      techStack: exp.techStack.join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProjectForm({
      title: "",
      description: "",
      techStack: "",
      githubUrl: "",
      demoUrl: "",
    });
    setExpForm({
      company: "",
      role: "",
      period: "",
      description: "",
      techStack: "",
    });
  };

  // --- SUBMIT HANDLERS ---

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {
      ...projectForm,
      techStack: projectForm.techStack.split(",").map((t) => t.trim()),
    };

    const url = editingId
      ? `${API_URL}/projects/${editingId}`
      : `${API_URL}/projects`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMsg(editingId ? "Proje Güncellendi!" : "Proje Eklendi!");
        fetchData();
        cancelEdit(); // Formu temizle
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {
      ...expForm,
      techStack: expForm.techStack.split(",").map((t) => t.trim()),
    };

    const url = editingId
      ? `${API_URL}/experiences/${editingId}`
      : `${API_URL}/experiences`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMsg(editingId ? "Deneyim Güncellendi!" : "Deneyim Eklendi!");
        fetchData();
        cancelEdit();
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleDelete = async (type: "projects" | "experiences", id: number) => {
    if (!window.confirm("Silmek istediğine emin misin?")) return;
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/${type}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-cyber-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-2xl md:text-3xl font-mono text-cyber-primary">
            ADMIN_DASHBOARD
          </h1>
          <div className="flex gap-3 md:gap-4">
            <button
              onClick={() => navigate("/")} // SPA mantığına uygun yönlendirme
              className="flex items-center gap-2 px-4 py-2 border border-cyber-primary text-cyber-primary rounded hover:bg-cyber-primary/10 transition-colors font-mono text-sm"
            >
              <FaHome />
              <span className="hidden md:inline">GO HOME</span>{" "}
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500/10 transition-colors font-mono text-sm"
            >
              <FaTimes />
              <span className="hidden md:inline">LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => {
              setActiveTab("projects");
              cancelEdit();
            }}
            className={`px-6 py-2 rounded font-mono ${
              activeTab === "projects"
                ? "bg-cyber-primary text-black"
                : "bg-cyber-gray text-gray-400"
            }`}
          >
            PROJECTS
          </button>
          <button
            onClick={() => {
              setActiveTab("experiences");
              cancelEdit();
            }}
            className={`px-6 py-2 rounded font-mono ${
              activeTab === "experiences"
                ? "bg-cyber-primary text-black"
                : "bg-cyber-gray text-gray-400"
            }`}
          >
            EXPERIENCE
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="bg-cyber-gray/30 border border-white/10 p-6 rounded-xl backdrop-blur-md mb-12 relative">
          {editingId && (
            <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded text-xs font-mono border border-yellow-500/50">
              EDITING MODE (ID: {editingId})
            </div>
          )}

          {msg && <div className="text-green-400 mb-4 font-mono">{msg}</div>}

          {activeTab === "projects" ? (
            <form
              onSubmit={handleProjectSubmit}
              className="space-y-4 font-mono"
            >
              <h3 className="text-xl mb-4">
                {editingId ? "Edit Project" : "Add Project"}
              </h3>
              <input
                value={projectForm.title}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, title: e.target.value })
                }
                placeholder="Title"
                className="w-full p-3 bg-black/40 border border-white/10 rounded text-white"
                required
              />
              <textarea
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
                className="w-full p-3 bg-black/40 border border-white/10 rounded text-white h-24"
                required
              />
              <input
                value={projectForm.techStack}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, techStack: e.target.value })
                }
                placeholder="Tech Stack (Java, React)"
                className="w-full p-3 bg-black/40 border border-white/10 rounded text-white"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={projectForm.githubUrl}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      githubUrl: e.target.value,
                    })
                  }
                  placeholder="GitHub URL"
                  className="w-full p-3 bg-black/40 border border-white/10 rounded text-white"
                />
                <input
                  value={projectForm.demoUrl}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, demoUrl: e.target.value })
                  }
                  placeholder="Demo URL"
                  className="w-full p-3 bg-black/40 border border-white/10 rounded text-white"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className={`px-8 py-3 font-bold rounded flex-1 ${
                    editingId
                      ? "bg-yellow-500 text-black"
                      : "bg-cyber-primary text-black"
                  }`}
                >
                  {editingId ? "UPDATE PROJECT" : "SAVE PROJECT"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 border border-gray-500 text-gray-400 rounded hover:bg-white/10"
                  >
                    <FaTimes /> CANCEL
                  </button>
                )}
              </div>
            </form>
          ) : (
            <form onSubmit={handleExpSubmit} className="space-y-4 font-mono">
              <h3 className="text-xl mb-4">
                {editingId ? "Edit Experience" : "Add Experience"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={expForm.company}
                  onChange={(e) =>
                    setExpForm({ ...expForm, company: e.target.value })
                  }
                  placeholder="Company Name"
                  className="w-full p-3 bg-black/40 border border-white/10 rounded text-white"
                  required
                />
                <input
                  value={expForm.role}
                  onChange={(e) =>
                    setExpForm({ ...expForm, role: e.target.value })
                  }
                  placeholder="Role / Title"
                  className="w-full p-3 bg-black/40 border border-white/10 rounded text-white"
                  required
                />
              </div>
              <input
                value={expForm.period}
                onChange={(e) =>
                  setExpForm({ ...expForm, period: e.target.value })
                }
                placeholder="Period (e.g. 2023 - Present)"
                className="w-full p-3 bg-black/40 border border-white/10 rounded text-white"
                required
              />
              <textarea
                value={expForm.description}
                onChange={(e) =>
                  setExpForm({ ...expForm, description: e.target.value })
                }
                placeholder="Description"
                className="w-full p-3 bg-black/40 border border-white/10 rounded text-white h-24"
                required
              />
              <input
                value={expForm.techStack}
                onChange={(e) =>
                  setExpForm({ ...expForm, techStack: e.target.value })
                }
                placeholder="Tech Stack (Java, Spring)"
                className="w-full p-3 bg-black/40 border border-white/10 rounded text-white"
                required
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className={`px-8 py-3 font-bold rounded flex-1 ${
                    editingId
                      ? "bg-yellow-500 text-black"
                      : "bg-cyber-primary text-black"
                  }`}
                >
                  {editingId ? "UPDATE EXPERIENCE" : "SAVE EXPERIENCE"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 border border-gray-500 text-gray-400 rounded hover:bg-white/10"
                  >
                    <FaTimes /> CANCEL
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Lists */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-2">
            Active Records
          </h3>
          <div className="grid gap-4">
            {activeTab === "projects"
              ? projects.map((p) => (
                  <div
                    key={p.id}
                    className={`bg-cyber-gray/20 p-4 rounded flex justify-between items-center border ${
                      editingId === p.id
                        ? "border-yellow-500/50 bg-yellow-500/5"
                        : "border-white/5"
                    }`}
                  >
                    <div>
                      <h4 className="text-cyber-primary font-bold">
                        {p.title}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(p)}
                        className="text-yellow-500 hover:bg-yellow-500/10 p-2 rounded transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete("projects", p.id)}
                        className="text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              : experiences.map((e) => (
                  <div
                    key={e.id}
                    className={`bg-cyber-gray/20 p-4 rounded flex justify-between items-center border ${
                      editingId === e.id
                        ? "border-yellow-500/50 bg-yellow-500/5"
                        : "border-white/5"
                    }`}
                  >
                    <div>
                      <h4 className="text-cyber-primary font-bold">{e.role}</h4>
                      <div className="text-sm text-gray-400">
                        {e.company} | {e.period}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditExperience(e)}
                        className="text-yellow-500 hover:bg-yellow-500/10 p-2 rounded transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete("experiences", e.id)}
                        className="text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
