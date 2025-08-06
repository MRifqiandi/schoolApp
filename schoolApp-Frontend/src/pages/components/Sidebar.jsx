import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <SidebarLink to="/dashboard" label="Dashboard" />
        <SidebarLink to="/students" label="Kelola Siswa" />
        <SidebarLink to="/teachers" label="Kelola Guru" />
        <SidebarLink to="/classrooms" label="Kelola Kelas" />
      </nav>
    </div>
  );
};

const SidebarLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-4 py-2 rounded transition-all ${
        isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
      }`}
    >
      {label}
    </Link>
  );
};

export default Sidebar;
