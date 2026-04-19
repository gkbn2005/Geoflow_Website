import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Search,
  User,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin
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
  const [activeTab, setActiveTab] = useState("dashboard");

  // ===================== DATA =====================
  const stats = [
    { label: "Total Leaks", value: "124", change: "+12%", trend: "up", color: "#6366f1", icon: AlertCircle },
    { label: "Active Leaks", value: "56", change: "+8%", trend: "up", color: "#ef4444", icon: AlertCircle },
    { label: "Resolved Today", value: "18", change: "+5%", trend: "up", color: "#22c55e", icon: CheckCircle2 },
    { label: "Avg Response Time", value: "2.4h", change: "-15%", trend: "down", color: "#0ea5e9", icon: Clock },
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
    { id: "GF-1023", location: "Balboa Blvd", severity: "High", time: "Just now" },
    { id: "GF-1022", location: "Maple St", severity: "Medium", time: "10 mins ago" },
    { id: "GF-1021", location: "Cedar Ave", severity: "Low", time: "1 hour ago" },
    { id: "GF-1020", location: "Pine Rd", severity: "High", time: "2 hours ago" },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High": return "#ef4444";
      case "Medium": return "#f59e0b";
      case "Low": return "#22c55e";
      default: return "#94a3b8";
    }
  };

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "map", icon: Map, label: "Map View" },
    { id: "reports", icon: FileText, label: "Reports" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  // ===================== DASHBOARD UI =====================
  const DashboardHome = () => (
    <div className="p-6">

      {/* HEADER */}
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Welcome back, Admin</h1>
      <p style={{ color: "#5b6b7a" }}>Overview of system activity</p>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4" style={{ marginTop: 20 }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ padding: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <s.icon style={{ color: s.color }} />
              <span>{s.change}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: "#5b6b7a" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-3 gap-4" style={{ marginTop: 20 }}>

        <div className="card p-4" style={{ gridColumn: "span 2" }}>
          <h3>Leaks This Week</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid stroke="#eee" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line dataKey="leaks" stroke="#1a9ba8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
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
      <div className="card p-4" style={{ marginTop: 20 }}>
        <h3>Recent Leaks</h3>

        {recentLeaks.map((l) => (
          <div
            key={l.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 12,
              borderBottom: "1px solid #eee"
            }}
          >
            <div>
              <strong>{l.id}</strong> - {l.location}
            </div>

            <div style={{ color: getSeverityColor(l.severity) }}>
              {l.severity}
            </div>
          </div>
        ))}
      </div>

    </div>
  );

  // ===================== MAIN UI =====================
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 style={{ color: "#1a9ba8" }}>GeoFlow</h2>

        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={18} />
            {item.label}
          </div>
        ))}

        <div style={{ marginTop: "auto" }} className="nav-item">
          <LogOut size={18} />
          Logout
        </div>
      </div>

      {/* MAIN */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          gap: "16px",
          background: "#f8fafb"
        }}
      >

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

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: "auto" }}>

          {activeTab === "dashboard" && <DashboardHome />}

          {activeTab === "map" && (
            <div style={{ padding: 20 }}>Map (not built yet)</div>
          )}

          {activeTab === "reports" && (
            <div style={{ padding: 20 }}>Reports (not built yet)</div>
          )}

          {activeTab === "analytics" && (
            <div style={{ padding: 20 }}>Analytics (not built yet)</div>
          )}

          {activeTab === "settings" && (
            <div style={{ padding: 20 }}>Settings (not built yet)</div>
          )}

        </div>
      </div>
    </div>
  );
}