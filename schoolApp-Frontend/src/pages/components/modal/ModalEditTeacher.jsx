import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ModalEditTeacher = ({
  isOpen,
  onClose,
  teacher,
  onSuccess,
  classrooms = [],
}) => {
  const [form, setForm] = useState({
    name: "",
    nip: "",
    email: "",
    password: "",
    subject: "",
    classroom_id: "",
  });

  useEffect(() => {
    if (teacher) {
      setForm({
        name: teacher.name || "",
        nip: teacher.nip || "",
        email: teacher.email || "",
        password: "",
        subject: teacher.subject || "",
        classroom_id: teacher.classroom_id || "",
      });
    }
  }, [teacher]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        <form onSubmit={handleUpdate} className="space-y-4">
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
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="(Kosongkan jika tidak diubah)"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Mata Pelajaran"
            className="input input-bordered w-full"
            required
          />
          <select
            name="classroom_id"
            value={form.classroom_id}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Pilih Kelas (Opsional)</option>
            {classrooms.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
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

export default ModalEditTeacher;
