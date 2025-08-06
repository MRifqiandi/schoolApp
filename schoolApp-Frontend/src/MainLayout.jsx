// src/layouts/MainLayout.jsx
import React from "react";
import Navbar from "./pages/components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
}
