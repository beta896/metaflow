import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password }); // Expandable for real auth logic
      console.log(`[AUTH] Login successful for ${email}`);
      navigate("/dashboard");
    } catch (err) {
      console.error(`[AUTH] Login failed: ${err.message}`);
      setError("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Authenticating..." : "Enter the covenant"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>

      {/* ✅ Google Login Button */}
      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <a href="http://localhost:3000/api/auth/google">
          <button className="btn btn-outline-primary">
            Sign in with Google
          </button>
        </a>
      </div>
    </div>
  );
}