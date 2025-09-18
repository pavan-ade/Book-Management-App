import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CloseButton = () => {
  const navigate = useNavigate();
  const handleClosePop = () => {
    navigate(-1);
  };
  return (
    <button
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      onClick={handleClosePop}
    >
      ✖
    </button>
  );
};

export default CloseButton;
