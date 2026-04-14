import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";

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

function LoginPage() {
  return <Login />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;