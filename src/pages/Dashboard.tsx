import React from "react";
import LoggedHoursList from "../components/logs/LoggedHoursList";

const Dashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      <LoggedHoursList />
    </div>
  );
};

export default Dashboard;
