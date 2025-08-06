import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ModalEditStudent = ({
  isOpen,
  onClose,
  onSuccess,
  classrooms,
  studentId,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    nisn: "",
    email: "",
    password: "",
    classroom_id: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        nisn: initialData.nisn || "",
        email: initialData.email || "",
        password: "",
        classroom_id: initialData.classroom_id || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/management/students/${studentId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Siswa berhasil diperbarui!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Gagal update siswa:", err);
      toast.error("Gagal memperbarui siswa.");
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Siswa</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="nisn"
            placeholder="NISN"
            value={formData.nisn}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="(Kosongkan jika tidak diubah)"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <select
            name="classroom_id"
            value={formData.classroom_id}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Pilih Kelas</option>
            {classrooms.map((kelas) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.name}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Simpan Perubahan
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalEditStudent;
