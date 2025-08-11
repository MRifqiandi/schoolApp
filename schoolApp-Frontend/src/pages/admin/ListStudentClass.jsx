import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ListStudentClass = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8000/api/management/classrooms/students",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClassrooms(res.data);
      } catch (err) {
        setError("Gagal memuat data siswa.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
              {classrooms.length === 0 ? (
                <p className="text-center text-gray-400 py-6">
                  Tidak ada data kelas dan siswa.
                </p>
              ) : (
                classrooms.map((classroom) => (
                  <div key={classroom.class_id} className="mb-8">
                    <h2 className="text-xl font-semibold mb-3 border-b pb-1">
                      {classroom.class_name}
                    </h2>
                    <table className="table table-zebra w-full text-base-content">
                      <thead>
                        <tr className="bg-base-300">
                          <th>#</th>
                          <th>Nama Siswa</th>
                          <th>NISN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classroom.students.length === 0 ? (
                          <tr>
                            <td
                              colSpan={3}
                              className="text-center py-4 text-gray-500"
                            >
                              Tidak ada siswa di kelas ini.
                            </td>
                          </tr>
                        ) : (
                          classroom.students.map((student, index) => (
                            <tr key={student.id}>
                              <td>{index + 1}</td>
                              <td>{student.name}</td>
                              <td>{student.nisn}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ListStudentClass;
