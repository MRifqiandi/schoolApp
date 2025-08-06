import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ModalCreateTeacher from "../components/modal/ModalCreateTeacher";
import toast from "react-hot-toast";
import ModalEditTeacher from "../components/modal/ModalEditTeacher";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroomId, setSelectedClassroomId] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchClassrooms();
  }, []);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8000/api/management/teachers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTeachers(res.data);
    } catch (error) {
      toast.error("Gagal memuat data guru!");
      console.error("Gagal memuat data guru", error);
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
      toast.error("Gagal memuat data kelas!");
      console.error("Gagal memuat data kelas", error);
    }
  };

  const handleClassroomFilterChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedClassroomId(selectedId);

    try {
      const token = localStorage.getItem("token");

      if (selectedId === "all") {
        fetchTeachers();
      } else {
        const res = await axios.get(
          `http://localhost:8000/api/management/classrooms/${selectedId}/teachers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const filteredTeachers = res.data.teachers || [];
        if (filteredTeachers.length === 0) {
          toast("Tidak ada guru di kelas ini", { icon: "⚠️" });
        }
        setTeachers(filteredTeachers);
      }
    } catch (error) {
      toast.error("Gagal memfilter guru berdasarkan kelas.");
      console.error(error);
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-base-100 border border-base-300 shadow-xl p-4 rounded-xl flex flex-col gap-2 w-80">
        <h3 className="font-semibold text-lg">Konfirmasi Hapus</h3>
        <p className="text-sm text-base-content/80">
          Apakah kamu yakin ingin menghapus guru ini?
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
              const loadingToast = toast.loading("Menghapus guru...");
              try {
                const token = localStorage.getItem("token");
                await axios.delete(
                  `http://localhost:8000/api/management/teachers/${id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                await fetchTeachers();
                toast.success("Guru berhasil dihapus!", { id: loadingToast });
              } catch (error) {
                toast.error("Gagal menghapus guru!", { id: loadingToast });
                console.error("Gagal menghapus guru:", error);
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
              Daftar Guru
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
              <button
                className="btn btn-primary shadow-md"
                onClick={() => setIsModalOpen(true)}
              >
                Tambah Guru
              </button>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-4 shadow-xl overflow-x-auto">
            <table className="table table-zebra w-full text-base-content">
              <thead className="bg-base-300">
                <tr>
                  <th>Nama</th>
                  <th>NIP</th>
                  <th>Email</th>
                  <th>Mapel</th>
                  <th>Kelas</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {teachers.length > 0 ? (
                  teachers.map((t) => (
                    <tr key={t.id}>
                      <td>{t.name}</td>
                      <td>{t.nip}</td>
                      <td>{t.email}</td>
                      <td>{t.subject}</td>
                      <td>{t.classroom?.name || "-"}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => handleEdit(t)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-error"
                            onClick={() => handleDelete(t.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-400 py-6">
                      Tidak ada data guru.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <ModalCreateTeacher
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              fetchTeachers();
              toast.success("Guru berhasil ditambahkan!");
            }}
          />
          <ModalEditTeacher
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            teacher={selectedTeacher}
            onSuccess={fetchTeachers}
          />
        </main>
      </div>
    </div>
  );
};

export default TeacherList;
