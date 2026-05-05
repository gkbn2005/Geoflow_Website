import { useState } from "react";
import {
  LayoutDashboard,
  Map,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Search,
  User
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

  const stats = [
    { label: "Total Leaks", value: "124" },
    { label: "Active Leaks", value: "56" },
    { label: "Resolved Today", value: "18" },
    { label: "Avg Response Time", value: "2.4h" },
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
    { id: "GF-1023", location: "Balboa Blvd", severity: "high" },
    { id: "GF-1022", location: "Maple St", severity: "medium" },
    { id: "GF-1021", location: "Cedar Ave", severity: "low" },
  ];

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "map", icon: Map, label: "Map View" },
    { id: "reports", icon: FileText, label: "Reports" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 style={{ color: "#1a9ba8", marginBottom: 20 }}>GeoFlow</h2>

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
          <LogOut size={18} /> Logout
        </div>
      </div>

      {/* MAIN */}
      <div className="main-content">

        {/* TOPBAR */}
        <div className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Search />
            <input className="search-input" placeholder="Search Reports..." />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <User /> Admin
          </div>
        </div>

        {/* CONTENT */}
        <div className="dashboard-scroll">

          {/* STATS */}
          <div className="dashboard-section">
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="card p-5">
                  <p className="stat-label">{s.label}</p>
                  <h2 className="stat-value">{s.value}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* CHARTS */}
          <div className="dashboard-section">
            <div className="charts-grid">

              <div className="card chart-card">
                <h3 className="section-title">Leaks This Week</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid stroke="#eee" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="leaks" stroke="#1a9ba8" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="card chart-card">
                <h3 className="section-title">Status Distribution</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80}>
                      {pieData.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 space-y-2">
                  {pieData.map((p, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: p.color }}></span>
                        {p.name}
                      </div>
                      <span>{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RECENT */}
          <div className="dashboard-section">
            <div className="card p-5">
              <h3 className="section-title">Recent Leak Detections</h3>

              {recentLeaks.map((l) => (
                <div key={l.id} className="list-item">
                  <div>
                    <p style={{ fontWeight: 600 }}>{l.id}</p>
                    <p style={{ fontSize: 13, color: "#5b6b7a" }}>{l.location}</p>
                  </div>

                  <span className={`badge ${l.severity}`}>
                    {l.severity}
                  </span>

                  <button className="btn-primary">View</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}