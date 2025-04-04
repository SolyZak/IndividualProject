import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Header from "../Header";

const API_URL = "http://127.0.0.1:5001/api";

const AddProject = () => {
  const { token } = useAuth();
  const [projectName, setProjectName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/projects`,
        { ProjectName: projectName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Project added successfully!");
      setProjectName("");
    } catch (err: any) {
      console.error(err);
      alert("Failed to add project");
    }
  };

  return (
    <div>
      <Header />
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
