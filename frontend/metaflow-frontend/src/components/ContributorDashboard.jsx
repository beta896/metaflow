import React from "react";

export default function ContributorDashboard({ contributors }) {
  return (
    <div>
      <h1>🧠 Contributor Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Tier</th>
            <th>Category</th>
            <th>Engagement</th>
            <th>Last Verdict</th>
          </tr>
        </thead>
        <tbody>
          {contributors.map((c, index) => (
            <tr key={index}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.classification.tier}</td>
              <td>{c.classification.category}</td>
              <td>{c.classification.engagementScore}%</td>
              <td>{c.lastVerdict}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
