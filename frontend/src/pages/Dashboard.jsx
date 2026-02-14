import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";


export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [role, setRole] = useState("Python Developer");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/dashboard/${role}`);
      setData({
        role_readiness_score: res.data?.role_readiness_score ?? 0,
        assessment_scores: Array.isArray(res.data?.assessment_scores)
          ? res.data.assessment_scores
          : [],
        resume_skills: Array.isArray(res.data?.resume_skills)
          ? res.data.resume_skills
          : [],
        your_skills: Array.isArray(res.data?.your_skills)
          ? res.data.your_skills
          : [],
        role_skills_status: Array.isArray(res.data?.role_skills_status)
          ? res.data.role_skills_status
          : [],
        skill_gaps: Array.isArray(res.data?.skill_gaps)
          ? res.data.skill_gaps
          : [],
      });


    } catch (err) {
      setError("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    // <div className="layout">
    <div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>


        {/* LEFT SIDEBAR */}
        {/* <aside className="sidebar"> */}
        <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>

          <div className="brand">SR</div>

          <nav>
            <div className="nav-item active">
              Dashboard
            </div>
            <div 
              className="skill_asses_button"
              onClick={() => (window.location.href = "/assessment")}
            >
                Skill Assessment
              
            </div>
            <div className="skill_asses_button"
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
        {sidebarOpen && (<div className="overlay" onClick={() => setSidebarOpen(false)}></div>)}
      <div className="dashboard-container">
       
        <div className="top-bbar">

          <button 
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            

          >
            ☰
          </button>



          <h2 className="page-title">Dashboard</h2>

          <div className="profile-box">
            <div className="avatar">👤</div>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {/* STATUS */}
        {loading && <p>Loading dashboard...</p>}
        {error && <p className="error">{error}</p>}

        {data && (
          <>
            {/* READINESS SCORE */}
            
            <div className="score-card">

              
              <div className="score-circle">
                <svg viewBox="0 0 160 160">
                  {/* background 3/4 arc */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="282 377"
                    transform="rotate(135 80 80)"
                  />

                  {/* progress arc */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    fill="none"
                    stroke="#8b8cfb"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="282 377"
                    strokeDashoffset={
                      282 - (282 * data.role_readiness_score) / 100
                    }
                    style={{
                      transition: "stroke-dashoffset 0.6s ease"
                    }}
                    transform="rotate(135 80 80)"
                  />
                </svg>

                <div className="score-text">
                  {data.role_readiness_score}%
                </div>
              </div>





              {/* </div> */}

              {/* RIGHT: TEXT */}
              <div className="score-right">
                <h3>Role Readiness Score</h3>
                <p className="role-name">{role}</p>
              </div>

              <div className="top-actions">
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>

                  {[
                    "Software Engineer",
                    "Associate Software Engineer",
                    "Junior Software Engineer",
                    "Software Developer",
                    "Graduate Engineer Trainee",
                    "Frontend Developer",
                    "React Developer",
                    "Web Developer",
                    "UI Developer",
                    "Python Developer",
                    "Backend Developer",
                    "FastAPI Developer",
                    "Django Developer",
                    "API Developer",
                    "Integration Engineer",
                    "Java Developer",
                    "Java Backend Developer",
                    "Spring Boot Developer",
                    "Microservices Developer",
                    "Data Analyst",
                    "Business Data Analyst",
                    "Analytics Engineer",
                    "Data Scientist",
                    "Junior Data Scientist",
                    "Machine Learning Engineer",
                    "Junior Machine Learning Engineer",
                    "AI Engineer",
                    "Research Analyst",
                    "DevOps Engineer",
                    "Junior DevOps Engineer",
                    "Cloud Engineer",
                    "AWS Cloud Engineer",
                    "Site Reliability Engineer",
                    "QA Automation Engineer",
                    "Application Support Engineer",
                    "System Engineer",
                    "Technical Associate"
                  ]
                    .sort((a, b) => a.localeCompare(b))
                    .map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                </select>

                <button onClick={loadDashboard}>Refresh</button>
              </div>



            </div>
            
            {/*ROLE REQUIRED SKILLS*/}
            
            <div className="section role-skills-section">
              <div className="section-header">
                <h3>Role Required Skills</h3>
              </div>

              {data.role_skills_status.length === 0 ? (
                <p>No role skills found.</p>
              ) : (
                <div className="card-grid">
                  {data.role_skills_status.map((item) => (
  
                    <div className="skill-card" key={item.skill}>
                      <p className="skill-name">{item.skill}</p>

                      <div className="skill-score">
                        {item.status === "Tested" ? `${item.score}%` : "—"}
                      </div>

                      <div className={`skill-status ${item.status === "Tested" ? "done" : "pending"}`}>
                        {item.status === "Tested" ? "Completed" : "Not Tested"}
                      </div>

                      <small className="required">
                        Required: {item.required_score}%
                      </small>
                    </div>

                  ))}
                </div>
              )}
            </div>



            {/* RESUME SKILLS */}
            <div className="section">
              <h3>Resume Skills</h3>

              {data.resume_skills.length === 0 && (
                <p>Please upload your resume.</p>
              )}

              <div className="skill-tags">
                {data.resume_skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
            {/* YOUR SKILLS */}
            <div className="section">
              <h3>Your Skills (From Assessments)</h3>

              {data.your_skills.length === 0 && (
                <p>No assessments taken yet.</p>
              )}

              <div className="card-grid">
                {data.your_skills.map((item) => (
                  <div className="skill-card" key={item.skill}>
                    <p>{item.skill}</p>
                    <strong>{item.score}%</strong>
                  </div>
                ))}
              </div>
            </div>


            {/* SKILL GAPS */}
            <div className="section">
              <h3>Skill Gaps & Guidance</h3>

              {data.skill_gaps.length === 0 && (
                <p>No major skill gaps 🎉</p>
              )}


              {data.skill_gaps.map((gap) => {
                const status =
                  gap.current_score >= gap.required_score * 0.6
                    ? "In Progress"
                    : "Needs Focus";

                return (
                  <div className="gap-panel" key={gap.skill}>
                    
                    {/* HEADER */}
                    <div className="gap-header">
                      <h4>{gap.skill}</h4>
                      <span
                        className={`gap-status ${
                          status === "In Progress" ? "progress" : "focus"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    {/* REQUIRED */}
                    <p className="required-text">
                      Required: {gap.required_score}%
                    </p>

                    {/* GUIDANCE */}
                    <ul className="guidance-list">
                      <li>{gap.guidance.study}</li>
                      <li>{gap.guidance.practice}</li>
                      <li>{gap.guidance.project}</li>
                    </ul>
                  </div>
                );
              })}

            </div>
          </>
        )}
      </div>
    </div>  
  );

}
