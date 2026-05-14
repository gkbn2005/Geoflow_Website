import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  // ================= LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
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
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/Dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Email or Password is Incorrect");
    }
  };

  // ================= DIRECT RESET PASSWORD =================
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!resetEmail || !newPassword) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/reset-password-direct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: resetEmail,
            password: newPassword,
            password_confirmation: newPassword,
          }),
        }
      );

      const data = await res.json();

      console.log("RESET RESPONSE:", data); // 👈 DEBUG (important)

      // ❗ Laravel validation error handling (THIS was missing)
      if (!res.ok) {
        const errorMessage =
          data.message ||
          (data.errors
            ? Object.values(data.errors).flat().join(", ")
            : "Reset failed");

        setResetMessage(errorMessage);
        return;
      }

      setResetMessage("Password updated successfully.");

      setTimeout(() => {
        setShowReset(false);
        setResetEmail("");
        setNewPassword("");
        setResetMessage("");
      }, 1500);

    } catch (err) {
      console.error("Reset error:", err);
      setResetMessage("Something went wrong (server error)");
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
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

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

        {/* ================= LOGIN ================= */}
        {!showReset && (
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: "left", marginBottom: "15px" }}>
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
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

            {/* Forgot Password */}
            <button
              type="button"
              onClick={() => setShowReset(true)}
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
              Forgot Password?
            </button>

            {/* Signup */}
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
        )}

        {/* ================= RESET PASSWORD ================= */}
        {showReset && (
          <form onSubmit={handleResetPassword}>
            <div style={{ textAlign: "left", marginBottom: "15px" }}>
              <label>Email</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ textAlign: "left", marginBottom: "15px" }}>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
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
              Reset Password
            </button>

            <button
              type="button"
              onClick={() => setShowReset(false)}
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
              Back to Login
            </button>

            {resetMessage && (
              <p style={{ marginTop: 10, fontSize: 13, color: "#555" }}>
                {resetMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}