import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";

// Sample data
const leaks = [
  { id: 1, lat: 14.5995, lng: 120.9842, status: "Active" },
  { id: 2, lat: 14.601, lng: 120.982, status: "Early" },
  { id: 3, lat: 14.598, lng: 120.986, status: "Resolved" },
];

// Marker colors
const getColor = (status) => {
  switch (status) {
    case "Active": return "red";
    case "Early": return "orange";
    case "Resolved": return "green";
    default: return "gray";
  }
};

export default function MapView() {
  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>

      {/* LEGEND (OVERLAY) */}
      <div className="map-legend">
        <span><span style={{ color: "red" }}>●</span> Active Leak</span>
        <span><span style={{ color: "orange" }}>●</span> Early Leak</span>
        <span><span style={{ color: "green" }}>●</span> No Leak</span>
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

        {leaks.map((leak) => (
          <div key={leak.id}>
            {/* Marker */}
            <Marker position={[leak.lat, leak.lng]}>
              <Popup>
                Leak #{leak.id} <br />
                Status: {leak.status}
              </Popup>
            </Marker>

            {/* Glow circle */}
            <Circle
              center={[leak.lat, leak.lng]}
              radius={120}
              pathOptions={{
                color: getColor(leak.status),
                fillOpacity: 0.15
              }}
            />

            {/* Inner circle */}
            <Circle
              center={[leak.lat, leak.lng]}
              radius={60}
              pathOptions={{
                color: getColor(leak.status),
                fillOpacity: 0.4
              }}
            />
          </div>
        ))}
      </MapContainer>
    </div>
  );
}