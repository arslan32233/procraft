import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";

export default function AppRoutes() {
  const token = useSelector((state) => state.auth.token); // Redux se token le lo

  return (
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
    </Routes>
  );
}
