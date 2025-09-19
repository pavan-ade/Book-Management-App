import React from "react";
import { useId } from "react";
import { useNavigate } from "react-router-dom";

const Book = ({ id, title, author, genre, published_year, status }) => {
  const uniqId = useId();
  const navigate = useNavigate();
  return (
    <>
      <tr key={id} className="hover:bg-gray-100">
        <td className="py-2 px-4 border-b border-gray-300">{title}</td>
        <td className="py-2 px-4 border-b border-gray-300">{author}</td>
        <td className="py-2 px-4 border-b border-gray-300">
          {genre?.map((item, inx) => (
            <span
              key={uniqId + inx}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-1 px-2 py-1 rounded"
            >
              {item}
            </span>
          ))}
        </td>
        <td className="py-2 px-4 border-b border-gray-300">
          {published_year ?? "-"}
        </td>
        <td className="py-2 px-4 border-b border-gray-300">{status ?? "-"}</td>
        <td className="py-2 px-4 border-b border-gray-300">
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/viewBook/${id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              View
            </button>
            <button
              onClick={() => navigate(`/updateBook/${id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => navigate(`/deleteBook/${id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Book;
