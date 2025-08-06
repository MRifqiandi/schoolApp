import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ModalCreateClassroom = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/management/classrooms",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Kelas berhasil ditambahkan!");
        onSuccess();
        onClose();
      } else {
        toast.error("Gagal menambahkan kelas! (status tidak sesuai)");
      }
    } catch (err) {
      console.error("Gagal tambah kelas", err);
      toast.error("Gagal menambahkan kelas!");
    }
  };

  return (
    <>
      {isOpen && (
        <dialog id="addClassroomModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Tambah Kelas</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Nama Kelas (misal: IPA 1)"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="class_code"
                placeholder="Kode Kelas (mis. XIPA1)"
                value={formData.class_code}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
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
      )}
    </>
  );
};

export default ModalCreateClassroom;
