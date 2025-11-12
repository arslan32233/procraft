import React from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function Forge() {
  const forgeFeatures = [
    { id: 1, name: "Build Projects", description: "Create new projects from scratch." },
    { id: 2, name: "Manage Tasks", description: "Track all tasks and progress." },
    { id: 3, name: "Deploy Apps", description: "Deploy your applications seamlessly." },
    { id: 4, name: "Analytics", description: "View usage and performance stats." },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-[Inter] text-gray-800">
      <Sidebar />

      <main className="flex-1 p-8 ml-64 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Forge</h1>
            <button className="bg-sky-600 text-white px-4 py-2 rounded-lg shadow hover:bg-sky-700 transition">
              + New Project
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            Explore Forge features and manage your projects efficiently.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {forgeFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                <p className="text-gray-500 mt-1 text-sm">{feature.description}</p>
                <button className="mt-4 text-sky-600 hover:text-sky-800 text-sm">Go</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
