import React, { useEffect, useState } from "react";
import axios from "axios";

const ModalCreateTeacher = ({ isOpen, onClose, onSuccess }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    email: "",
    subject: "",
    classroom_id: "",
  });

  const fetchClassrooms = async () => {
    try {
      const res = await axios.get("/api/management/teachers/create");
      setClassrooms(res.data);
    } catch (err) {
      console.error("Gagal fetch classrooms", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchClassrooms();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/management/teachers", formData);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Gagal tambah guru", err);
    }
  };

  return (
    <>
      {isOpen && (
        <dialog id="addTeacherModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Tambah Guru</h3>
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
                name="nip"
                placeholder="NIP"
                value={formData.nip}
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
              />
              <input
                type="text"
                name="subject"
                placeholder="Mata Pelajaran"
                value={formData.subject}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <select
                name="classroom_id"
                value={formData.classroom_id}
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
                  Simpan
                </button>
                <button type="button" className="btn" onClick={onClose}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ModalCreateTeacher;
