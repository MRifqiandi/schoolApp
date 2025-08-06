import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ModalEditTeacher = ({ isOpen, onClose, teacher, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    nip: "",
    email: "",
    subject: "",
    classroom_id: "",
  });

  useEffect(() => {
    if (teacher) {
      setForm({
        name: teacher.name || "",
        nip: teacher.nip || "",
        email: teacher.email || "",
        subject: teacher.subject || "",
        classroom_id: teacher.classroom_id || "",
      });
    }
  }, [teacher]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Mengupdate data guru...");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/management/teachers/${teacher.id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Guru berhasil diperbarui", { id: loading });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui data guru", { id: loading });
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box bg-base-100">
        <h3 className="font-bold text-lg mb-4">Edit Data Guru</h3>
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="nip"
            value={form.nip}
            onChange={handleChange}
            placeholder="NIP"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Mapel"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="classroom_id"
            value={form.classroom_id}
            onChange={handleChange}
            placeholder="ID Kelas (sementara)"
            className="input input-bordered w-full"
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Simpan
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

export default ModalEditTeacher;
