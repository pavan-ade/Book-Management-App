import React, { useState, useEffect } from "react";
import CloseButton from "../../components/closeButton/CloseButton";
import {
  addBook as addBookApi,
  updateBook as updateBookApi,
  getBookById,
} from "../../jsUtils/jsUtils";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../components/toast/Toast";
import { useDispatch } from "react-redux";
import {
  addBook as addBookAction,
  updateBook as updateBookAction,
} from "../../feature/bookManagement/bookManagementSlice";

const AddOrEditBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("available");
  const [summary, setSummary] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        const book = await getBookById(id);
        if (book) {
          setTitle(book.title);
          setAuthor(book.author);
          setPublishedYear(book.published_year || "");
          setGenre(book.genre?.join(",") || "");
          setStatus(book.status || "available");
          setSummary(book.summary || "");
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      id: id || Date.now().toString(),
      title,
      author,
      published_year: Number(publishedYear),
      genre: genre ? genre.split(",").map((g) => g.trim()) : [],
      status,
      summary,
    };

    try {
      if (id) {
        const res = await updateBookApi(bookData);
        if (res) {
          dispatch(updateBookAction(bookData));
          setToast({ message: "Book updated successfully!", type: "success" });
        } else {
          setToast({ message: "Failed to update book", type: "error" });
        }
      } else {
        const res = await addBookApi(bookData);
        if (res) {
          dispatch(addBookAction(bookData));
          setToast({ message: "Book added successfully!", type: "success" });
        } else {
          setToast({ message: "Failed to add book", type: "error" });
        }
      }

      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      console.error("Error:", err);
      setToast({ message: "Something went wrong", type: "error" });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative max-h-80 overflow-y-auto">
          <p className="text-2xl text-center text-gray-800 mb-4">
            {id ? "Edit Book" : "Add a New Book"}
          </p>
          <CloseButton />
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
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
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg outline-none"
              >
                {id ? "Update Book" : "Add Book"}
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

export default AddOrEditBook;
