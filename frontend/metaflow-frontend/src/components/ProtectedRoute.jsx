// Placeholder for token-based protection
export default function ProtectedRoute({ children }) {
  const isAuthenticated = true; // Simulated
  return isAuthenticated ? children : <div>🔒 Access Denied</div>;
}
