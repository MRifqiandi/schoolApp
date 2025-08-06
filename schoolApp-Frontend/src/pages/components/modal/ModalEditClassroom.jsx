import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ModalEditClassroom = ({
  isOpen,
  onClose,
  onSuccess,
  classroomId,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    class_code: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        class_code: initialData.class_code || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/management/classrooms/${classroomId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Kelas berhasil diperbarui!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Gagal memperbarui kelas:", error);
      toast.error("Gagal memperbarui kelas.");
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Kelas</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama Kelas"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="class_code"
            placeholder="Kode Kelas"
            value={formData.class_code}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
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

export default ModalEditClassroom;
