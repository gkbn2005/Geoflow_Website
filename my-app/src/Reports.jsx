import React, { useState, useEffect } from "react";

export default function Reports() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [openMenu, setOpenMenu] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  // ✅ THIS IS THE IMPORTANT PART (REAL DATA FROM LARAVEL)
  const [reportsData, setReportsData] = useState([]);

  // ✅ FETCH FROM LARAVEL BACKEND
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reports")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setReportsData(data); // store in state
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredReports = reportsData.filter((r) => {
    const matchSearch =
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.report_id.toLowerCase().includes(search.toLowerCase());

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
      <h2>Reports</h2>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div style={{ background: "#fff", padding: 20, marginTop: 20 }}>
        <table className="report-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Confidence</th>
              <th>Location</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id}>
                <td>{r.report_id}</td>
                <td>{r.type}</td>
                <td>{r.confidence}%</td>
                <td>{r.location}</td>
                <td>{r.status}</td>
                <td>{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={exportCSV}>Export CSV</button>
    </div>
  );
}