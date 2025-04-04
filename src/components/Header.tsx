// src/components/Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{ padding: "1rem", marginBottom: "1rem", background: "#f4f4f4" }}
    >
      <Link to="/logs" style={{ marginRight: "1rem" }}>
        View Logs
      </Link>
      <Link to="/add" style={{ marginRight: "1rem" }}>
        Add Log
      </Link>
      <Link to="/add-project" style={{ marginRight: "1rem" }}>
        Add Project
      </Link>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
