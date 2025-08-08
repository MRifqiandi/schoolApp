import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardTeacher from "./pages/dashboard/DashboardTeacher";
import DashboardStudents from "./pages/dashboard/DashboardStudents";
import StudentList from "./pages/admin/StudentList";
import ClassroomList from "./pages/admin/ClassroomList";
import TeacherList from "./pages/admin/TeacherList";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ListStudentClass from "./pages/admin/ListStudentClass";
import ListTeacherClass from "./pages/admin/ListTeacherClass";
import ListStudentTeacherClass from "./pages/admin/ListStudentTeacherClass";

export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/guru"
          element={
            <ProtectedRoute>
              <DashboardTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/siswa"
          element={
            <ProtectedRoute>
              <DashboardStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <TeacherList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classrooms"
          element={
            <ProtectedRoute>
              <ClassroomList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentclass"
          element={
            <ProtectedRoute>
              <ListStudentClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacherclass"
          element={
            <ProtectedRoute>
              <ListTeacherClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classlist"
          element={
            <ProtectedRoute>
              <ListStudentTeacherClass />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
