import Footer from "../../components/footer/Footer";
import BookList from "../../components/bookList/BookList";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-screen flex gap-1">
      <div className="flex-1  bg-gray-100">
        <div className="sticky top-0 w-full bg-white shadow-md z-50">
          <BookList />
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
