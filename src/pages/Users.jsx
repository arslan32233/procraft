import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const emptyForm = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    is_active: true,
    role: "",
    custom_role: "",
    password: "",
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    (async () => {
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
    })();
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
        setUsers((prev) => [newUser, ...prev]);
      }
      setShowForm(false);
      setEditingUser(null);
      setFormData(emptyForm);
    } catch (err) {
      toast.error(err?.message || "Error saving user");
    }
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
      role: user.role || "",
      custom_role: user.custom_role?.id || user.custom_role || "",
      password: "",
    });
  };

  const handleDelete = (user) => {
    setDeleteUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteUser) return;
    try {
      await deleteUserAPI(deleteUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to delete user");
    } finally {
      setDeleteUser(null);
      setShowDeleteModal(false);
    }
  };

  const openForm = () => {
    setShowForm(true);
    setEditingUser(null);
    setFormData(emptyForm);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
          <button
            onClick={openForm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Create New User
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
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
                  <th className="border p-2">Custom Role</th>
                  <th className="border p-2">Active</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="border p-2 text-center">{user.id}</td>
                      <td className="border p-2">{user.username}</td>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2">{user.role || "N/A"}</td>
                      <td className="border p-2">{user.custom_role?.name || "-"}</td>
                      <td className="border p-2 text-center">
                        {user.is_active ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </td>
                      <td className="border p-2 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <PencilSquareIcon className="w-5 h-5 inline" />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <TrashIcon className="w-5 h-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="border p-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl shadow-lg w-[500px] max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  ["Username", "username"],
                  ["First Name", "first_name"],
                  ["Last Name", "last_name"],
                  ["Email", "email", "email"],
                ].map(([label, name, type = "text"]) => (
                  <div key={name}>
                    <label className="block mb-1 font-medium text-gray-700">{label}</label>
                    <input
                      name={name}
                      type={type}
                      value={formData[name]}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      required={["username", "email"].includes(name)}
                    />
                  </div>
                ))}

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {!editingUser && (
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      required
                    />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                  <label className="font-medium text-gray-700">Active</label>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Custom Role</label>
                  <select
                    name="custom_role"
                    value={formData.custom_role}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select a custom role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 mt-4">
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
        {showDeleteModal && deleteUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Are you sure you want to delete {deleteUser.username}?
              </h3>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
