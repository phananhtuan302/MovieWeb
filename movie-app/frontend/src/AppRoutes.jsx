import { Routes, Route } from "react-router-dom";
import App from "./App";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import Bookmarked from "./pages/Bookmarked";
import History from "./pages/History";
import Profile from "./pages/Profile";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/tv/:id" element={<MovieDetail />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route path="/bookmarked" element={<PrivateRoute><Bookmarked /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
}
