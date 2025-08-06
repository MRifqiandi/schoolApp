import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../pages/components/Sidebar";
import Navbar from "../../pages/components/Navbar";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    students: 0,
    teachers: 0,
    classrooms: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/admin/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="flex min-h-screen bg-base-200">
      <aside className="w-64 bg-base-100 border-r shadow-lg fixed top-0 bottom-0 left-0 z-30">
        <Sidebar />
      </aside>

      <div className="ml-64 w-full">
        <header className="h-16 bg-base-100 border-b shadow-md fixed top-0 left-64 right-0 z-20">
          <Navbar />
        </header>

        <main className="pt-24 px-8 min-h-screen overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              title="Total Siswa"
              value={summary.students}
              color="bg-blue-500"
            />
            <Card
              title="Total Guru"
              value={summary.teachers}
              color="bg-green-500"
            />
            <Card
              title="Total Kelas"
              value={summary.classrooms}
              color="bg-purple-500"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-lg shadow-md`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-3xl mt-2 font-bold">{value}</p>
  </div>
);

export default Dashboard;
