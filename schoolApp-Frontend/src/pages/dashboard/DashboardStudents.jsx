import React from "react";
import Navbar from "../../pages/components/Navbar";

export default function DashboardStudents() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Navbar fixed di atas */}
      <Navbar user={user} />

      {/* Konten dengan padding atas agar tidak ketiban navbar */}
      <div className="pt-20 px-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 transition-all">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Selamat Datang, {user?.name || "Siswa"}!
          </h2>

          <p className="text-gray-600 text-base leading-relaxed">
            Berikut adalah informasi data diri kamu:
          </p>

          <div className="mt-6 space-y-4 text-gray-700">
            <div className="flex items-center gap-2">
              <strong className="w-24">👤 Nama:</strong>{" "}
              <span>{user?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="w-24">📧 Email:</strong>{" "}
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
