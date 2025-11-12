import React from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function Roles() {
  const roles = [
    { id: 1, name: "Admin", description: "Full access to all modules" },
    { id: 2, name: "Manager", description: "Manage teams and projects" },
    { id: 3, name: "Editor", description: "Can edit content" },
    { id: 4, name: "Viewer", description: "Read-only access" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-[Inter] text-gray-800">
      <Sidebar />

      <main className="flex-1 p-8 ml-64 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
            <button className="bg-sky-600 text-white px-5 py-2 rounded-lg shadow hover:bg-sky-700 transition duration-200">
              + Create New Role
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            Manage user roles and permissions within the system.
          </p>

          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {roles.map((role, idx) => (
                  <tr
                    key={role.id}
                    className={`transition duration-150 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-sky-50`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium text-sm">
                      {role.name}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-gray-600 text-sm">
                      {role.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-sky-600 hover:text-sky-800 font-medium mr-4 transition duration-150">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 font-medium transition duration-150">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
