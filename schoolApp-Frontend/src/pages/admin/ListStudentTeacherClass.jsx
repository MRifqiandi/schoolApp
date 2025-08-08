import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ListStudentTeacherClass = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [loadingClassrooms, setLoadingClassrooms] = useState(true);

  const [errorStudents, setErrorStudents] = useState(null);
  const [errorTeachers, setErrorTeachers] = useState(null);
  const [errorClassrooms, setErrorClassrooms] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/management/students", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStudents(res.data);
        setErrorStudents(null);
      })
      .catch(() => setErrorStudents("Gagal memuat data siswa."))
      .finally(() => setLoadingStudents(false));

    axios
      .get("http://localhost:8000/api/management/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTeachers(res.data);
        setErrorTeachers(null);
      })
      .catch(() => setErrorTeachers("Gagal memuat data guru."))
      .finally(() => setLoadingTeachers(false));

    axios
      .get("http://localhost:8000/api/management/classrooms", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setClassrooms(res.data);
        setErrorClassrooms(null);
      })
      .catch(() => setErrorClassrooms("Gagal memuat data kelas."))
      .finally(() => setLoadingClassrooms(false));
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

        <main className="pt-24 px-8 space-y-16">
          <section>
            <h2 className="text-3xl font-bold text-base-content mb-4">
              List Siswa
            </h2>
            {loadingStudents && <p>Loading siswa...</p>}
            {errorStudents && <p className="text-red-600">{errorStudents}</p>}
            {!loadingStudents && !errorStudents && (
              <div className="bg-base-100 rounded-xl p-4 shadow-xl overflow-x-auto">
                <table className="table table-zebra w-full text-base-content">
                  <thead className="bg-base-300">
                    <tr>
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
                      students.map((student, i) => (
                        <tr key={student.id}>
                          <td>{i + 1}</td>
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
          </section>

          <section>
            <h2 className="text-3xl font-bold text-base-content mb-4">
              List Guru
            </h2>
            {loadingTeachers && <p>Loading guru...</p>}
            {errorTeachers && <p className="text-red-600">{errorTeachers}</p>}
            {!loadingTeachers && !errorTeachers && (
              <div className="bg-base-100 rounded-xl p-4 shadow-xl overflow-x-auto">
                <table className="table table-zebra w-full text-base-content">
                  <thead className="bg-base-300">
                    <tr>
                      <th>#</th>
                      <th>Nama Guru</th>
                      <th>NIP</th>
                      <th>Email</th>
                      <th>Mapel</th>
                      <th>Nama Kelas</th>
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
                      teachers.map((teacher, i) => (
                        <tr key={teacher.id}>
                          <td>{i + 1}</td>
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
          </section>

          <section>
            <h2 className="text-3xl font-bold text-base-content mb-4">
              List Kelas
            </h2>
            {loadingClassrooms && <p>Loading kelas...</p>}
            {errorClassrooms && (
              <p className="text-red-600">{errorClassrooms}</p>
            )}
            {!loadingClassrooms && !errorClassrooms && (
              <div className="bg-base-100 rounded-xl p-4 shadow-xl overflow-x-auto">
                <table className="table table-zebra w-full text-base-content">
                  <thead className="bg-base-300">
                    <tr>
                      <th>#</th>
                      <th>Nama Kelas</th>
                      <th>Kode Kelas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classrooms.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center text-gray-400 py-6"
                        >
                          Tidak ada data kelas.
                        </td>
                      </tr>
                    ) : (
                      classrooms.map((classroom, i) => (
                        <tr key={classroom.id}>
                          <td>{i + 1}</td>
                          <td>{classroom.name}</td>
                          <td>{classroom.class_code}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ListStudentTeacherClass;
