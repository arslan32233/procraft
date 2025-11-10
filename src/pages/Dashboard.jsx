import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle, FaSignOutAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!token) {
      showToast("Please login to continue", "info");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        handleLogout("Session expired. Please login again.");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      handleLogout("Invalid token. Please login again.");
    }
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (message, type = "success") => {
    toast[type]?.(message) ?? toast(message);
  };

  const handleLogout = (msg) => {
    dispatch(logout());
    localStorage.removeItem("token");
    showToast(msg || "Logged out successfully", "info");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-[Inter]">
      <div className="flex">
        
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen px-4 py-6 shadow-sm">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 text-white">
                <FaUserCircle className="w-full h-full text-sky-600" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-sky-700">PROCRAFT</h1>
                <p className="text-xs text-gray-400">Restoration Group</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1 text-sm font-medium flex-1 overflow-auto">
            {["Dashboard", "Courses", "Users", "Roles", "Departments", "Resources", "Book System", "Forge"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className={`block px-4 py-2 rounded-lg ${
                  item === "Dashboard"
                    ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item}
              </Link>
            ))}
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

        <main className="flex-1 p-8 overflow-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
              <p className="text-gray-500 text-sm">Overview of courses, users & performance</p>
            </div>

            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
              <input
                className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="Search in Dashboard..."
              />
              <div
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title="Account"
              >
                <FaUserCircle className="text-gray-600 w-6 h-6" />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                  <button
                    onClick={() => handleLogout("Logged out successfully")}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card title="Active Courses" value="4" subtitle="+12% from last month" bg="bg-sky-50" text="text-sky-700" />
            <Card title="Active Users" value="28" subtitle="+8% growth" bg="bg-emerald-50" text="text-emerald-700" />
            <Card title="Completion Rate" value="76%" subtitle="↑ improved 6% this month" bg="bg-orange-50" text="text-orange-700" />
            <Card title="Avg. Completion Time" value="14.2 days" subtitle="↓ 2.3 days faster" bg="bg-violet-50" text="text-violet-700" />
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Course Completion Trends</h3>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Department Engagement</h3>
                <p className="text-xs text-gray-400">6 departments</p>
              </div>
              <div className="space-y-3">
                <ProgressBar label="Sales" value={80} color="bg-sky-500" />
                <ProgressBar label="Estimating" value={65} color="bg-emerald-500" />
                <ProgressBar label="Production" value={55} color="bg-orange-500" />
                <ProgressBar label="Management" value={90} color="bg-violet-500" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value, subtitle, bg, text }) {
  return (
    <div className={`${bg} rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition`}>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-2xl font-semibold ${text} mt-2`}>{value}</h3>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

function ProgressBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-500">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
