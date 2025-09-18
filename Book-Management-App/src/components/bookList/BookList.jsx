import React, { use, useEffect, useState } from "react";
import { getBooks } from "../../jsUtils/jsUtils";
import { useNavigate, useParams } from "react-router-dom";
import Book from "../book/Book";

const BookList = () => {
  const [booksData, setBooksData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const fetchBooks = async (page) => {
    const data = await getBooks(page);
    setBooksData(data);
    setFilteredBooks(data.data);
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
    console.log(searchValue);
    const handler = setTimeout(() => {
      if (searchValue.trim()) {
        const query = searchValue.toLowerCase();
        const searchedTask = booksData?.data?.filter(
          ({ title, author }) =>
            title.toLowerCase().includes(query) ||
            author.toLowerCase().includes(query)
        );
        setFilteredBooks(searchedTask || []);
      } else {
        setFilteredBooks(booksData?.data || []);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, booksData]);

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div>
      <h2 className="text-center me-6 text-6xl py-3">Book Management App</h2>
      <p className="text-end me-6 text-2xl py-3">
        Total Books : {booksData?.items}
      </p>
      <div className="flex justify-end items-center gap-2 mr-6">
        <div className="flex justify-end items-center gap-0  mr-6">
          <div className="border border-gray-300 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="border border-gray-300 rounded overflow-hidden">
          <button 
            onClick={()=>navigate("/addBook")}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors">
            Add
          </button>
        </div>
      </div>

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
            {filteredBooks?.map((book, inx) => (
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
