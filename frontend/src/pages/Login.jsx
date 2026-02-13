import { useState } from "react";
import api, { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Hexagon from "../assets/hexagon.svg";





export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async () => {
    // e.preventDefault(); // ⛔ stop page reload
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("username", email); // backend expects "username"
      formData.append("password", password);

      const res = await api.post("/users/login", formData);

      localStorage.setItem("token", res.data.access_token);

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* LEFT LOGIN CARD */}
      <motion.div
        className="login-card"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="logo-wrapper">
          <img src="/logo.svg" alt="Logo" />
        </div>

        <h2>Welcome Back</h2>
        {/* <form onSubmit={handleLogin}> */}
        <motion.div
          className="input-group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >


          <Mail size={18} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>


        <motion.div
          className="input-group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >

          <Lock size={18} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>


        <p className="forgot-text">Forgot password?</p>

        <motion.button
          onClick={handleLogin}
          disabled={loading}
          whileTap={{ scale: 0.97 }}
        >

          {loading ? "Logging in..." : "Login"}
        </motion.button>
        {/* </form> */}

        <p className="register-text">
          Don’t have an account?
          <span onClick={() => navigate("/register")}> Register/Create account</span>
        </p>
      </motion.div>


      {/* RIGHT SIDE PANEL */}
      <div className="login-visual">

        <motion.div
          className="cube-wrapper"
          animate={{ 
            // Rotate 15deg, back to 0, -15deg, back to 0
            rotate: [0, 15, 0, -15, 0] 
            
          }}
          transition={{
            duration: 10.5,
            ease: "easeInOut",
            repeat: Infinity, // Repeat indefinitely
            repeatDelay: 0.5 // Optional: Pause between full cycles
          }}
          
        >
          <img src={Hexagon} alt="AI Network Structure" />
        </motion.div>


        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Unlock Your Potential
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          AI-Driven Skill Pathways
        </motion.p>

      </div>

    </div>
  );

}
