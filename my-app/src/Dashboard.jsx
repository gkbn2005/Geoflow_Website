import Reports from "./Reports";

import { useNavigate, Routes, Route } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  FileText,
  BarChart3,
  Settings,
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

  // ===================== DATA =====================
  const stats = [
    { label: "Total Leaks", value: "124", change: "+12%", color: "#6366f1", icon: AlertCircle },
    { label: "Active Leaks", value: "56", change: "+8%", color: "#ef4444", icon: AlertCircle },
    { label: "Resolved Today", value: "18", change: "+5%", color: "#22c55e", icon: CheckCircle2 },
    { label: "Avg Response Time", value: "2.4h", change: "-15%", color: "#0ea5e9", icon: Clock },
  ];

  const lineData = [
    { day: "Mon", leaks: 12 },
    { day: "Tue", leaks: 18 },
    { day: "Wed", leaks: 15 },
    { day: "Thu", leaks: 22 },
    { day: "Fri", leaks: 19 },
    { day: "Sat", leaks: 16 },
    { day: "Sun", leaks: 14 },
  ];

  const pieData = [
    { name: "Active", value: 56, color: "#ef4444" },
    { name: "Early", value: 34, color: "#f59e0b" },
    { name: "Resolved", value: 34, color: "#22c55e" },
  ];

  const recentLeaks = [
    { id: "GF-1023", location: "Balboa Blvd", severity: "High" },
    { id: "GF-1022", location: "Maple St", severity: "Medium" },
    { id: "GF-1021", location: "Cedar Ave", severity: "Low" },
  ];

  const getSeverityColor = (s) =>
    s === "High" ? "#ef4444" :
    s === "Medium" ? "#f59e0b" :
    "#22c55e";

  // ===================== DASHBOARD HOME =====================
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

  // ===================== MAIN =====================
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
          <Settings size={18} /> Settings
        </div>

        <div className="nav-item" style={{ marginTop: "auto" }}>
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

        {/* ROUTES (IMPORTANT FIX - NO WHITE PAGE) */}
        <div style={{ padding: 24, overflow: "auto" }}>

          <Routes>

            {/* Dashboard Home */}
            <Route index element={<DashboardHome />} />
            <Route path="reports" element={<Reports />} />
            {/* PLACEHOLDER PAGES */}
            <Route path="map" element={<h2>Map Page (Coming Soon)</h2>} />
            <Route path="analytics" element={<h2>Analytics Page (Coming Soon)</h2>} />
            <Route path="settings" element={<h2>Settings Page (Coming Soon)</h2>} />

          </Routes>

        </div>
      </div>
    </div>
  );
}