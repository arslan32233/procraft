import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      showToast("Please login to continue", "info");
      navigate("/login", { replace: true });
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

  const showToast = (message, type = "success") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warn":
        toast.warn(message);
        break;
      default:
        toast(message);
    }
  };

  const handleLogout = (msg) => {
    dispatch(logout());
    localStorage.removeItem("token");
    showToast(msg || "Logged out successfully", "info");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen px-4 py-6">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
                PC
              </div>
              <div>
                <h1 className="text-sm font-semibold">PROCRAFT</h1>
                <p className="text-xs text-gray-400">Restoration Group</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1 text-sm">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded hover:bg-gray-100 bg-blue-50 text-blue-600 font-medium"
            >
              Dashboard
            </Link>
            <Link to="/courses" className="block px-3 py-2 rounded hover:bg-gray-100">
              Courses
            </Link>
            <Link to="/users" className="block px-3 py-2 rounded hover:bg-gray-100">
              Users
            </Link>
            <Link to="/roles" className="block px-3 py-2 rounded hover:bg-gray-100">
              Roles
            </Link>
            <Link to="/departments" className="block px-3 py-2 rounded hover:bg-gray-100">
              Departments
            </Link>
            <Link to="/resources" className="block px-3 py-2 rounded hover:bg-gray-100">
              Resources
            </Link>
            <Link to="/book-system" className="block px-3 py-2 rounded hover:bg-gray-100">
              Book System
            </Link>
            <Link to="/forge" className="block px-3 py-2 rounded hover:bg-gray-100">
              Forge
            </Link>
          </nav>

          <div className="mt-10 border-t pt-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                A
              </div>
              <div>
                <div className="text-sm font-medium">admin</div>
                <div className="text-xs">Admin</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <div className="flex items-center gap-4">
              <input
                className="border rounded-md px-3 py-2 text-sm bg-white"
                placeholder="Search in Dashboard..."
              />
              <button className="px-3 py-2 rounded-full bg-white border">
                
              </button>
              <div
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300"
                onClick={() => handleLogout()}
                title="Logout"
              >
                A
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card title="Active Courses" value="4" subtitle="from last month" />
            <Card title="Active Users" value="4" subtitle="from last month" />
            <Card title="Completion Rate" value="40%" subtitle="from last month" />
            <Card title="Avg. Completion Time" value="661.55 days" subtitle="from last month" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2 bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Course Completion Trends</h3>
                <div className="text-sm text-gray-500 space-x-2">
                  <button className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs">
                    Weekly
                  </button>
                  <button className="px-2 py-1 rounded text-xs">Monthly</button>
                </div>
              </div>
              <div className="h-48 flex items-center justify-center text-gray-400">
                [Line chart placeholder]
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Department Engagement</h3>
                <div className="text-xs text-gray-400">6 departments</div>
              </div>
              <div className="h-48 flex items-center justify-center text-gray-400">
                [Bar chart placeholder]
              </div>

              <div className="mt-4 text-xs text-gray-500 flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full inline-block" /> Completion Rate
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-400 rounded-full inline-block" /> Engagement Score
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-4 lg:col-span-2">
              <h3 className="font-medium mb-3">Recent Activity</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    👤
                  </div>
                  <div>
                    <div className="font-medium">
                      Alexander Thompson completed 'Advanced Sales Techniques'
                    </div>
                    <div className="text-xs text-gray-400">Today at 10:45 AM</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Popular Courses</h3>
                <button className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  View All
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <CourseItem title="Advanced Sales Techniques" dept="Sales" />
                <CourseItem title="Estimating Best Practices" dept="Estimating" />
                <CourseItem title="Production Safety" dept="Production" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value, subtitle }) {
  return (
    <div className="bg-white border rounded-lg p-4 flex flex-col justify-between">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {subtitle && <div className="mt-2 text-xs text-gray-400">{subtitle}</div>}
    </div>
  );
}

function CourseItem({ title, dept }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs">
        Img
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-gray-400">{dept}</div>
      </div>
    </div>
  );
}
