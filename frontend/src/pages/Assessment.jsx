import { useEffect, useState } from "react";
import api from "../services/api";
import "./Assessment.css";
import { useNavigate } from "react-router-dom";


export default function Assessment() {
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    api.get("/skills").then((res) => setSkills(res.data));
  }, []);

  const loadQuestions = async (skill) => {
    setSelectedSkill(skill);
    setResult(null);

    const res = await api.get(`/questions/${skill.id}`);
    setQuestions(res.data);
    setAnswers({});
  };

  const submitAnswers = async () => {
    const payload = Object.keys(answers).map((qid) => ({
      question_id: Number(qid),
      answer: answers[qid],
    }));

    try {
      const res = await api.post(
        `/questions/submit/${selectedSkill.id}`,
        payload
      );

      setResult(res.data);

    } catch (error) {
      console.error(error);
      alert("Failed to submit assessment");
    }
  };

  return (
    <div className="layout">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <div className="brand">SR</div>

          <nav>
            <div 
              className="skill_asses_button"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Dashboard
            </div>
            <div 
              className="skill_asses_button active"
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
      <div className="assessment-container">

        
        {/* SKILL SELECTION */}
        {!selectedSkill && (
          
          <div className="skill-select">
            
            <div className="assessment-header">
              <div>
                <h2>Skill Assessment</h2>
                <p>Select a skill to begin your evaluation.</p>
              </div>

              <input
                type="text"
                placeholder="Search"
                className="skill-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            {/* SKILLS */}
            
            <div className="skills-grid">
              
              {skills
                .filter(skill =>
                  skill.name.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 60)
                .map((skill) => (

                <div className="skill-card" key={skill.id}>
                  <div className="skill-info">
                    {/* <div className="skill-icon">⚡</div> */}
                    <h4>{skill.name}</h4>
                  </div>

                  <button
                    className="start-btn"
                    onClick={() => loadQuestions(skill)}
                  >
                    Start Assessment
                  </button>
                </div>
              ))}
            </div>

          </div>

        )}

        {/* QUESTIONS */}
        {selectedSkill && !result && (
          <div className="question-section">
            <h3>{selectedSkill.name} Assessment</h3>

            {questions.map((q, index) => (
              <div className="question-card" key={q.id}>
                <p>
                  <strong>Q{index + 1}.</strong> {q.question_text}
                </p>

                <input
                  type="text"
                  placeholder="Your answer"
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [q.id]: e.target.value,
                    })
                  }
                />
              </div>
            ))}

            <button
              className="submit-btn"
              onClick={submitAnswers}
              disabled={questions.length === 0}
            >
              Submit Assessment
            </button>
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="result-card">
            <h3>Assessment Result</h3>

            <h1>{result.score}%</h1>

            <p>
              Correct: {result.correct} / {result.total}
            </p>

            <div className="result-actions">
              <button onClick={() => setSelectedSkill(null)}>
                Take Another Skill
              </button>

              <button
                className="resume-btn"
                onClick={() => navigate("/resume")}
              >
                Upload Resume
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  );

}
