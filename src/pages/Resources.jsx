import React from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function Resources() {
  const resources = [
    { id: 1, name: "Documentation", type: "PDF" },
    { id: 2, name: "Tutorial Videos", type: "Video" },
    { id: 3, name: "Templates", type: "File" },
    { id: 4, name: "APIs", type: "Endpoint" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-[Inter] text-gray-800">
      <Sidebar />

      <main className="flex-1 p-8 ml-64 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Resources</h1>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition">
              + Add Resource
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            Manage all resources available in the system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{res.name}</h3>
                <p className="text-gray-500 mt-1 text-sm">Type: {res.type}</p>
                <div className="mt-4 flex gap-2">
                  <button className="text-sky-600 hover:text-sky-800 text-sm">View</button>
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
