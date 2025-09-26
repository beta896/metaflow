import { useRole } from "./components/RoleContext";

export default function Prophecy() {
  const { role } = useRole();

  if (!["admin", "prophet"].includes(role)) {
    return <h2>🔒 Access Denied: Prophecy is sealed to your role.</h2>;
  }

  return (
    <div>
      <h2>🔮 Prophecy Module</h2>
      <p>Visualizing symbolic gaps and predicted enforcement triggers.</p>
    </div>
  );
}
