// src/api/studentApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/management",
  withCredentials: true,
});

export const getStudents = () => API.get("/students");
export const getStudent = (id) => API.get(`/students/${id}`);
export const createStudent = (data) => API.post("/students", data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);
