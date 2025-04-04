// src/services/api.ts
const API_BASE = "http://localhost:5001/api";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: email, Password: password }),
  });
  return res.json();
};

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Name: name, Email: email, Password: password }),
  });
  return res.json();
};
