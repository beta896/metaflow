import React, { useEffect, useState } from "react";

export default function LifecyclePanel() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/lifecycle-transition", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "creator@buzzflow.io",
        platform: "Instagram",
        followers: 12400,
        region: "Egypt",
        lifeCycleTag: "LCT-INIT"
      })
    })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  return (
    <div>
      <h3>🟢 Lifecycle Panel</h3>
      {user ? (
        <ul>
          <li>Email: {user.email}</li>
          <li>Platform: {user.platform}</li>
          <li>Followers: {user.followers}</li>
          <li>Region: {user.region}</li>
          <li>Tag: {user.lifeCycleTag}</li>
          <li>Encrypted: {user.encryptedTag}</li>
          <li>Timestamp: {new Date(user.timestamp).toLocaleString()}</li>
        </ul>
      ) : (
        <p>Loading marketer data...</p>
      )}
    </div>
  );
}
