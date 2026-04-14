import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ LOGIN FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    // 🔐 Replace with backend later
    if (username === "admin" && password === "1234") {
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(270deg, #e6f6ff, #dff3ff, #dbeafe)",
        backgroundSize: "600% 600%",
        animation: "gradientMove 10s ease infinite",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🔵 FLOATING BLOBS */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#0ea5e9",
          borderRadius: "50%",
          filter: "blur(120px)",
          top: "10%",
          left: "10%",
          animation: "float 8s ease-in-out infinite",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#60a5fa",
          borderRadius: "50%",
          filter: "blur(120px)",
          bottom: "10%",
          right: "10%",
          animation: "float 10s ease-in-out infinite",
        }}
      ></div>

      {/* LOGIN CARD */}
      <div
        style={{
          width: "420px",
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LOGO */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto",
              borderRadius: "50%",
              background: "#0ea5e9",
            }}
          ></div>

          <h1 style={{ fontSize: "32px", margin: "10px 0" }}>
            GeoFlow
          </h1>

          <p style={{ fontSize: "14px", color: "#6b6b6b" }}>
            SMART FIELD REPORTING
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "left", marginBottom: "15px" }}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#0ea5e9",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}