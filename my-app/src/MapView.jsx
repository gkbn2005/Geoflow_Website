import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

// ================= FIX MARKER ICON ISSUE =================
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ================= STATUS COLOR =================
const getColor = (status) => {
  switch (status) {
    case "Active Leak":
    case "Active":
      return "red";

    case "Early Leak":
    case "Early":
      return "orange";

    case "Resolved":
      return "green";

    default:
      return "gray";
  }
};

export default function MapView() {
  const [leaks, setLeaks] = useState([]);

  // ================= FETCH REPORTS =================
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/api/reports", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();

        console.log("REPORTS:", data); // 👈 IMPORTANT DEBUG

        const mapped = data.map((r) => ({
          id: r.id,
          report_id: r.report_id,
          lat: Number(r.lat),
          lng: Number(r.lng),
          status: r.type || r.status,
        }));

        setLeaks(mapped);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>

      {/* LEGEND */}
      <div className="map-legend">
        <span><span style={{ color: "red" }}>●</span> Active Leak</span>
        <span><span style={{ color: "orange" }}>●</span> Early Leak</span>
        <span><span style={{ color: "green" }}>●</span> Resolved</span>
      </div>

      {/* MAP */}
      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={15}
        style={{ height: "80vh", borderRadius: "12px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ================= MARKERS (FIXED: NO DIV WRAPPER) ================= */}
        {leaks.map((leak) => (
          <Marker key={leak.id} position={[leak.lat, leak.lng]}>
            <Popup>
              Report #{leak.report_id} <br />
              Status: {leak.status}
            </Popup>

            <Circle
              center={[leak.lat, leak.lng]}
              radius={120}
              pathOptions={{
                color: getColor(leak.status),
                fillOpacity: 0.15,
              }}
            />

            <Circle
              center={[leak.lat, leak.lng]}
              radius={60}
              pathOptions={{
                color: getColor(leak.status),
                fillOpacity: 0.4,
              }}
            />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}