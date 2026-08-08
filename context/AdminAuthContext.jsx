'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('crumb-admin-token');
    if (stored) setToken(stored);
    setLoading(false);
  }, []);

  function login(newToken) {
    localStorage.setItem('crumb-admin-token', newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('crumb-admin-token');
    setToken(null);
  }

  return (
    <AdminAuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}