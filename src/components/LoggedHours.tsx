import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://127.0.0.1:5001/api/logged_hours";

const LoggedHours = () => {
  const [logs, setLogs] = useState<
    {
      LogID: number;
      Name: string;
      ProjectName: string;
      HoursWorked: number;
      WorkDate: string;
      Notes: string;
    }[]
  >([]);

  const { token, role } = useAuth();

  useEffect(() => {
    if (!token) return;

    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching logged hours:", error);
      });
  }, [token]);

  const handleDelete = async (logId: number) => {
    try {
      await axios.delete(`${API_URL}/${logId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs((prev) => prev.filter((log) => log.LogID !== logId));
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to delete log");
    }
  };

  return (
    <div>
      <h2>Logged Hours</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Log ID</th>
            <th>Name</th>
            <th>Project</th>
            <th>Hours Worked</th>
            <th>Work Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.LogID}>
              <td>{log.LogID}</td>
              <td>{log.Name}</td>
              <td>{log.ProjectName}</td>
              <td>{log.HoursWorked}</td>
              <td>{log.WorkDate}</td>
              <td>{log.Notes}</td>
              <td>
                {(role === "admin" || role === "user") && (
                  <button onClick={() => handleDelete(log.LogID)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoggedHours;
