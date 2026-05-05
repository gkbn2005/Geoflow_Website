import React, { useState } from "react";

export default function Reports() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [openMenu, setOpenMenu] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const reportsData = [
    {
      id: "GF-1023",
      type: "Active Leak",
      confidence: 95,
      location: "Balboa Blvd",
      status: "Under Review",
      time: "2026-05-05",
    },
    {
      id: "GF-0987",
      type: "Early Leak",
      confidence: 78,
      location: "Maple St",
      status: "Pending",
      time: "2026-05-04",
    },
    {
      id: "GF-0542",
      type: "Possible Deterioration",
      confidence: 85,
      location: "Cedar Ave",
      status: "Verified",
      time: "2026-05-03",
    },
  ];

  const filteredReports = reportsData.filter((r) => {
    const matchSearch =
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());

    const matchType = selectedType === "All" || r.type === selectedType;
    const matchStatus = selectedStatus === "All" || r.status === selectedStatus;

    const reportDate = new Date(r.time);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchDate =
      (!start || reportDate >= start) &&
      (!end || reportDate <= end);

    return matchSearch && matchType && matchStatus && matchDate;
  });

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

  const exportCSV = () => {
    const header = "ID,Type,Confidence,Location,Status,Time\n";
    const rows = filteredReports
      .map(
        (r) =>
          `${r.id},${r.type},${r.confidence},${r.location},${r.status},${r.time}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.csv";
    a.click();
  };

  return (
    <div style={{ padding: 20, background: "#f9fafb", minHeight: "100vh" }}>
      {/* HEADER */}
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
          border: "1px solid #ddd",
          marginBottom: 20,
        }}
      />

      {/* FILTER BAR */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>

        {/* LEAK TYPE */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setOpenMenu(openMenu === "type" ? "" : "type")} className="btn">
            Leak Type ▼
          </button>

          {openMenu === "type" && (
            <div style={dropdownStyle}>
              {["All", "Active Leak", "Early Leak", "Possible Deterioration"].map((t) => (
                <div
                  key={t}
                  onClick={() => {
                    setSelectedType(t);
                    setOpenMenu("");
                  }}
                  style={itemStyle}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STATUS */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setOpenMenu(openMenu === "status" ? "" : "status")} className="btn">
            Status ▼
          </button>

          {openMenu === "status" && (
            <div style={dropdownStyle}>
              {["All", "Verified", "Pending", "Under Review"].map((s) => (
                <div
                  key={s}
                  onClick={() => {
                    setSelectedStatus(s);
                    setOpenMenu("");
                  }}
                  style={itemStyle}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DATE RANGE */}
        <div style={{ position: "relative" }}>
          <button
            className="btn"
            onClick={() => setOpenMenu(openMenu === "date" ? "" : "date")}
          >
            Date Range ▼
          </button>

          {openMenu === "date" && (
            <div style={dropdownStyle}>
              <div style={{ padding: 10 }}>
                <label>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: "100%", marginBottom: 10 }}
                />

                <label>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ width: "100%" }}
                />

                <button
                  onClick={() => setOpenMenu("")}
                  style={{
                    marginTop: 10,
                    width: "100%",
                    padding: 8,
                    background: "#1a9ba8",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* EXPORT */}
        <button className="btn" onClick={exportCSV}>
          Export CSV
        </button>
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
                  <span style={{ padding: "6px 10px", borderRadius: 20, fontSize: 12, ...getTypeStyle(r.type) }}>
                    {r.type}
                  </span>
                </td>

                <td>{r.confidence}%</td>
                <td>{r.location}</td>

                <td>
                  <span style={{ padding: "6px 10px", borderRadius: 20, fontSize: 12, ...getStatusStyle(r.status) }}>
                    {r.status}
                  </span>
                </td>

                <td>{r.time}</td>

                <td>
                  <button
                    onClick={() => setSelectedReport(r)}
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

      {/* MODAL */}
      {selectedReport && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h2 style={{ marginBottom: 10 }}>Report Details</h2>

            <p><b>ID:</b> {selectedReport.id}</p>
            <p><b>Type:</b> {selectedReport.type}</p>
            <p><b>Confidence:</b> {selectedReport.confidence}%</p>
            <p><b>Location:</b> {selectedReport.location}</p>
            <p><b>Status:</b> {selectedReport.status}</p>
            <p><b>Date:</b> {selectedReport.time}</p>

            <button
              onClick={() => setSelectedReport(null)}
              style={closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* styles (DASHBOARD UPGRADE - MODERN SAAS LOOK) */

const dropdownStyle = {
  position: "absolute",
  top: 48,
  left: 0,
  background: "#ffffff",
  border: "1px solid #eef0f3",
  borderRadius: 14,
  width: 260,
  zIndex: 10,
  boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
  overflow: "hidden",
};

const itemStyle = {
  padding: "14px 16px",
  cursor: "pointer",
  fontSize: 14,
  background: "#fff",
  transition: "all 0.2s ease",
  borderBottom: "1px solid #f3f4f6",
  fontWeight: 500,
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(15, 23, 42, 0.55)",
  backdropFilter: "blur(6px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalBox = {
  background: "#ffffff",
  padding: 30,
  borderRadius: 18,
  width: 460,
  boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  animation: "popIn 0.18s ease-out",
  border: "1px solid #f1f5f9",
};

const closeBtn = {
  marginTop: 20,
  padding: "12px 14px",
  border: "none",
  borderRadius: 12,
  background: "linear-gradient(135deg, #6366f1, #1a9ba8)",
  color: "#fff",
  cursor: "pointer",
  width: "100%",
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: "0.3px",
  boxShadow: "0 8px 20px rgba(99,102,241,0.25)",
};