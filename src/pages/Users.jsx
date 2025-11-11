import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getAllUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  getAllRolesAPI,
} from "../services/index.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    is_active: true,
    role: "user",
    custom_role: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersData = await getAllUsersAPI();
        setUsers(Array.isArray(usersData) ? usersData : usersData?.results || []);

        const rolesData = await getAllRolesAPI();
        setRoles(Array.isArray(rolesData) ? rolesData : rolesData?.results || []);
      } catch (err) {
        toast.error(err?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      if (editingUser) {
        const updatedUser = await updateUserAPI(editingUser.id, formData);
        toast.success("User updated successfully!");
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...updatedUser } : u))
        );
      } else {
        const newUser = await createUserAPI(formData);
        toast.success("User created successfully!");
        setUsers((prev) => [...prev, newUser]);
      }

      setShowForm(false);
      setEditingUser(null);
      resetForm();
    } catch (err) {
      toast.error(err?.message || "Error saving user");
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      bio: "",
      is_active: true,
      role: "user",
      custom_role: "",
      password: "",
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
    setFormData({
      username: user.username || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      bio: user.bio || "",
      is_active: user.is_active ?? true,
      role: user.role || "user",
      custom_role: user.custom_role || "",
      password: "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserAPI(id);
      toast.success("User deleted successfully!");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      toast.error(err?.message || "Failed to delete user");
    }
  };

  return (
    <div className="p-8">
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
                      {user.is_active ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="border p-2 text-center space-x-2">
                      <button onClick={() => handleEdit(user)} className="text-blue-500 hover:text-blue-700" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700" title="Delete">
                        <FaTrash />
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

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg w-[600px] max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="border p-2 rounded" required />
              <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" />
              <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" />
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
              <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="border p-2 rounded col-span-2" />
              {!editingUser && <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded" required />}
              <div className="flex items-center space-x-2">
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                <label>Active</label>
              </div>
              <div>
                <label className="block mb-1">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="border p-2 rounded w-full">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Custom Role</label>
                <select name="custom_role" value={formData.custom_role} onChange={handleChange} className="border p-2 rounded w-full" required>
                  <option value="">Select a role</option>
                  {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
                </select>
              </div>
              <div className="col-span-2 flex justify-end space-x-3 mt-4">
                <button type="button" onClick={() => { setShowForm(false); setEditingUser(null); }} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editingUser ? "Update User" : "Submit"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
