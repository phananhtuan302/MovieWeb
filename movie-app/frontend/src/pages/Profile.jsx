import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../App.css";

export default function Profile() {
  const [selectedType, setSelectedType] = useState("tv");
  const [profileData] = useState({
    name: "Anonymous",
    email: "user@example.com",
    avatar: "~/Content/img/avt.jpg",
    joinDate: "2024-01-01",
    preferences: {
      theme: "dark",
      notifications: true,
      privateProfile: false,
    },
  });

  return (
    <div className="ticks">
      <div className="items_start">
        <Sidebar selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      <div className="center_web">
        <div className="movie_type-and-account">
          <div className="movie_type gap-6">
            <div
              className={"movie_type-1 " + (selectedType === "tv" ? "active" : "")}
              onClick={() => setSelectedType("tv")}
            >
              TV Show
            </div>
            <div
              className={"movie_type-2 " + (selectedType === "movies" ? "active" : "")}
              onClick={() => setSelectedType("movies")}
            >
              Movies
            </div>
          </div>
          <div className="center_web-account_name text-size">
            <img src={profileData.avatar} alt="avatar" />
            <p>Anonymous</p>
          </div>
        </div>

        <div className="profile-content">
          <h2 className="text-white">
            <i className="fa-solid fa-user"></i> My Profile
          </h2>

          <div className="profile-section">
            <div className="profile-header">
              <img src={profileData.avatar} alt={profileData.name} className="profile-avatar" />
              <div className="profile-info">
                <h3 className="text-white">{profileData.name}</h3>
                <p className="text-muted">{profileData.email}</p>
                <p className="text-muted">Joined {profileData.joinDate}</p>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="text-white">Preferences</h3>
            <div className="preference-item">
              <label className="text-white">Theme</label>
              <select>
                <option>Dark (default)</option>
                <option>Light</option>
              </select>
            </div>
            <div className="preference-item">
              <label className="text-white">
                <input type="checkbox" defaultChecked={profileData.preferences.notifications} />
                Enable Notifications
              </label>
            </div>
            <div className="preference-item">
              <label className="text-white">
                <input type="checkbox" defaultChecked={profileData.preferences.privateProfile} />
                Private Profile
              </label>
            </div>
          </div>

          <div className="profile-section">
            <button className="btn-primary">Edit Profile</button>
            <button className="btn-secondary">Change Password</button>
            <button className="btn-danger">Logout</button>
          </div>
        </div>
      </div>

      <div className="right_wed">
        <div className="rw-search">
          <button className="rw-search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input className="rw-search-input" type="text" placeholder="Search..." />
        </div>
      </div>
    </div>
  );
}
