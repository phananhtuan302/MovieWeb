import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../App.css";

export default function History() {
  const [selectedType, setSelectedType] = useState("tv");
  const [historyMovies] = useState([
    // Placeholder data — replace with actual history from API/storage
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

        <div className="history-content">
          <h2 className="text-white">
            <i className="fa-solid fa-clock"></i> Watch History
          </h2>
          {historyMovies.length > 0 ? (
            <div className="history-list">
              {historyMovies.map((movie) => (
                <div key={movie.id} className="history-item">
                  <img src={movie.posterPath} alt={movie.title} />
                  <div className="history-info">
                    <p className="text-white">{movie.title}</p>
                    <p className="text-muted">Watched on {movie.watchedDate}</p>
                    <p className="text-primary">Last watched: {movie.lastWatched}</p>
                  </div>
                  <button className="continue-btn">Continue</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-clock" style={{ fontSize: "3rem" }}></i>
              <p className="text-white">No watch history yet.</p>
              <p className="text-muted">Start watching to see your history here!</p>
            </div>
          )}
        </div>
      </div>

      <div className="right_wed">
        <div className="rw-search">
          <button className="rw-search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input className="rw-search-input" type="text" placeholder="Search history..." />
        </div>
      </div>
    </div>
  );
}
