import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../App.css";

export default function Bookmarked() {
  const [selectedType, setSelectedType] = useState("tv");
  const [bookmarkedMovies] = useState([
    // Placeholder data — replace with actual bookmarks from API/storage
  ]);

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
            <img src="~/Content/img/avt.jpg" alt="avatar" />
            <p>Anonymous</p>
          </div>
        </div>

        <div className="bookmarked-content">
          <h2 className="text-white">
            <i className="fa-solid fa-bookmark"></i> My Bookmarked {selectedType === "tv" ? "TV Shows" : "Movies"}
          </h2>
          {bookmarkedMovies.length > 0 ? (
            <div className="movies-grid">
              {bookmarkedMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img src={movie.posterPath} alt={movie.title} />
                  <div className="movie-card-info">
                    <p className="text-white">{movie.title}</p>
                    <p className="text-primary">{movie.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-bookmark" style={{ fontSize: "3rem" }}></i>
              <p className="text-white">No bookmarked {selectedType === "tv" ? "TV shows" : "movies"} yet.</p>
              <p className="text-muted">Add your favorites to see them here!</p>
            </div>
          )}
        </div>
      </div>

      <div className="right_wed">
        <div className="rw-search">
          <button className="rw-search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input className="rw-search-input" type="text" placeholder="Search bookmarks..." />
        </div>
      </div>
    </div>
  );
}
