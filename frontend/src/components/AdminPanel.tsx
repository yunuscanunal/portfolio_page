import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // FaBriefcase kaldırıldı
import { API_BASE_URL } from "../api/config";

// Tipler
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

  const API_URL = `${API_BASE_URL}/api`;

  // DÜZELTME: fetchData yukarı taşındı ve useCallback ile sarmalandı
  const fetchData = useCallback(async () => {
    try {
      const pRes = await fetch(`${API_URL}/projects`);
      const eRes = await fetch(`${API_URL}/experiences`);
      if (pRes.ok) setProjects(await pRes.json());
      if (eRes.ok) setExperiences(await eRes.json());
    } catch (err) {
      console.error(err);
    }
  }, [API_URL]);

  // DÜZELTME: useEffect artık fetchData'yı güvenle kullanıyor
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) navigate("/admin/login");
      else {
        fetchData();
      }
    }
  }, [isAuthenticated, loading, navigate, fetchData]);

  // Generic Handler
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {
      ...projectForm,
      techStack: projectForm.techStack.split(",").map((t) => t.trim()),
    };

    await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    setMsg("Proje Eklendi!");
    fetchData();
    setProjectForm({
      title: "",
      description: "",
      techStack: "",
      githubUrl: "",
      demoUrl: "",
    });
  };

  const handleExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {
      ...expForm,
      techStack: expForm.techStack.split(",").map((t) => t.trim()),
    };

    await fetch(`${API_URL}/experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    setMsg("Deneyim Eklendi!");
    fetchData();
    setExpForm({
      company: "",
      role: "",
      period: "",
      description: "",
      techStack: "",
    });
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
          <h1 className="text-3xl font-mono text-cyber-primary">
            ADMIN_DASHBOARD
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500/10"
          >
            LOGOUT
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2 rounded font-mono ${
              activeTab === "projects"
                ? "bg-cyber-primary text-black"
                : "bg-cyber-gray text-gray-400"
            }`}
          >
            PROJECTS
          </button>
          <button
            onClick={() => setActiveTab("experiences")}
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
        <div className="bg-cyber-gray/30 border border-white/10 p-6 rounded-xl backdrop-blur-md mb-12">
          {msg && <div className="text-green-400 mb-4 font-mono">{msg}</div>}

          {activeTab === "projects" ? (
            <form
              onSubmit={handleProjectSubmit}
              className="space-y-4 font-mono"
            >
              <h3 className="text-xl mb-4">Add Project</h3>
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
              <button
                type="submit"
                className="px-8 py-3 bg-cyber-primary text-black font-bold rounded"
              >
                SAVE PROJECT
              </button>
            </form>
          ) : (
            <form onSubmit={handleExpSubmit} className="space-y-4 font-mono">
              <h3 className="text-xl mb-4">Add Experience</h3>
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
              <button
                type="submit"
                className="px-8 py-3 bg-cyber-primary text-black font-bold rounded"
              >
                SAVE EXPERIENCE
              </button>
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
                    className="bg-cyber-gray/20 p-4 rounded flex justify-between items-center border border-white/5"
                  >
                    <div>
                      <h4 className="text-cyber-primary font-bold">
                        {p.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleDelete("projects", p.id)}
                      className="text-red-500 hover:bg-red-500/10 p-2 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              : experiences.map((e) => (
                  <div
                    key={e.id}
                    className="bg-cyber-gray/20 p-4 rounded flex justify-between items-center border border-white/5"
                  >
                    <div>
                      <h4 className="text-cyber-primary font-bold">{e.role}</h4>
                      <div className="text-sm text-gray-400">
                        {e.company} | {e.period}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete("experiences", e.id)}
                      className="text-red-500 hover:bg-red-500/10 p-2 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
