import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { searchMovies } from "../services/movieService";
import "../App.css";

export default function Search() {
  const [selectedType, setSelectedType] = useState("tv");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    try {
      const data = await searchMovies(searchQuery);
      setResults(data.results || []);
    } catch {
      setResults([]);
    }
  };

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

        <div className="search-content">
          <h2 className="text-white">Search {selectedType === "tv" ? "TV Shows" : "Movies"}</h2>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Enter movie or show title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </form>

          {hasSearched && (
            <div className="search-results">
              {results.length > 0 ? (
                <>
                  <p className="text-white">Found {results.length} results</p>
                  <div className="movies-grid">
                    {results.map((movie) => (
                      <div key={movie.id} className="movie-card">
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                              : "https://via.placeholder.com/300x450?text=No+Image"
                          }
                          alt={movie.title || movie.name}
                        />
                        <div className="movie-card-info">
                          <p className="text-white">{movie.title || movie.name}</p>
                          <p className="text-primary">{movie.vote_average?.toFixed(1)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-white">No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="right_wed">
        <div className="rw-search">
          <button className="rw-search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input className="rw-search-input" type="text" placeholder="Quick search..." />
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
