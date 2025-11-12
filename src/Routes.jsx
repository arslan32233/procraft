import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import Roles from "./pages/Roles.jsx";
import Courses from "./pages/Courses.jsx";
import Departments from "./pages/Departments.jsx";
import Resources from "./pages/Resources.jsx";
import BookSystem from "./pages/BookSystem.jsx";
import Forge from "./pages/Forge.jsx";

export default function AppRoutes() {
  const token = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/users"
          element={token ? <Users /> : <Navigate to="/" replace />}
        />
        <Route
          path="/roles"
          element={token ? <Roles /> : <Navigate to="/" replace />}
        />
        <Route
          path="/courses"
          element={token ? <Courses /> : <Navigate to="/" replace />}
        />
        <Route
          path="/departments"
          element={token ? <Departments /> : <Navigate to="/" replace />}
        />
        <Route
          path="/resources"
          element={token ? <Resources /> : <Navigate to="/" replace />}
        />
        <Route
          path="/book-system"
          element={token ? <BookSystem /> : <Navigate to="/" replace />}
        />
        <Route
          path="/forge"
          element={token ? <Forge /> : <Navigate to="/" replace />}
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}
