// src/context/AuthContext.tsx
import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  token: string | null;
  role: string | null;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [role, setRoleState] = useState<string | null>(
    localStorage.getItem("role")
  );

  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem("token", token);
  };

  const setRole = (role: string) => {
    setRoleState(role);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setTokenState(null);
    setRoleState(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, role, setToken, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
