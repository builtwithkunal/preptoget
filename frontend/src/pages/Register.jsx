import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import Hexagon from "../assets/hexagon.svg";
import { setAuthToken } from "../services/api";


export default function Register() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // const handleRegister = async () => {
  //   try {
  //     const res = await api.post("/users/register", {
  //       email: email,
  //       password: password,
  //     });

  //     const token = res.data.access_token;

  //     localStorage.setItem("token", token);
  //     setAuthToken(token);
  //     navigate("/assessment"); // direct jump
  //   } catch (err) {
  //     alert("Registration failed");
  //     console.error(err);
  //   }
  // };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const res = await api.post("/users/register", {
        email: email,
        password: password,
      });

      const token = res.data.access_token;

      localStorage.setItem("token", token);
      setAuthToken(token);
      navigate("/assessment");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-container">

      {/* LEFT REGISTER CARD */}
      <motion.div
        className="login-card"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo-wrapper">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <h2>Create Account</h2>
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
        <motion.button
          onClick={handleRegister}
          disabled={loading}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? "Creating account..." : "Register"}
        </motion.button>
        <p className="register-text">
          Already have an account?
          <span onClick={() => navigate("/")}> Login</span>
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
          Start Your Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Build Skills. Get Ready. Get Hired.
        </motion.p>
      </div>

    </div>
  );

}
