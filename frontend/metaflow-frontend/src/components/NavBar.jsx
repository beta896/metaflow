export default function NavBar() {
  const role = "admin"; // Simulated role

  const links = [
    { label: "Dashboard", path: "/" },
    { label: "Audit Trail", path: "/audit", roles: ["admin", "analyst"] },
    { label: "Prophecy", path: "/prophecy", roles: ["admin"] },
    { label: "Timeline", path: "/timeline", roles: ["user", "admin"] }
  ];

  return (
    <nav style={{ marginBottom: "2rem" }}>
      <h2>🧭 Navigation</h2>
      <ul>
        {links
          .filter(link => !link.roles || link.roles.includes(role))
          .map((link, index) => (
            <li key={index}>
              <a href={link.path}>{link.label}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
