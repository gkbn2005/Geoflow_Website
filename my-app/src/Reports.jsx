import React, { useState, useEffect } from "react";

export default function Reports() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [openMenu, setOpenMenu] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  // ✅ LARAVEL DATA
  const [reportsData, setReportsData] = useState([]);

  // ✅ LOADING STATE (NEW)
  const [loading, setLoading] = useState(true);

  // ✅ FETCH REPORTS FROM LARAVEL
  const fetchReports = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/api/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      setReportsData(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://127.0.0.1:8000/api/reports/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        console.error("Failed to update status");
        return;
      }

      setReportsData((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: newStatus } : r
        )
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ================= FILTERS =================
  const filteredReports = reportsData.filter((r) => {
    const matchSearch =
      (r.location || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.report_id || "").toLowerCase().includes(search.toLowerCase());

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

  // ================= STYLES =================
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

  // ================= EXPORT =================
  const exportCSV = () => {
    const header = "ID,Type,Confidence,Location,Status,Time\n";

    const rows = filteredReports
      .map(
        (r) =>
          `${r.report_id},${r.type},${r.confidence},${r.location},${r.status},${r.time}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "reports.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 20, background: "#f9fafb", minHeight: "100vh" }}>
      {/* LOADING OVERLAY (NEW - NO STYLE CHANGES) */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 50,
                height: 50,
                border: "5px solid #e5e7eb",
                borderTop: "5px solid #1a9ba8",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto",
              }}
            />
            <p style={{ marginTop: 10, color: "#6b7280" }}>
              Loading reports...
            </p>
          </div>

          {/* SPIN ANIMATION */}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

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
        {/* TYPE */}
        <div style={{ position: "relative" }}>
          <button className="btn-primary" onClick={() => setOpenMenu(openMenu === "type" ? "" : "type")}>
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
          <button className="btn-primary" onClick={() => setOpenMenu(openMenu === "status" ? "" : "status")}>
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

        {/* DATE */}
        <div style={{ position: "relative" }}>
          <button className="btn-primary" onClick={() => setOpenMenu(openMenu === "date" ? "" : "date")}>
            Date Range ▼
          </button>

          {openMenu === "date" && (
            <div style={dropdownStyle}>
              <div style={{ padding: 10 }}>
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: "100%", marginBottom: 10 }} />

                <label>End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: "100%" }} />

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
        <button className="btn-primary" onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      {/* TABLE */}
      <div style={{ background: "#fff", borderRadius: 10, padding: 35 }}>
        <table className="report-table" style={{ width: "100%" }}>
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
            {!loading &&
              filteredReports.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td>{r.report_id}</td>
                  <td>
                    <span style={{ padding: "6px 10px", borderRadius: 20, fontSize: 12, ...getTypeStyle(r.type) }}>
                      {r.type}
                    </span>
                  </td>
                  <td>{r.confidence}%</td>
                  <td>{r.location}</td>
                  <td>
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 20,
                        fontSize: 12,
                        border: "1px solid #ddd",
                        outline: "none",
                        ...getStatusStyle(r.status),
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Verified">Verified</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </td>
                  <td>{r.time}</td>
                  <td>
                    <button onClick={() => setSelectedReport(r)} style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#1a9ba8", color: "#fff" }}>
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
            <p><b>ID:</b> {selectedReport.report_id}</p>
            <p><b>Type:</b> {selectedReport.type}</p>
            <p><b>Confidence:</b> {selectedReport.confidence}%</p>
            <p><b>Location:</b> {selectedReport.location}</p>
            <p><b>Status:</b> {selectedReport.status}</p>
            <p><b>Date:</b> {selectedReport.time}</p>

            <button onClick={() => setSelectedReport(null)} style={closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}