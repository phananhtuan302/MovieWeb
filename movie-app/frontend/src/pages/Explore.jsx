import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getPopularMovies } from "../services/movieService";
import "../App.css";

export default function Explore() {
  const [selectedType, setSelectedType] = useState("tv");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies(1)
      .then((data) => setMovies(data.results))
      .catch(() => setMovies([]));
  }, []);

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

        <div className="explore-content">
          <h2 className="text-white">Explore {selectedType === "tv" ? "TV Shows" : "Movies"}</h2>
          <div className="filter-bar">
            <select className="filter-select">
              <option>All Genres</option>
              <option>Action</option>
              <option>Comedy</option>
              <option>Drama</option>
              <option>Horror</option>
              <option>Sci-Fi</option>
            </select>
            <select className="filter-select">
              <option>Sort By: Latest</option>
              <option>Rating: High to Low</option>
              <option>Rating: Low to High</option>
              <option>Popularity</option>
            </select>
          </div>
          <div className="movies-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-card-info">
                  <p className="text-white">{movie.title || movie.name}</p>
                  <p className="text-primary">{movie.vote_average?.toFixed(1)}</p>
                </div>
              </div>
            ))}
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
        <div className="rw-search-sugestions">
          <a href="#">Drama</a>
          <a href="#">Comedy</a>
          <a href="#">Talk</a>
          <a href="#">Walk & Politics</a>
          <a href="#">Family</a>
          <a href="#">Kids</a>
          <a href="#">Documentary</a>
        </div>
      </div>
    </div>
  );
}
