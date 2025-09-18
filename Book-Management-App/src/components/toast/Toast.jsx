import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-700";

  return (
    <div
      className={`fixed top-5 right-5 z-50 text-black px-4 py-2 rounded shadow-lg ${bgColor}`}
    >
      {message}
    </div>
  );
};

export default Toast;
