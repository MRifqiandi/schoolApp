import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ListStudentClass = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8000/api/management/students",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudents(res.data);
      } catch (err) {
        setError("Gagal memuat data siswa.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
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
            List Siswa Berdasarkan Kelas
          </h1>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="bg-base-100 rounded-xl p-4 shadow-xl overflow-x-auto">
              <table className="table table-zebra w-full text-base-content">
                <thead>
                  <tr className="bg-base-300">
                    <th>#</th>
                    <th>Nama Siswa</th>
                    <th>NISN</th>
                    <th>Email</th>
                    <th>Nama Kelas</th>
                    <th>Kode Kelas</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center text-gray-400 py-6"
                      >
                        Tidak ada data siswa.
                      </td>
                    </tr>
                  ) : (
                    students.map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.nisn}</td>
                        <td>{student.email}</td>
                        <td>{student.classroom?.name || "-"}</td>
                        <td>{student.classroom?.class_code || "-"}</td>
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

export default ListStudentClass;
