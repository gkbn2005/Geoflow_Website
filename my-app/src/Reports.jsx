import React, { useState } from "react";

export default function Reports() {
  const [search, setSearch] = useState("");

  const reportsData = [
    {
      id: "GF-1023",
      type: "Active Leak",
      confidence: 95,
      location: "Balboa Blvd",
      status: "Under Review",
      time: "Just now",
    },
    {
      id: "GF-0987",
      type: "Early Leak",
      confidence: 78,
      location: "Maple St",
      status: "Pending",
      time: "10 mins ago",
    },
    {
      id: "GF-0542",
      type: "Possible Deterioration",
      confidence: 85,
      location: "Cedar Ave",
      status: "Verified",
      time: "Yesterday",
    },
  ];

  const filteredReports = reportsData.filter((r) =>
    r.location.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  const getTypeStyle = (type) => {
    switch (type) {
      case "Active Leak":
        return { background: "#fee2e2", color: "#b91c1c" };
      case "Early Leak":
        return { background: "#fef3c7", color: "#92400e" };
      case "Possible Deterioration":
        return { background: "#e0f2fe", color: "#075985" };
      default:
        return { background: "#e5e7eb", color: "#374151" };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Verified":
        return { background: "#dcfce7", color: "#166534" };
      case "Pending":
        return { background: "#f3f4f6", color: "#374151" };
      case "Under Review":
        return { background: "#e0f2fe", color: "#075985" };
      default:
        return { background: "#e5e7eb", color: "#374151" };
    }
  };

  return (
    <div style={{ padding: 20 }}>

      {/* TITLE */}
      <h2 style={{ fontSize: 24, fontWeight: 700 }}>Reports</h2>
      <p style={{ color: "#6b7280", marginBottom: 20 }}>
        Manage and track leak detection reports
      </p>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by Location or Report ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 10,
          width: "300px",
          borderRadius: 8,
          border: "1px solid #ccc",
          marginBottom: 20,
        }}
      />

      {/* FILTER BUTTONS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button className="btn">Leak Type</button>
        <button className="btn">Status</button>
        <button className="btn">Date Range</button>
        <button className="btn">Export</button>
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 15 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
              <th>ID</th>
              <th>Leak Type</th>
              <th>Confidence</th>
              <th>Location</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                <td>{r.id}</td>

                <td>
                  <span
                    style={{
                      padding: "6px 10px",
                      borderRadius: 20,
                      fontSize: 12,
                      ...getTypeStyle(r.type),
                    }}
                  >
                    {r.type}
                  </span>
                </td>

                <td>{r.confidence}%</td>

                <td>{r.location}</td>

                <td>
                  <span
                    style={{
                      padding: "6px 10px",
                      borderRadius: 20,
                      fontSize: 12,
                      ...getStatusStyle(r.status),
                    }}
                  >
                    {r.status}
                  </span>
                </td>

                <td>{r.time}</td>

                <td>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      border: "none",
                      background: "#1a9ba8",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}