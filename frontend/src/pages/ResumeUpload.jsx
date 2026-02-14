import { useState, useEffect } from "react";
import api from "../services/api";
import "./ResumeUpload.css";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../services/api";



export default function ResumeUpload() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);




  const uploadResume = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);  
      const res = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSkills(res.data.extracted_skills);
      
    } catch (err) {
      alert("Resume upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    // <div className="layout">
    <div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>

          {/* LEFT SIDEBAR */}
        {/* <aside className="sidebar"> */}
        <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>

          <div className="brand">SR</div>

          <nav>
            <div 
              className="skill_asses_button"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Dashboard
            </div>
            <div 
              className="skill_asses_button"
              onClick={() => (window.location.href = "/assessment")}
            >
                Skill Assessment
              
            </div>
            <div className="skill_asses_button active"
              onClick={() => (window.location.href = "/resume")}
            >
                Resume Analysis
              
            </div>
            <div className="nav-item">
              Profile
            </div>
            <div className="nav-item">
              Account
            </div>
          </nav>
        </aside>
        {sidebarOpen && (
          <div
            className="overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

      <div className="resume-container">
        <div className="headerr">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h2>Resume Analysis</h2>
        </div>


        <div className="resume-card">
          <h2>Upload Your Resume</h2>
          <p>Supported formats: PDF, DOCX</p>

          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button onClick={uploadResume} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>

          {skills.length > 0 && (
            <div className="skills-section">
              <h3>Extracted Skills</h3>

              <div className="skill-tags">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              {/* MANUAL CONTINUE BUTTON */}
              <button
                className="continue-btn"
                onClick={() => navigate("/dashboard")}
              >
                Continue to Dashboard
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );

}
     