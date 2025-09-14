import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:16200/api/user_details?email=murad@example.com")
      .then(response => setUserData(response.data))
      .catch(error => console.error("API Error:", error));
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;