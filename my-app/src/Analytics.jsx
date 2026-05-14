import React, { useState, useEffect } from "react";
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
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function Analytics() {
  // ================= BACKEND STATE =================
  const [analytics, setAnalytics] = useState(null);

  // ================= FETCH FROM LARAVEL =================
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/api/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      }
    };

    fetchAnalytics();
  }, []);

  // ================= DATA (FROM BACKEND) =================
  const pieData = analytics?.pie || [];
  const lineData = (analytics?.line || []).map((item) => ({
    ...item,
    leaks: Number(item.leaks),
  }));
  const barData = analytics?.bar || [];
  const highRisk = analytics?.highRisk || [];

  // ================= UI =================
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Analytics</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {/* PIE */}
        <div className="card" style={{ padding: 20 }}>
          <h3>Leak Distribution</h3>

          <div style={{ display: "flex", alignItems: "center" }}>
            <ResponsiveContainer width="60%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                >
                  {pieData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div>
              {pieData.map((item, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <span style={{ color: item.color }}>●</span> {item.name}
                  <div>
                    <strong>{item.value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HIGH RISK */}
        <div className="card" style={{ padding: 20 }}>
          <h3>High Risk Areas</h3>

          {highRisk.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 12,
                background: "#f5f5f5",
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <span>{item.name}</span>
              <strong>{item.count}</strong>
            </div>
          ))}
        </div>

        {/* LINE */}
        <div className="card" style={{ padding: 20 }}>
          <h3>Total Leaks in 6 months</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="leaks" stroke="#1a9ba8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="card" style={{ padding: 20 }}>
          <h3>Leak Distribution by Region</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leaks" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}