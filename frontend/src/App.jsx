import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Assessment from "./pages/Assessment";
import ResumeUpload from "./pages/ResumeUpload";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
             <Assessment />
            </ProtectedRoute>
          }
        />
        <Route
         path="/resume"
         element={
          <ProtectedRoute>
           <ResumeUpload />
           </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
