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
    username: "hamza101",
    first_name: "hamza",
    last_name: "hamza",
    email: "test@gmail.com",
    phone_number: null,
    date_of_birth: null,
    bio: "hamza",
    is_active: true,
    role: "user",
    custom_role: 9,
    password: "1234567a-",
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
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, custom_role: Number(formData.custom_role) };

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
      setFormData({
        id: null,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        bio: "",
        is_active: true,
        role: "user",
        custom_role: 5,
        password: "",
      });

      fetchUsers();
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Error saving user";
      toast.error(msg);
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
    setFormData({
      ...user,
      password: "",
      custom_role: Number(user.custom_role),
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
        error?.response?.data?.message || error?.message || "Failed to delete user";
      toast.error(msg);
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingUser(null);
            setFormData({
              id: null,
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              phone_number: "",
              date_of_birth: "",
              bio: "",
              is_active: true,
              role: "user",
              custom_role: 5,
              password: "",
            });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showForm ? "Close Form" : "Create New User"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
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
            <input
              name="phone_number"
              value={formData.phone_number || ""}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-2 rounded"
            />
            <input
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth || ""}
              onChange={handleChange}
              className="border p-2 rounded"
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

            <button
              type="submit"
              className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {editingUser ? "Update User" : "Submit"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-semibold mb-3">All Users</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Username</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Active</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-2 text-center">{user.id}</td>
                    <td className="border p-2">{user.username}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.role || "N/A"}</td>
                    <td className="border p-2 text-center">{user.is_active ? "✅" : "❌"}</td>
                    <td className="border p-2 text-center space-x-3 flex justify-center">
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
                  <td colSpan="6" className="border p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
