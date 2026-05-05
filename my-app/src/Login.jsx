import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Dashboard from "./Dashboard";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!username || !password) {
     alert("Please fill in all fields");
     return;
   }

   try {
     const res = await fetch("http://127.0.0.1:8000/api/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email: username, // IMPORTANT: backend expects email
         password: password,
       }),
     });

     const data = await res.json();

     if (res.ok && data.token) {
       localStorage.setItem("token", data.token);

       console.log("Login success");

       navigate("/Dashboard");
     } else {
       alert(data.message || "Login failed");
     }
   } catch (err) {
     console.error("Email or Password is Incorrect!", err);
     alert("Server error (check Laravel)");
   }
 };

  return (
    <div
      className="animated-bg"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🔵 BLOBS */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

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
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "12px",
              background: "transparent",
              color: "#0ea5e9",
              border: "1px solid #0ea5e9",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}