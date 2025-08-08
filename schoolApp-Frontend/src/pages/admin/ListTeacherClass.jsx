import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ListTeacherClass = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8000/api/management/teachers",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTeachers(res.data);
      } catch (err) {
        setError("Gagal memuat data guru.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="flex min-h-screen bg-base-200">
      <aside className="w-64 bg-base-100 border-r shadow-lg fixed top-0 bottom-0 left-0 z-30">
        <Sidebar />
      </aside>

      <div className="ml-64 w-full">
        <header className="h-16 bg-base-100 border-b shadow-md fixed top-0 left-64 right-0 z-20">
          <Navbar />
        </header>

        <main className="pt-24 px-8">
          <h1 className="text-3xl font-bold text-base-content mb-6">
            List Guru Berdasarkan Kelas
          </h1>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="bg-base-100 rounded-xl p-4 shadow-xl overflow-x-auto">
              <table className="table table-zebra w-full text-base-content">
                <thead className="bg-base-300">
                  <tr>
                    <th>#</th>
                    <th>Nama Guru</th>
                    <th>NIP</th>
                    <th>Email</th>
                    <th>Mapel</th>
                    <th>Kelas</th>
                    <th>Kode Kelas</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center text-gray-400 py-6"
                      >
                        Tidak ada data guru.
                      </td>
                    </tr>
                  ) : (
                    teachers.map((teacher, index) => (
                      <tr key={teacher.id}>
                        <td>{index + 1}</td>
                        <td>{teacher.name}</td>
                        <td>{teacher.nip}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.subject}</td>
                        <td>{teacher.classroom?.name || "-"}</td>
                        <td>{teacher.classroom?.class_code || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ListTeacherClass;
