import React, { useState } from "react";
import CloseButton from "../../components/closeButton/CloseButton";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook as deleteBookApi } from "../../jsUtils/jsUtils"; 
import { deleteBook as deleteBookAction } from "../../feature/bookManagement/bookManagementSlice"; 
import Toast from "../../components/toast/Toast";
import { useDispatch } from "react-redux";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toast, setToast] = useState(null);
  const dispatch = useDispatch();

  const hanldeDelete = async () => {
    const res = await deleteBookApi(id);
    if (res) {
      dispatch(deleteBookAction({ id })); 
      setToast({ message: "Book deleted successfully!", type: "success" });
    } else {
      setToast({ message: "Failed to delete book", type: "error" });
    }
    setTimeout(() => navigate(-1), 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <p className="text-2xl text-center text-gray-800 mb-4">Delete Book</p>
        <CloseButton />
        <div className="flex justify-center mt-3">
          <button
            onClick={hanldeDelete}
            className="text-white bg-red-500 border-0 py-1 px-4 mx-2 focus:outline-none hover:bg-red-600 rounded text-md"
          >
            Yes
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-white bg-green-500 border-0 py-1 px-4 mx-2 focus:outline-none hover:bg-green-600 rounded text-md"
          >
            No
          </button>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DeleteBook;
