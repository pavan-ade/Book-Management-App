import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "../book/Book";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../jsUtils/jsUtils";
import { setBooks } from "../../feature/bookManagement/bookManagementSlice";

const BookList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const booksFromRedux = useSelector((state) => state.bookManagement.bookLists);

  const [booksData, setBooksData] = useState({});
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [bookCount,setBookCount] = useState();

  const fetchBooks = async (page = 1) => {
    const data = await getBooks(page);
    setBookCount(data.items);
    setBooksData(data);
    setFilteredBooks(data.data);
    dispatch(setBooks(data.data));
  };

  const handleNext = () => {
    fetchBooks(booksData?.next);
    setPageSize((prev) => prev + 1);
  };

  const handlePrev = () => {
    fetchBooks(booksData?.prev);
    setPageSize((prev) => prev - 1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue.trim()) {
        const query = searchValue.toLowerCase();
        const searched = booksFromRedux.filter(
          ({ title, author }) =>
            title.toLowerCase().includes(query) ||
            author.toLowerCase().includes(query)
        );
        setFilteredBooks(searched);
      } else {
        setFilteredBooks(booksFromRedux);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue, booksFromRedux]);

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
        <div className="border border-gray-300 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => navigate("/addBook")}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="m-1">
        <table className="xl:table-fixed w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="xl:w-1/6 py-3 px-6 text-left border-b border-gray-300">
                Title
              </th>
              <th className="xl:w-1/6 py-3 px-6 text-left border-b border-gray-300">
                Author
              </th>
              <th className="xl:w-2/6 py-3 px-6 text-left border-b border-gray-300">
                Genre
              </th>
              <th className="xl:w-1/12 py-3 px-6 text-left border-b border-gray-300">
                Published Year
              </th>
              <th className="xl:w-1/12 py-3 px-6 text-left border-b border-gray-300">
                Status
              </th>
              <th className="xl:w-1/6 py-3 px-6 text-left border-b border-gray-300">
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
            pageSize <= 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={pageSize <= 1}
          onClick={handlePrev}
        >
          Prev
        </button>

        <span className="px-4 py-2 font-medium text-gray-700">
          Page: <span className="font-bold">{pageSize}</span>
        </span>

        <button
          className={`px-4 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors${
            pageSize >= bookCount / 10 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={pageSize >= bookCount / 10}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
