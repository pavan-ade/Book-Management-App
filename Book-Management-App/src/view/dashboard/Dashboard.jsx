import Footer from "../../components/footer/Footer";
import BookList from "../../components/bookList/BookList";

const Dashboard = () => {
  return (
    <div className="h-screen flex gap-1">
      <div className="flex-1  bg-gray-100">
        <div className="sticky top-0 w-full bg-white shadow-md z-50">
          <h1>Header</h1>
          <BookList />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
