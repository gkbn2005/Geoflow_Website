import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Login";
import DashboardHome from "./Dashboard"; // 👈 IMPORTANT

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1>Welcome to GeoFlow</h1>

      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Go to Login
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root → login (cleaner flow) */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard (THIS WAS MISSING) */}
        <Route path="/dashboard" element={<DashboardHome />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;