import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* login */}
        <Route path="/login" element={<Login />} />


        {/* signup (if you have it) */}
        <Route path="/signup" element={<Signup />} />

        {/* <Route path="/signup" element={<Signup />} /> */}

        {/* PROTECTED DASHBOARD */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;