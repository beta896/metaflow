import React, { useEffect, useState } from "react";

export default function LegacySeal() {
  const [seal, setSeal] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/legacy")
      .then(res => res.json())
      .then(data => setSeal(data));
  }, []);

  return (
    <div>
      <h3>🔐 Legacy Seal</h3>
      {seal ? (
        <div>
          <p><strong>Founder:</strong> {seal.founder}</p>
          <p><strong>Location:</strong> {seal.location}</p>
          <p><strong>Activated On:</strong> {new Date(seal.activatedOn).toLocaleString()}</p>
          <p><strong>Mission:</strong> {seal.mission}</p>
          <p><strong>Tag:</strong> {seal.lifeCycleTag}</p>
          <p><strong>Encrypted:</strong> {seal.encryptedTag}</p>
          <h4>Modules Activated:</h4>
          <ul>{seal.cockpitModules.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </div>
      ) : (
        <p>Loading legacy seal...</p>
      )}
    </div>
  );
}
