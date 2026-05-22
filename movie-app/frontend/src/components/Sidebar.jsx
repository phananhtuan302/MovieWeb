import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ selectedType, setSelectedType }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleProtectedLink = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert("Bạn phải đăng nhập để tiếp tục");
      navigate("/login");
    }
  };
  return (
    <>

      <div className="it_st-logo gap-6" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <i className="fa-regular fa-moon"></i>
        <div className=" it_st-logo-text">
          <span className="text-white font-medium text-size">MOON</span>
          <span className="font-medium text-size text-primary">LIGHT</span>
        </div>
      </div>

      <div className="it_st_items it_st-menu gap-6">
        <div className="text-white font-medium text-size">MENU</div>
        <div className="it_st-menu-home item_menu_start text-size font-medium">
          <Link className={`flex gap-6 ${location.pathname === "/" ? "web-now" : ""}`} to="/">
            <i className="fa-solid fa-house"></i>
            Home
          </Link>
        </div>
        <div className="it_st-menu-explore item_menu_start text-size font-medium ">
          <Link className={`flex gap-6 ${location.pathname.startsWith("/explore") ? "web-now" : ""}`} to="/explore">
            <i className="fa-solid fa-compass"></i>
            Explore
          </Link>
        </div>
        <div className="it_st-menu-search item_menu_start text-size font-medium">
          <Link className={`flex gap-6 ${location.pathname.startsWith("/search") ? "web-now" : ""}`} to="/search">
            <i className="fa-solid fa-magnifying-glass"></i>
            Search
          </Link>
        </div>
      </div>

      <div className="it_st_items it_st-personal gap-6">
        <div className="text-white font-medium text-size">PERSONAL</div>
        <div className="it_st-personal-bookmarked item_menu_start text-size font-medium">
          <Link 
            onClick={(e) => handleProtectedLink(e, "/bookmarked")}
            className={`flex gap-6 ${location.pathname.startsWith("/bookmarked") ? "web-now" : ""}`} 
            to="/bookmarked"
          >
            <i className="fa-solid fa-bookmark"></i>
            Bookmarked
          </Link>
        </div>
        <div className="it_st-personal-history item_menu_start text-size font-medium">
          <Link 
            onClick={(e) => handleProtectedLink(e, "/history")}
            className={`flex gap-6 ${location.pathname.startsWith("/history") ? "web-now" : ""}`} 
            to="/history"
          >
            <i className="fa-solid fa-clock"></i>
            History
          </Link>
        </div>
      </div>

      <div className="it_st_items it_st-general gap-6">
        <div className="text-white font-medium text-size">GENERAL</div>
        <div className="it_st-personal-profile item_menu_start text-size font-medium">
          <Link 
            onClick={(e) => handleProtectedLink(e, "/profile")}
            className={`flex gap-6 ${location.pathname.startsWith("/profile") ? "web-now" : ""}`} 
            to="/profile"
          >
            <i className="fa-solid fa-user"></i>
            Profile
          </Link>
        </div>
        <div className="it_st-personal-login item_menu_start text-size font-medium">
          <Link className={`flex gap-6 ${location.pathname.startsWith("/login") ? "web-now" : ""}`} to="/login">
            <i className="fa-solid fa-right-to-bracket"></i>
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
