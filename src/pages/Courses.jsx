import React from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function Courses() {
  const courses = [
    { id: 1, title: "React Basics", duration: "5 hours", enrolled: 120 },
    { id: 2, title: "Advanced JavaScript", duration: "8 hours", enrolled: 80 },
    { id: 3, title: "UI/UX Design Fundamentals", duration: "6 hours", enrolled: 45 },
    { id: 4, title: "Node.js & Express", duration: "10 hours", enrolled: 60 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-[Inter] text-gray-800">
      <Sidebar />

      <main className="flex-1 p-8 ml-64 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition">
              + Add New Course
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            Manage courses available for users including duration, enrollment, and actions.
          </p>

          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrolled
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{course.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{course.enrolled}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-sky-600 hover:text-sky-800 mr-4">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
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
