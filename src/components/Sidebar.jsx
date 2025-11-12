import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    "Dashboard",
    "Courses",
    "Users",
    "Roles",
    "Departments",
    "Resources",
    "Book System",
    "Forge",
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen px-4 py-6 shadow-sm fixed top-0 left-0">
      <div className="mb-10 flex items-center gap-3">
        <FaUserCircle className="w-10 h-10 text-sky-600" />
        <div>
          <h1 className="text-base font-semibold text-sky-700">PROCRAFT</h1>
          <p className="text-xs text-gray-400">Restoration Group</p>
        </div>
      </div>

      <nav className="space-y-1 text-sm font-medium flex-1 overflow-auto">
        {menuItems.map((item) => {
          const path = `/${item.toLowerCase().replace(" ", "-")}`;
          const isActive = location.pathname === path;
          return (
            <Link
              key={item}
              to={path}
              className={`block px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t pt-6 text-xs text-gray-500 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200 text-gray-600">
          <FaUserCircle />
        </div>
        <div>
          <div className="text-sm font-semibold">admin</div>
          <div className="text-xs text-gray-400">Admin</div>
        </div>
      </div>
    </aside>
  );
}
