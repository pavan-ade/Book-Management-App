import React, { useEffect, useState } from "react";
import CloseButton from "../../components/closeButton/CloseButton";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook as deleteBookApi } from "../../jsUtils/jsUtils";
import { deleteBook as deleteBookAction } from "../../feature/bookManagement/bookManagementSlice";
import Toast from "../../components/toast/Toast";

const DeleteBook = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [toast, setToast] = useState(null);

  const hanldeDelete = async () => {
    const res = await deleteBook(param.id);
    console.log(res, "testing");
    if (res) {
      dispatch(deleteBookAction({ id }));
      setToast({ message: "Book deleted successfully!", type: "success" });
    } else {
      setToast({ message: "Failed to add book", type: "error" });
    }
    navigate(-1);
  };

  useEffect(() => {
    console.log("rendering component");
  }, [toast]);
  return (
    <div className="fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <p className="text-2xl text-center text-gray-800 mb-4">
          Do you want delete book ?
        </p>
        <CloseButton />
        <div className="flex justify-center mt-3 ">
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
