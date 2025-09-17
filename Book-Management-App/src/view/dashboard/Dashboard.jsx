import React from "react";

const Dashboard = () => {
  return (
    <div className="h-screen flex gap-1">
      <h1>Side Bar</h1>
      <div className="flex-1  bg-gray-100">
        <div className="sticky top-0 w-full bg-white shadow-md z-50">
          <h1>Header</h1>
        </div>
        <h1>Footer</h1>
      </div>
    </div>
  );
};

export default Dashboard;
