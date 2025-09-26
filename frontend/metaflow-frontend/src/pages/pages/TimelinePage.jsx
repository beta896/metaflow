import { useRole } from "./components/RoleContext";

export default function TimelinePage() {
  const { role } = useRole();

  return (
    <div>
      <h2>🕰️ Timeline View</h2>
      <p>Rendering operational legacy for role: <strong>{role}</strong></p>
    </div>
  );
}
