"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  editMode: false,
  setEditMode: () => {},
  login: () => {},
  logout: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setIsAdmin(!!token);
  }, []);

  const login = useCallback((token: string) => {
    localStorage.setItem("admin_token", token);
    setIsAdmin(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setIsAdmin(false);
    setEditMode(false);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, editMode, setEditMode, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
