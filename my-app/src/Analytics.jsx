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

  // ================= DATA =================
  const pieData = [
    { name: "Active Leak", value: 56, color: "#ef4444" },
    { name: "Early Leak", value: 34, color: "#f59e0b" },
    { name: "Fixed Leak", value: 34, color: "#22c55e" },
  ];

  const lineData = [
    { month: "Jan", leaks: 18 },
    { month: "Feb", leaks: 22 },
    { month: "Mar", leaks: 28 },
    { month: "Apr", leaks: 24 },
    { month: "May", leaks: 32 },
    { month: "Jun", leaks: 38 },
  ];

  const barData = [
    { region: "North", leaks: 45 },
    { region: "East", leaks: 32 },
    { region: "South", leaks: 28 },
    { region: "West", leaks: 50 },
  ];

  const highRisk = [
    { name: "Balboa Blvd", count: 12 },
    { name: "Maple Street", count: 9 },
    { name: "Cedar Ave", count: 8 },
    { name: "Pine Road", count: 7 },
    { name: "Lakeview Dr", count: 6 },
  ];

  // ================= UI =================
  return (
    <div>

      <h2 style={{ marginBottom: 20 }}>Analytics</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

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

            {/* LEGEND */}
            <div>
              {pieData.map((item, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <span style={{ color: item.color }}>●</span> {item.name}
                  <div><strong>{item.value}</strong></div>
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
                marginTop: 10
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