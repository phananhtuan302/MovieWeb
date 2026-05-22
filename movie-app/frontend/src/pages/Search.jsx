import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { searchMovies } from "../services/movieService";
import { Link, useSearchParams } from "react-router-dom";
import "../App.css";
import "./css/Search.css";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState("tv");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchFilter, setSearchFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Perform search when URL query parameter changes
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearchQuery(queryParam);
      performSearch(queryParam, "all", 1);
    }
  }, [searchParams]);

  const performSearch = async (query, filter, page) => {
    if (!query.trim()) return;

    setHasSearched(true);
    setCurrentPage(page);
    try {
      const data = await searchMovies(query, filter, page);
      setResults(data.results || []);
      setTotalPages(data.total_pages || 1);
      setTotalResults(data.total_results || 0);
    } catch {
      setResults([]);
      setTotalPages(1);
      setTotalResults(0);
    }
  };

  const handleSearch = async (e, page = 1) => {
    e.preventDefault();
    performSearch(searchQuery, searchFilter, page);
  };

  const handleFilterClick = (filter) => {
    setSearchFilter(filter);
    setCurrentPage(1);
    // Re-search with new filter if already searched
    if (hasSearched && searchQuery.trim()) {
      searchMovies(searchQuery, filter, 1)
        .then((data) => {
          setResults(data.results || []);
          setTotalPages(data.total_pages || 1);
          setTotalResults(data.total_results || 0);
        })
        .catch(() => {
          setResults([]);
          setTotalPages(1);
          setTotalResults(0);
        });
    }
  };

  const handlePageChange = (page) => {
    if (hasSearched && searchQuery.trim()) {
      const event = { preventDefault: () => {} };
      handleSearch(event, page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="ticks">
      <div className="items_start">
        <Sidebar selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      <div className="center_web">
        {!hasSearched && (
          <div className="search-header">
            <h1 className="search-title text-primary">Find Your Next Favorite</h1>
            <p className="search-subtitle text-white">Search millions of movies, shows & people</p>
          </div>
        )}

        <div className={`search-form-container ${hasSearched ? "compact" : ""}`}>
          <form onSubmit={(e) => handleSearch(e, 1)} className="search-form-large">
            <div className="search-input-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                placeholder="Search movies, shows, people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-large"
              />
              <button type="submit" className="search-btn-large">
                Search
              </button>
            </div>
          </form>
        </div>

        {hasSearched && (
          <div className="search-results-container">
            <div className="results-header">
              <h2 className="text-white">
                {results.length > 0
                  ? `Found ${totalResults} results (Showing page ${currentPage} of ${totalPages})`
                  : "No results found"}
              </h2>
            </div>

            {results.length > 0 ? (
              <>
                <div className="search-results-grid">
                  {results.map((item) => (
                    <Link
                      key={item.id}
                      to={
                        item.media_type === "person"
                          ? `/person/${item.id}`
                          : `/${item.media_type || "movie"}/${item.id}`
                      }
                      className="search-result-card"
                    >
                      <div className="result-image-wrapper">
                        {item.media_type === "person" ? (
                          <img
                            src={
                              item.profile_path
                                ? `https://image.tmdb.org/t/p/w300${item.profile_path}`
                                : "https://via.placeholder.com/300x450?text=No+Image"
                            }
                            alt={item.name}
                            className="result-image"
                          />
                        ) : (
                          <>
                            <img
                              src={
                                item.poster_path
                                  ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                                  : "https://via.placeholder.com/300x450?text=No+Image"
                              }
                              alt={item.title || item.name}
                              className="result-image"
                            />
                            {item.vote_average && (
                              <div className="result-rating-badge">
                                <span className="result-rating">{item.vote_average.toFixed(1)}</span>
                                <i className="fa-solid fa-star"></i>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="result-info">
                        <p className="result-title text-white">
                          {item.title || item.name}
                        </p>
                        <p className="result-type text-primary">
                          {item.media_type === "person"
                            ? "Person"
                            : item.media_type === "tv"
                            ? "TV Show"
                            : "Movie"}
                        </p>
                        {item.release_date && (
                          <p className="result-date text-secondary">
                            {new Date(item.release_date).getFullYear()}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination-container">
                    <div className="pagination">
                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      >
                        First
                      </button>

                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <i className="fa-solid fa-chevron-left"></i>
                      </button>

                      {/* Page Numbers */}
                      <div className="pagination-numbers">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              className={`pagination-number ${currentPage === pageNum ? "active" : ""}`}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>

                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        Last
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <i className="fa-solid fa-face-frown"></i>
                <p className="text-white">No results found. Try another search!</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="right_wed">

        <div className="rw-search-filters">
          <div className="filter-title text-white font-medium">Search Results</div>
          <div className="filter-options">
            <button
              className={`filter-option ${searchFilter === "all" ? "active" : ""}`}
              onClick={() => handleFilterClick("all")}
            >
              All
            </button>
            <button
              className={`filter-option ${searchFilter === "movie" ? "active" : ""}`}
              onClick={() => handleFilterClick("movie")}
            >
              Movie
            </button>
            <button
              className={`filter-option ${searchFilter === "tv" ? "active" : ""}`}
              onClick={() => handleFilterClick("tv")}
            >
              TV Show
            </button>
            <button
              className={`filter-option ${searchFilter === "person" ? "active" : ""}`}
              onClick={() => handleFilterClick("person")}
            >
              People
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
