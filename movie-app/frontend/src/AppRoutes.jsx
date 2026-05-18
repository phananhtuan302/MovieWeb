import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import Bookmarked from "./pages/Bookmarked";
import History from "./pages/History";
import Profile from "./pages/Profile";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/search" element={<Search />} />
      <Route path="/bookmarked" element={<Bookmarked />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
