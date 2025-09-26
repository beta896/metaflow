import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email });
    navigate("/dashboard");
  };

  const handleSocialLogin = (provider) => {
    login({ email: `${provider}_user@example.com` });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Register</h2>
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
        <button type="submit">Join the Covenant</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <p>Or link your identity:</p>
        <button onClick={() => handleSocialLogin("google")}>Google</button>
        <button onClick={() => handleSocialLogin("facebook")}>Facebook</button>
        <button onClick={() => handleSocialLogin("github")}>GitHub</button>
      </div>
    </div>
  );
}
