import { useRole } from "./RoleContext";

export default function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <div>
      <label>Switch Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="auditor">Auditor</option>
        <option value="prophet">Prophet</option>
        <option value="user">User</option>
        <option value="observer">Observer</option>
      </select>
    </div>
  );
}
