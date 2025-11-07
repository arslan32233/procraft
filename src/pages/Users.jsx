import React, { useEffect, useState } from "react";
import {
  getAllUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "../services/index.js";
import { toast } from "react-toastify";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    is_active: true,
    role: "user",
    custom_role: 5,
    password: "",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsersAPI();
      const usersList =
        Array.isArray(res) ? res : res?.results || res?.data || res?.users || [];
      setUsers(Array.isArray(usersList) ? usersList : []);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load users";
      toast.error(msg);
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "custom_role"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      console.log("🔹 Sending payload:", payload);

      let resMessage = "";
      if (editingUser) {
        const res = await updateUserAPI(editingUser.id, payload);
        resMessage = res?.message || "User updated successfully!";
      } else {
        const res = await createUserAPI(payload);
        resMessage = res?.message || "User created successfully!";
      }

      toast.success(resMessage);
      setShowForm(false);
      setEditingUser(null);
      resetForm();
      fetchUsers();
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Error saving user";
      toast.error(msg);
      console.error("Error saving user:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      bio: "",
      is_active: true,
      role: "user",
      custom_role: 5,
      password: "",
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);

    setFormData({
      id: user.id ?? null,
      username: user.username || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      bio: user.bio || "",
      is_active: user.is_active ?? true,
      role: user.role || "user",
      custom_role: user.custom_role ? Number(user.custom_role) : 5,
      password: "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await deleteUserAPI(id);
      const msg = res?.message || "User deleted successfully!";
      toast.success(msg);
      fetchUsers();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete user";
      toast.error(msg);
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingUser(null);
            resetForm();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Create New User
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">All Users</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-2">ID</th>
                <th className="border p-2">Username</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Active</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{user.id}</td>
                    <td className="border p-2">{user.username}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.role || "N/A"}</td>
                    <td className="border p-2 text-center">
                      {user.is_active ? "✅" : "❌"}
                    </td>
                    <td className="border p-2 text-center flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border p-4 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-[600px] max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="border p-2 rounded"
                required
              />
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-2 rounded"
              />
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-2 rounded"
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded"
                required
              />

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="border p-2 rounded col-span-2"
              />
              {!editingUser && (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="border p-2 rounded"
                  required
                />
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />
                <label>Active</label>
              </div>

              <div>
                <label className="block mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Custom Role (ID)</label>
                <select
                  name="custom_role"
                  value={formData.custom_role}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={1}>1 - Viewer</option>
                  <option value={5}>5 - Editor</option>
                  <option value={9}>9 - Super Admin</option>
                </select>
              </div>

              <div className="col-span-2 flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingUser ? "Update User" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
