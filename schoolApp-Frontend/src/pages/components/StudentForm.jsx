// src/components/students/StudentForm.jsx
import React, { useEffect, useState } from "react";
import { createStudent } from "../../api/studentApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [form, setForm] = useState({
    name: "",
    nisn: "",
    email: "",
    classroom_id: "",
  });
  const [classrooms, setClassrooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/management/classrooms", {
        withCredentials: true,
      })
      .then((res) => setClassrooms(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createStudent(form);
    navigate("/students");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Tambah Siswa</h3>
      <div className="mb-2">
        <label>Nama</label>
        <input
          type="text"
          className="form-control"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <label>NISN</label>
        <input
          type="text"
          className="form-control"
          value={form.nisn}
          onChange={(e) => setForm({ ...form, nisn: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label>Kelas</label>
        <select
          className="form-control"
          value={form.classroom_id}
          onChange={(e) => setForm({ ...form, classroom_id: e.target.value })}
          required
        >
          <option value="">--Pilih Kelas--</option>
          {classrooms.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary">Simpan</button>
    </form>
  );
};

export default StudentForm;
