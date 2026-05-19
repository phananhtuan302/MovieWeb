import { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getGenresByMedia, getPopularMedia, getDiscoverMedia } from "../services/movieService";
import "./css/explore.css";
export default function Explore() {
  const [selectedType, setSelectedType] = useState("tv");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [sortBy, setSortBy] = useState("most_recent");
  const [runtimeFrom, setRuntimeFrom] = useState(0);
  const [runtimeTo, setRuntimeTo] = useState(200);
  const [releaseFrom, setReleaseFrom] = useState("");
  const [releaseTo, setReleaseTo] = useState("");
  const initializedRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getPopularMedia(selectedType, 1)
      .then((data) => setMovies(data?.results || []))
      .catch(() => setMovies([]));
  }, [selectedType]);

  // toggle genre selection
  const toggleGenre = (id) => {
    setSelectedGenres((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const applyDiscover = async (page = 1) => {
    const options = {};

    if (selectedGenres.size > 0) options.with_genres = Array.from(selectedGenres).join(",");

    // map sortBy to TMDb param; use date-based when requested
    const dateSort = selectedType === "tv" ? "first_air_date.desc" : "primary_release_date.desc";
    if (sortBy === "most_recent") options.sort_by = dateSort;
    else if (sortBy === "popularity") options.sort_by = "popularity.desc";
    else if (sortBy === "rating_desc") options.sort_by = "vote_average.desc";
    else if (sortBy === "rating_asc") options.sort_by = "vote_average.asc";

    if (runtimeFrom) options["with_runtime.gte"] = runtimeFrom;
    if (runtimeTo) options["with_runtime.lte"] = runtimeTo;

    // release date param names differ between movie and tv
    if (releaseFrom) {
      const key = selectedType === "tv" ? "first_air_date.gte" : "primary_release_date.gte";
      options[key] = normalizeDateInput(releaseFrom);
    }
    if (releaseTo) {
      const key = selectedType === "tv" ? "first_air_date.lte" : "primary_release_date.lte";
      options[key] = normalizeDateInput(releaseTo);
    }

    options.page = page;
    // update URL query params (user-friendly names)
    const outParams = new URLSearchParams();
    if (selectedGenres.size > 0) outParams.set("genre", Array.from(selectedGenres).join(","));
    if (runtimeFrom !== undefined && runtimeFrom !== null) outParams.set("minRuntime", String(runtimeFrom));
    if (runtimeTo !== undefined && runtimeTo !== null) outParams.set("maxRuntime", String(runtimeTo));
    if (sortBy) outParams.set("sort", sortBy);
    if (releaseFrom) outParams.set("releaseFrom", normalizeDateInput(releaseFrom));
    if (releaseTo) outParams.set("releaseTo", normalizeDateInput(releaseTo));
    outParams.set("page", String(page));
    const newQs = outParams.toString();
    navigate(`${location.pathname}${newQs ? `?${newQs}` : ""}`, { replace: true });

    try {
      const data = await getDiscoverMedia(selectedType, options);
      setMovies(data?.results || []);
    } catch (e) {
      setMovies([]);
    }
  };

  // convert dd/mm/yyyy -> yyyy-mm-dd, otherwise return original
  const normalizeDateInput = (s) => {
    if (!s) return s;
    const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m) {
      return `${m[3]}-${m[2]}-${m[1]}`;
    }
    return s;
  };

  useEffect(() => {
    getGenresByMedia(selectedType)
      .then((data) => {
        const genreList = Array.isArray(data) ? data : data?.genres || [];
        setGenres(genreList);
      })
      .catch(() => setGenres([]));
  }, [selectedType]);

  // on initial mount, if URL has query params, parse them and apply
  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    if (!qs.toString()) return;

    // parse genre param (comma separated)
    const g = qs.get("genre");
    if (g) {
      const set = new Set(g.split(",").map((x) => Number(x)).filter(Boolean));
      setSelectedGenres(set);
    }

    const minR = qs.get("minRuntime");
    if (minR) setRuntimeFrom(Number(minR));
    const maxR = qs.get("maxRuntime");
    if (maxR) setRuntimeTo(Number(maxR));

    const s = qs.get("sort");
    if (s) setSortBy(s);

    const rf = qs.get("releaseFrom");
    if (rf) setReleaseFrom(rf);
    const rt = qs.get("releaseTo");
    if (rt) setReleaseTo(rt);

    // apply discover with parsed params
    initializedRef.current = true;
    applyDiscover(Number(qs.get("page") || 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-apply discover when filters change (but skip first mount)
  const selectedGenresKey = Array.from(selectedGenres).sort().join(",");
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }
    applyDiscover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenresKey, sortBy, runtimeFrom, runtimeTo, releaseFrom, releaseTo, selectedType]);

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
              className={"movie_type-2 " + (selectedType === "movie" ? "active" : "")}
              onClick={() => setSelectedType("movie")}
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
            <select
              className="filter-select"
              onChange={(e) => {
                const val = e.target.value;
                if (val === "all") setSelectedGenres(new Set());
              }}
            >
              <option value="all">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="most_recent">Sort By: Most recent</option>
              <option value="rating_desc">Rating: High to Low</option>
              <option value="rating_asc">Rating: Low to High</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
          <div className="movies-grid">
            {movies.map((movie) => (
              <Link key={movie.id} to={`${"/" + selectedType}/${movie.id}`} className="movie-card">
                <div className="rating-badge">
                  <span className="rating-value">{movie.vote_average?.toFixed(1)}</span>
                  <i className="fa-solid fa-star rating-star" aria-hidden="true"></i>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title || movie.name}
                />
                <div className="movie-card-info">
                  <p className="text-white">{movie.title || movie.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="right_wed">
        <div className="sort-panel">
          <h3 className="text-white">Sort results by</h3>

          <div className="sort-group">
            <label className="sort-label text-white">Most recent</label>
            <select className="filter-select">
              <option>Most recent</option>
              <option>Popularity</option>
              <option>Rating: High to Low</option>
              <option>Rating: Low to High</option>
            </select>
          </div>

          <div className="sort-group">
            <label className="sort-label text-white">Filter</label>
          </div>

          <div className="sort-group">
            <label className="sort-label text-white">Genres</label>
            <div className="genre-panel">
              <div className="genre-list">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    className={"genre-chip " + (selectedGenres.has(genre.id) ? "active" : "")}
                    onClick={() => toggleGenre(genre.id)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <button className="genre-chip" onClick={() => applyDiscover()}>
                Apply
              </button>
            </div>
          </div>

          <div className="sort-group">
            <label className="sort-label text-white">Runtime (max)</label>
            <div className="runtime-range">
              <div className="runtime-input">
                <input
                  type="range"
                  min={0}
                  max={400}
                  value={runtimeTo}
                  onChange={(e) => setRuntimeTo(Number(e.target.value))}
                />
                <div className="runtime-value">0 - {runtimeTo} min</div>
              </div>
            </div>
          </div>

          <div className="sort-group">
            <label className="sort-label text-white">Release Dates</label>
            <div className="release-dates">
              <div className="release-input">
                <span>From</span>
                <input type="text" defaultValue="11/04/2002" />
              </div>
              <div className="release-input">
                <span>To</span>
                <input type="text" placeholder="dd/mm/yyyy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
