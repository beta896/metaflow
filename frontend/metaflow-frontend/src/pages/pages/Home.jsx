import Dashboard from "./components/Dashboard";
import AuditTrail from "./components/AuditTrail";
import RouteMap from "./components/RouteMap";
import Timeline from "./components/Timeline";
import NavBar from "./components/NavBar";`nimport ProtectedRoute from "./components/ProtectedRoute";

export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>`n<NavBar />
      <h1>🧭 Covenant Interface</h1>
      <ProtectedRoute>
        <Dashboard />
        <AuditTrail />
        <RouteMap />
        <Timeline />
      </ProtectedRoute>
    </div>
  );
}

