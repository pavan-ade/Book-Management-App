import "./App.css";
import router from "./route/routes";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import FallBackLoader from "./components/fallBackLoader/FallBackLoader";

function App() {
  return (
    <>
      <Suspense fallback={<FallBackLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
