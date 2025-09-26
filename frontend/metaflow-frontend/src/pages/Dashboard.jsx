import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRole } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { role, assignRole } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome to the Covenant Dashboard</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {role}</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => assignRole("admin")}>Assign Admin Role</button>
        <button onClick={() => assignRole("user")}>Assign User Role</button>
        <button onClick={handleLogout}>Exit Covenant</button>
      </div>
    </div>
  );
}
