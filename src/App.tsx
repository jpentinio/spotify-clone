import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { PrivateRoutes } from "./privateRoute";
import Search from "./pages/Search";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import Playlist from "./pages/Playlist";
import User from "./pages/User";

function App() {
  return (
    <div className="text-white">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Search />} path="/search/*" />
          <Route element={<Album />} path="/album/:id" />
          <Route element={<Artist />} path="/artist/:id" />
          <Route element={<Playlist />} path="/playlist/:id" />
          <Route element={<User />} path="/user/:id" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
