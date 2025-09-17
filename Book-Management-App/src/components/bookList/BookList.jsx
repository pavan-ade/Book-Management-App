import React, { use, useEffect, useState } from "react";
import { getBooks } from "../../jsUtils/jsUtils";
import { useNavigate, useParams } from "react-router-dom";
import Book from "../book/Book";

const BookList = () => {
  const [booksData, setBooksData] = useState([]);
  const [pageSize, setPageSize] = useState(1);

  const fetchBooks = async (page) => {
    const data = await getBooks(page);
    setBooksData(data);
  };
  const handleNext = () => {
    fetchBooks(booksData?.next);
    setPageSize(pageSize + 1);
  };
  const handlePrev = () => {
    fetchBooks(booksData?.prev);
    setPageSize(pageSize - 1);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div>
      <h2>Book List</h2>
      <p>Total Books : {booksData?.items}</p>
      <button>Add</button>
      <div className="m-1">
        <table>
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Title
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Author
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Genre
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Published Year
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Status
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {booksData?.data?.map((book, inx) => (
              <Book key={book.id + inx} {...book} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2 mt-6 mr-6 pb-2">
        <button
          className={`px-4 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors ${
            !booksData?.prev ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!booksData?.prev}
          onClick={handlePrev}
        >
          Prev
        </button>

        <span className="px-4 py-2 font-medium text-gray-700">
          Page: <span className="font-bold">{pageSize}</span>
        </span>

        <button
          className={`px-4 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors ${
            !booksData?.next ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!booksData?.next}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
