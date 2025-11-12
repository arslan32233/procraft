import React from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function Departments() {
  const departments = [
    { id: 1, name: "Sales", users: 25 },
    { id: 2, name: "Marketing", users: 18 },
    { id: 3, name: "Engineering", users: 40 },
    { id: 4, name: "HR", users: 10 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-[Inter] text-gray-800">
      <Sidebar />

      <main className="flex-1 p-8 ml-64 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Departments</h1>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition">
              + Add New Department
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            Overview of all departments and their user count.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                <p className="text-gray-500 mt-1">Users: {dept.users}</p>
                <div className="mt-4 flex gap-2">
                  <button className="text-sky-600 hover:text-sky-800 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
