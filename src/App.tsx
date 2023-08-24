import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { PrivateRoutes } from "./privateRoute";
import Search from "./pages/Search";

function App() {
  return (
    <div className="text-white">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Search />} path="/search" />
        </Route>
        {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
