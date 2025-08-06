import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ModalCreateStudent = ({ isOpen, onClose, onSuccess, classrooms }) => {
  const [formData, setFormData] = useState({
    name: "",
    nisn: "",
    email: "",
    password: "",
    classroom_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/management/students",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Siswa berhasil ditambahkan!");
        onSuccess();
        onClose();
      } else {
        toast.error("Gagal menambahkan siswa! (status tidak sesuai)");
      }
    } catch (err) {
      console.error("Gagal tambah siswa", err);
      toast.error("Gagal menambahkan siswa!");
    }
  };

  return (
    <>
      {isOpen && (
        <dialog id="addStudentModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Tambah Siswa</h3>
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
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <select
                name="classroom_id"
                value={formData.classroom_id}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Pilih Kelas</option>
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

export default ModalCreateStudent;
