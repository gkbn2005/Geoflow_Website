import { useNavigate, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Reports from "./Reports";
import Analytics from "./Analytics";
import MapView from "./MapView";
import Settings from "./Settings";

import {
  LayoutDashboard,
  Map,
  FileText,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Search,
  User,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // ================= BACKEND STATE =================
  const [dashboardData, setDashboardData] = useState(null);

  // ================= FETCH DASHBOARD =================
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchDashboard();
  }, []);

  // ================= DATA FROM BACKEND =================
  const stats = dashboardData?.stats || [];
  const lineData = dashboardData?.lineData || [];
  const pieData = dashboardData?.pieData || [];
  const recentLeaks = dashboardData?.recentLeaks || [];

  const getSeverityColor = (s) =>
    s === "High" ? "#ef4444" :
    s === "Medium" ? "#f59e0b" :
    "#22c55e";

  // ================= DASHBOARD HOME =================
  const DashboardHome = () => (
    <div>

      <h1>Welcome back, Admin</h1>
      <p>Overview of system activity</p>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 20 }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <s.icon color={s.color} />
            <h2>{s.value}</h2>
            <p>{s.label}</p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginTop: 20 }}>

        <div className="card" style={{ padding: 20 }}>
          <h3>Leaks This Week</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line dataKey="leaks" stroke="#1a9ba8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3>Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80}>
                {pieData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* RECENT */}
      <div className="card" style={{ marginTop: 20, padding: 20 }}>
        <h3>Recent Leaks</h3>

        {recentLeaks.map((l) => (
          <div key={l.id} style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
            <span>{l.id} - {l.location}</span>
            <span style={{ color: getSeverityColor(l.severity) }}>
              {l.severity}
            </span>
          </div>
        ))}
      </div>

    </div>
  );

  // ================= MAIN =================
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 style={{ color: "#1a9ba8", marginBottom: 20 }}>GeoFlow</h2>

        <div className="nav-item" onClick={() => navigate("/dashboard")}>
          <LayoutDashboard size={18} /> Dashboard
        </div>

        <div className="nav-item" onClick={() => navigate("/dashboard/map")}>
          <Map size={18} /> Map View
        </div>

        <div className="nav-item" onClick={() => navigate("/dashboard/reports")}>
          <FileText size={18} /> Reports
        </div>

        <div className="nav-item" onClick={() => navigate("/dashboard/analytics")}>
          <BarChart3 size={18} /> Analytics
        </div>

        <div className="nav-item" onClick={() => navigate("/dashboard/settings")}>
          <SettingsIcon size={18} /> Settings
        </div>

        <div className="nav-item" style={{ marginTop: "auto" }} onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* TOPBAR */}
        <div className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Search />
            <input className="search-input" placeholder="Search..." />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <User />
            Admin
          </div>
        </div>

        {/* ROUTES */}
        <div style={{ padding: 24, overflow: "auto" }}>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="reports" element={<Reports />} />
            <Route path="map" element={<MapView />} />
            <Route path="settings" element={<Settings />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}