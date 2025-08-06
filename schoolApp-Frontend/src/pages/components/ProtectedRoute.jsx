import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Kalau belum login, redirect ke login
    return <Navigate to="/login" replace />;
  }

  // Kalau sudah login, tampilkan konten
  return children;
}
