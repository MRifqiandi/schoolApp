import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import ModalCreateClassroom from "../components/modal/ModalCreateClassroom";
import ModalEditClassroom from "../components/modal/ModalEditClassroom";

const ClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  useEffect(() => {
    fetchClassrooms();
  }, []);

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

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-base-100 border border-base-300 shadow-xl p-4 rounded-xl flex flex-col gap-2 w-80">
        <h3 className="font-semibold text-lg">Konfirmasi Hapus</h3>
        <p className="text-sm text-base-content/80">
          Apakah kamu yakin ingin menghapus kelas ini?
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
              const loadingToast = toast.loading("Menghapus kelas...");
              try {
                const token = localStorage.getItem("token");
                await axios.delete(
                  `http://localhost:8000/api/management/classrooms/${id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                await fetchClassrooms();
                toast.success("Kelas berhasil dihapus!", { id: loadingToast });
              } catch (error) {
                console.error(error);
                toast.error("Gagal menghapus kelas.", { id: loadingToast });
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
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r shadow-lg fixed top-0 bottom-0 left-0 z-30">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="ml-64 w-full">
        {/* Navbar */}
        <header className="h-16 bg-base-100 border-b shadow-md fixed top-0 left-64 right-0 z-20">
          <Navbar />
        </header>

        <main className="pt-24 px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-base-content">
              Kelola Kelas
            </h1>
            <button
              onClick={() => setIsModalOpen(true)} // ⬅️ PEMICU MODAL
              className="btn btn-primary shadow-md"
            >
              + Tambah Kelas
            </button>
          </div>

          <div className="bg-base-100 rounded-xl p-4 shadow-xl overflow-x-auto">
            <table className="table table-zebra w-full text-base-content">
              <thead>
                <tr className="bg-base-300">
                  <th>#</th>
                  <th>Nama Kelas</th>
                  <th>Kode Kelas</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.length > 0 ? (
                  classrooms.map((classroom, index) => (
                    <tr key={classroom.id}>
                      <td>{index + 1}</td>
                      <td className="font-medium">{classroom.name}</td>
                      <td>{classroom.class_code}</td>
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedClassroom(classroom);
                              setIsEditModalOpen(true);
                            }}
                            className="btn btn-sm btn-warning"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(classroom.id)}
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
                    <td colSpan="4" className="text-center text-gray-400 py-6">
                      Tidak ada data kelas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <ModalCreateClassroom
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchClassrooms}
      />
      <ModalEditClassroom
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedClassroom(null);
        }}
        onSuccess={fetchClassrooms}
        classroomId={selectedClassroom?.id}
        initialData={selectedClassroom}
      />
    </div>
  );
};

export default ClassroomList;
