import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Ruler,
  RefreshCw,
  Zap,
  Bell,
  Shield,
  User,
  Lock
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("General");

  const [settings, setSettings] = useState({
    serviceArea: "Los Angeles, CA",
    timezone: "Pacific Time (PT)",
    units: "Imperial (ft, gal)",
    update: "Real-time",
    automation: true,

    alertThreshold: "High Only",
    autoAssign: true,
    notifications: true,

    email: "admin@geoflow.com",
    twoFactor: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ padding: 20 }}>

      {/* SEARCH */}
      <input
        className="search-input"
        placeholder="Search in Settings..."
        style={{ width: "100%", marginBottom: 20 }}
      />

      {/* TABS */}
      <div className="tabs">
        {["General", "Leak Reports", "User Data & Security"].map((tab) => (
          <span
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* CARD */}
      <div className="card" style={{ padding: 20 }}>

        {/* ================= GENERAL ================= */}
        {activeTab === "General" && (
          <>
            <SettingRow
              icon={<MapPin />}
              label="Service area"
              value={settings.serviceArea}
              onClick={() => {
                const val = prompt("Enter Service Area:", settings.serviceArea);
                if (val) updateSetting("serviceArea", val);
              }}
            />

            <SettingRow
              icon={<Clock />}
              label="Time Zone"
              value={settings.timezone}
              onClick={() => {
                const val = prompt("Enter Time Zone:", settings.timezone);
                if (val) updateSetting("timezone", val);
              }}
            />

            <SettingRow
              icon={<Ruler />}
              label="Measurement Units"
              value={settings.units}
              onClick={() => {
                const val = prompt("Enter Units:", settings.units);
                if (val) updateSetting("units", val);
              }}
            />

            <SettingRow
              icon={<RefreshCw />}
              label="Update Frequency"
              value={settings.update}
              onClick={() => {
                const val = prompt("Enter Update Frequency:", settings.update);
                if (val) updateSetting("update", val);
              }}
            />

            <ToggleRow
              icon={<Zap />}
              label="Enable System Automation"
              value={settings.automation}
              onToggle={() =>
                updateSetting("automation", !settings.automation)
              }
            />
          </>
        )}

        {/* ================= LEAK REPORTS ================= */}
        {activeTab === "Leak Reports" && (
          <>
            <SettingRow
              icon={<Bell />}
              label="Alert Threshold"
              value={settings.alertThreshold}
              onClick={() => {
                const val = prompt(
                  "Enter Alert Level (Low / Medium / High):",
                  settings.alertThreshold
                );
                if (val) updateSetting("alertThreshold", val);
              }}
            />

            <ToggleRow
              icon={<User />}
              label="Auto Assign Technicians"
              value={settings.autoAssign}
              onToggle={() =>
                updateSetting("autoAssign", !settings.autoAssign)
              }
            />

            <ToggleRow
              icon={<Bell />}
              label="Enable Notifications"
              value={settings.notifications}
              onToggle={() =>
                updateSetting("notifications", !settings.notifications)
              }
            />
          </>
        )}

        {/* ================= USER & SECURITY ================= */}
        {activeTab === "User Data & Security" && (
          <>
            <SettingRow
              icon={<User />}
              label="Email Address"
              value={settings.email}
              onClick={() => {
                const val = prompt("Update Email:", settings.email);
                if (val) updateSetting("email", val);
              }}
            />

            <SettingRow
              icon={<Lock />}
              label="Change Password"
              value="********"
              onClick={() => alert("Password change feature coming soon 🔒")}
            />

            <ToggleRow
              icon={<Shield />}
              label="Two-Factor Authentication"
              value={settings.twoFactor}
              onToggle={() =>
                updateSetting("twoFactor", !settings.twoFactor)
              }
            />

            <div
              className="setting-row"
              style={{ color: "red" }}
              onClick={() => {
                if (window.confirm("Log out from all devices?")) {
                  alert("All sessions cleared");
                }
              }}
            >
              <span>Log out from all devices</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SettingRow({ icon, label, value, onClick }) {
  return (
    <div className="setting-row" onClick={onClick}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {icon}
        <div>
          <div style={{ fontWeight: 500 }}>{label}</div>
          <small style={{ color: "#6b7280" }}>{value}</small>
        </div>
      </div>
      <span style={{ color: "#9ca3af" }}>{">"}</span>
    </div>
  );
}

function ToggleRow({ icon, label, value, onToggle }) {
  return (
    <div className="setting-row">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {icon}
        <span>{label}</span>
      </div>

      <div
        className={`toggle ${value ? "on" : ""}`}
        onClick={onToggle}
      />
    </div>
  );
}