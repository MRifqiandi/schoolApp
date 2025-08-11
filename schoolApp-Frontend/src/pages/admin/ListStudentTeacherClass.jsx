import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ListStudentTeacherClass = () => {
  const [overview, setOverview] = useState([]);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [errorOverview, setErrorOverview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/management/classroom-overview", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOverview(res.data);
        setErrorOverview(null);
      })
      .catch(() => setErrorOverview("Gagal memuat data gabungan."))
      .finally(() => setLoadingOverview(false));
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
          <h2 className="text-3xl font-bold text-base-content mb-4">
            Data Gabungan Siswa - Guru - Kelas
          </h2>

          {loadingOverview && <p>Loading data...</p>}
          {errorOverview && <p className="text-red-600">{errorOverview}</p>}
          {!loadingOverview && !errorOverview && (
            <div className="bg-base-100 rounded-xl p-4 shadow-xl overflow-x-auto">
              <table className="table table-zebra w-full text-base-content">
                <thead className="bg-base-300">
                  <tr>
                    <th>#</th>
                    <th>Nama Kelas</th>
                    <th>Nama Guru</th>
                    <th>Mapel</th>
                    <th>Jumlah Siswa</th>
                    <th>Nama Siswa</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center text-gray-400 py-6"
                      >
                        Tidak ada data.
                      </td>
                    </tr>
                  ) : (
                    overview.map((item, i) => (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.teacher_name || "-"}</td>
                        <td>{item.subject || "-"}</td>
                        <td>{item.total_students}</td>
                        <td>{item.student_names?.join(", ") || "-"}</td>
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

export default ListStudentTeacherClass;
