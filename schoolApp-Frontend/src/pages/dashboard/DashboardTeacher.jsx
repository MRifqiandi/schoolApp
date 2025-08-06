import React from "react";
import Navbar from "../../pages/components/Navbar";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function DashboardTeacher() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="w-full fixed top-0 left-0 right-0 z-50">
        <Navbar user={user} />
      </div>

      <div className="pt-20 px-4">
        <div className="max-w-screen-lg mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Selamat Datang, {user?.name || "Guru"}!
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Anda dapat melihat daftar kelas yang Anda ajar dan informasi siswa
            melalui panel ini.
          </p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Kelas yang Diampu
            </h3>

            <ul className="space-y-4">
              <li className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl border border-gray-200 hover:shadow-md transition">
                <BookOpenIcon className="h-6 w-6 text-indigo-500" />
                <span className="text-gray-800 font-medium">
                  X IPA 1 - Matematika
                </span>
              </li>
              <li className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl border border-gray-200 hover:shadow-md transition">
                <BookOpenIcon className="h-6 w-6 text-indigo-500" />
                <span className="text-gray-800 font-medium">
                  XI IPS 2 - Ekonomi
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
