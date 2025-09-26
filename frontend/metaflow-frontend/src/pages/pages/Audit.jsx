import { useRole } from "./components/RoleContext";

export default function Audit() {
  const { role } = useRole();

  return (
    <div>
      <h2>🧾 Audit Page</h2>
      {["admin", "auditor"].includes(role) ? (
        <div>
          <p>Viewing full audit logs with symbolic reasons and timestamps.</p>
        </div>
      ) : (
        <p>You have limited access. Contact an admin for full testimony.</p>
      )}
    </div>
  );
}
