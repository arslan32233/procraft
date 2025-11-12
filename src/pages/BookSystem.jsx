import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function BookSystem() {
  const [books, setBooks] = useState([
    { id: 1, title: "React for Beginners", author: "John Doe", status: "Available" },
    { id: 2, title: "Advanced Node.js", author: "Jane Smith", status: "Checked Out" },
    { id: 3, title: "CSS Mastery", author: "Alice Johnson", status: "Available" },
    { id: 4, title: "JavaScript Patterns", author: "Bob Brown", status: "Checked Out" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8 ml-64 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Book System</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage all books in the system and track their availability.
            </p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow text-sm font-medium transition">
            + Add Book
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                <p className="text-gray-500 text-sm mt-1">Author: {book.author}</p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    book.status === "Available" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Status: {book.status}
                </p>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button className="text-sky-600 hover:text-sky-800 text-sm font-medium transition">
                  View
                </button>
                <button className="text-orange-600 hover:text-orange-800 text-sm font-medium transition">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
