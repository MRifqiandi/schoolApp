import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ModalCreateStudent from "../components/modal/ModalCreateStudent";
import toast, { Toaster } from "react-hot-toast";
import ModalEditStudent from "../components/modal/ModalEditStudent";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    nisn: "",
    email: "",
    password: "",
    classroom_id: "",
  });
  const [selectedClassroomId, setSelectedClassroomId] = useState("all");
  const [noStudentInClass, setNoStudentInClass] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchClassrooms();
  }, []);

  const handleClassroomFilterChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedClassroomId(selectedId);

    try {
      const token = localStorage.getItem("token");
      if (selectedId === "all") {
        fetchStudents();
        setNoStudentInClass(false); // reset
      } else {
        const res = await axios.get(
          `http://localhost:8000/api/management/students/classroom/${selectedId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudents(res.data);
        setNoStudentInClass(res.data.length === 0); // cek apakah kosong
      }
    } catch (error) {
      console.error("Gagal memfilter siswa berdasarkan kelas:", error);
      setStudents([]);
      setNoStudentInClass(true); // fallback jika gagal
    }
  };

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8000/api/management/students",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(res.data);
    } catch (error) {
      console.error("Gagal memuat data siswa:", error);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8000/api/management/classrooms",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClassrooms(res.data);
    } catch (error) {
      console.error("Gagal memuat data kelas:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: "",
      nisn: "",
      email: "",
      password: "",
      classroom_id: "",
    });
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setEditingId(student.id);
    setFormData({
      name: student.name,
      nisn: student.nisn,
      email: student.email,
      password: "",
      classroom_id: student.classroom_id,
    });
    setModalIsOpen(true);
  };

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-base-100 border border-base-300 shadow-xl p-4 rounded-xl flex flex-col gap-2 w-80">
        <h3 className="font-semibold text-lg">Konfirmasi Hapus</h3>
        <p className="text-sm text-base-content/80">
          Apakah kamu yakin ingin menghapus siswa ini?
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-sm btn-ghost"
          >
            Batal
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading("Menghapus siswa...");
              try {
                const token = localStorage.getItem("token");
                await axios.delete(
                  `http://localhost:8000/api/management/students/${id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                await fetchStudents();
                toast.dismiss(t.id);
                toast.success("Siswa berhasil dihapus!", { id: loadingToast });
              } catch (error) {
                console.error(error);
                toast.dismiss(t.id);
                toast.error("Gagal menghapus siswa.", { id: loadingToast });
              }
            }}
            className="btn btn-sm btn-error"
          >
            Hapus
          </button>
        </div>
      </div>
    ));
  };

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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-base-content">
              Kelola Siswa
            </h1>
            <div className="flex gap-4 items-center">
              <select
                value={selectedClassroomId}
                onChange={handleClassroomFilterChange}
                className="select select-bordered"
              >
                <option value="all">Semua Kelas</option>
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name} ({classroom.class_code})
                  </option>
                ))}
              </select>
              <button onClick={openModal} className="btn btn-primary shadow-md">
                + Tambah Siswa
              </button>
            </div>
          </div>
          <div className="bg-base-100 rounded-xl p-4 shadow-xl overflow-x-auto">
            <table className="table table-zebra w-full text-base-content">
              <thead>
                <tr className="bg-base-300">
                  <th>#</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Kelas</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={student.id}>
                      <td className="text-base-content">{index + 1}</td>
                      <td className="font-medium text-base-content">
                        {student.name}
                      </td>
                      <td className="text-base-content">{student.email}</td>
                      <td className="text-base-content">
                        {student.classroom?.name || "-"}
                      </td>
                      <td className="text-center text-base-content">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="btn btn-sm btn-warning"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="btn btn-sm btn-error"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-400 py-6">
                      {noStudentInClass && selectedClassroomId !== "all"
                        ? "Tidak ada siswa di kelas ini."
                        : "Tidak ada data siswa."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {isEditing ? (
            <ModalEditStudent
              isOpen={modalIsOpen}
              onClose={closeModal}
              onSuccess={fetchStudents}
              classrooms={classrooms}
              studentId={editingId}
              initialData={formData}
            />
          ) : (
            <ModalCreateStudent
              isOpen={modalIsOpen}
              onClose={closeModal}
              onSuccess={fetchStudents}
              classrooms={classrooms}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentList;
