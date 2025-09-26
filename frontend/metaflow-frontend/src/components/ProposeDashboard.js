import React from "react";
import PropTypes from "prop-types";

export default function ProposeDashboard({ username, email, role }) {
  return (
    <div className="propose-dashboard">
      <h2>Welcome, {username}</h2>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}

ProposeDashboard.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};
