import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ user }) => {
  const location = useLocation();

  const menuItems = {
    admin: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Kelola Siswa", path: "/admin/students" },
      { label: "Kelola Guru", path: "/admin/teachers" },
      { label: "Kelola Kelas", path: "/admin/classrooms" },
      { label: "Ringkasan Data", path: "/admin/summary" },
    ],
  };

  const currentRole = user?.role || "guest";
  const items = menuItems[currentRole] || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold tracking-wide">🏫 School App</div>
        <ul className="flex items-center gap-6">
          {items.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-3 py-2 rounded-md transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-white text-blue-600 font-semibold shadow-md"
                    : "hover:bg-white/20 hover:shadow hover:-translate-y-[1px]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-200 shadow"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
