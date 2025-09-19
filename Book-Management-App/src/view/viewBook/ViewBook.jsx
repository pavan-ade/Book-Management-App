import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const BookModal = () => {
  const books = useSelector((state) => state.bookManagement.bookLists);
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id);

  useEffect(() => {
    console.log(id, "Id");
  }, [id]);

  if (!book) return null;

  const { title, author, genre, published_year, status, summary } = book;

  return (
    <div className="fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p>
          <strong>Author:</strong> {author}
        </p>
        <p>
          <strong>Genres:</strong> {genre?.join(", ")}
        </p>
        <p>
          <strong>Published Year:</strong> {published_year ?? "-"}
        </p>
        <p>
          <strong>Status:</strong> {status ?? "-"}
        </p>
        <p className="mt-2">
          <strong>Summary:</strong> {summary ?? "-"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookModal;
