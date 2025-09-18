import React, { useEffect, useState } from "react";
import CloseButton from "../../components/closeButton/CloseButton";
import { addBook } from "../../jsUtils/jsUtils";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/toast/Toast";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("available");
  const [summary, setSummary] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      published_year: Number(publishedYear),
      genre: genre.split(",").map((g) => g.trim()),
      status,
      summary,
    };
    const res = await addBook(newBook);
    if (res) {
      setToast({ message: "Book added successfully!", type: "success" });
    } else {
      setToast({ message: "Failed to add book", type: "error" });
    }
    console.log(res, "adding Book");

    setTitle("");
    setAuthor("");
    setPublishedYear("");
    setGenre("");
    setStatus("available");
    setSummary("");
    navigate("/");
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
          <p className="text-2xl text-center text-gray-800 mb-4">
            Add a New Book
          </p>
          <CloseButton />

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />

            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />

            <input
              type="number"
              placeholder="Published Year"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type="text" 
              placeholder="Genres (comma separated)"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="available">Available</option>
              <option value="checked_out">Checked Out</option>
            </select>

            <textarea
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            ></textarea>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg outline-none"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default AddBook;
