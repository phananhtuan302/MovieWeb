import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { getMovieDetail, getMovieCredits, getMovieReviews, getSimilarMovies } from "../services/movieService";
import "./css/MovieDetail.css";

export default function MovieDetail() {
  const { id } = useParams();
  const movieId = id;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [tab, setTab] = useState("overall");
  const [seasonExpanded, setSeasonExpanded] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    getMovieDetail(movieId)
      .then((data) => setMovie(data))
      .catch(() => setMovie(null));
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;
    getMovieCredits(movieId)
      .then((data) => {
        setCast(data.cast || []);
      })
      .catch(() => setCast([]));
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;
    getMovieReviews(movieId)
      .then((data) => {
        setReviews(data.results || []);
      })
      .catch(() => setReviews([]));
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;
    getSimilarMovies(movieId)
      .then((data) => {
        setSimilarMovies(data.results || []);
      })
      .catch(() => setSimilarMovies([]));
  }, [movieId]);

  if (!movie) return <div className="movie-detail">Loading...</div>;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "--";
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : undefined;
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : undefined;

  return (
    <div className="movie-detail">
      <div className="items_start">
        <div className="it_st-logo gap-6">
          <i className="fa-regular fa-moon"></i>
        </div>
        <div>
          <div className="it_st_items it_st-menu gap-6">
            <div className="it_st-menu-home item_menu_start text-size font-medium">
              <RouterLink className="flex gap-6" to="/"><i className="fa-solid fa-house"></i></RouterLink>
            </div>
            <div className="it_st-menu-explore item_menu_start text-size font-medium">
              <RouterLink className="flex gap-6" to="/explore"><i className="fa-solid fa-compass"></i></RouterLink>
            </div>
            <div className="it_st-menu-search item_menu_start text-size font-medium">
              <RouterLink className="flex gap-6" to="/search"><i className="fa-solid fa-magnifying-glass"></i></RouterLink>
            </div>
          </div>

          <div className="it_st_items it_st-personal gap-6">
            <div className="it_st-personal-bookmarked item_menu_start text-size font-medium">
              <RouterLink className="flex gap-6" to="/bookmarked"><i className="fa-solid fa-bookmark"></i></RouterLink>
            </div>
            <div className="it_st-personal-history item_menu_start text-size font-medium">
              <RouterLink className="flex gap-6" to="/history"><i className="fa-solid fa-clock"></i></RouterLink>
            </div>
          </div>

          <div className="it_st_items it_st-general gap-6">
            <div className="it_st-personal-profile item_menu_start text-size font-medium">
              <RouterLink className="flex gap-6" to="/profile"><i className="fa-solid fa-user"></i></RouterLink>
            </div>
          </div>
        </div>
        <div className="it_st-personal-login item_menu_start text-size font-medium">
          <RouterLink className="flex gap-6" to="/login"><i className="fa-solid fa-right-to-bracket"></i></RouterLink>
        </div>
      </div>

      <div className="center_web">
        <div className="cw-background-movie" style={{ backgroundImage: backdrop ? `url(${backdrop})` : "none" }}>
          <div className="cw-background-body">
            {poster && <img src={poster} alt={movie.title || movie.name || "movie"} />}
            <div className="cw-background-information">
              <div className="cw-background-title">{movie.title || movie.name}</div>
              <div className="cw-background-category">
                {movie.genres && movie.genres.slice(0, 3).map((g) => (
                  <div key={g.id} className="cw-category">{g.name.toUpperCase()}</div>
                ))}
              </div>
            </div>
            <button className="cw-watch">WATCH</button>
          </div>
          <div className="cw-action-icon">
            <button><i className="fa-solid fa-heart"></i></button>
            <button><i className="fa-solid fa-share"></i></button>
            <button><i className="fa-solid fa-bars"></i></button>
          </div>
        </div>

        <div className="cw-body">
          <div className="cw-body-left">
            <p className="cw-bl-rating text-size text-white font-medium">RATING</p>
            <div className="circular-progress">
              <span className="progress-value">{rating}</span>
            </div>
            <p className="cw-bl-length text-size text-white font-medium">EP LENGTH</p>
            <div className="ep-length-lates">{movie.runtime ? `${movie.runtime} min` : "—"}</div>
          </div>

          <div className="cw-body-center">
            <div className="cw-body-center-nav">
              <div className={`cw-body-center-nav-item nav-item1 ${tab === 'overall' ? 'active' : ''}`} onClick={() => setTab('overall')}>Overall</div>
              <div className={`cw-body-center-nav-item nav-item2 ${tab === 'cast' ? 'active' : ''}`} onClick={() => setTab('cast')}>Cast</div>
              <div className={`cw-body-center-nav-item nav-item3 ${tab === 'reviews' ? 'active' : ''}`} onClick={() => setTab('reviews')}>Reviews</div>
              <div className={`cw-body-center-nav-item nav-item4 ${tab === 'seasons' ? 'active' : ''}`} onClick={() => setTab('seasons')}>Seasons</div>
            </div>

            <div className={`cw-body-content content-overall ${tab === 'overall' ? 'content_appear' : ''}`}>
              <div className="cwb-content-title">The shady side of paradise.</div>
              <div className="cw-body-content-main">
                <div className="cw-body-content-main-seriesstory">STORY</div>
                <div className="story_content cw-body-content-main-item">{movie.overview}</div>
                <div className="cw-body-content-main-seriesstory">DETAILS</div>
                <div className="story_content cw-body-content-main-item">
                  <p>Status: {movie.status || 'Unknown'}</p>
                  <p>Last air date: {movie.last_air_date || movie.release_date || '—'}</p>
                  <p>Spoken language: {movie.original_language || '—'}</p>
                </div>
              </div>
            </div>

            <div className={`cw-body-content content-cast ${tab === 'cast' ? 'content_appear' : ''}`}>
              <div className="content-cast-items">
                {cast && cast.length > 0 ? (
                  cast.slice(0, 8).map((actor) => (
                    <div key={actor.id || actor.name} className="cast-item">
                      {actor.profile_path && (
                        <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
                      )}
                      <div className="cast-item-text">
                        <div className="cast-item-text1">{actor.name}</div>
                        <div className="cast-item-text2">as {actor.character}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No cast information available.</p>
                )}
              </div>
            </div>

            <div className={`cw-body-content content-reviews ${tab === 'reviews' ? 'content_appear' : ''}`}>
              <div className="content_soft_rating">
                <p>Sort Rating:</p>
                <select>
                  <option value="" className="sort_rating_ascending">Ascending</option>
                  <option value="" className="sort_rating_descending">Descending</option>
                </select>
              </div>
              {reviews.length > 0 ? (
                <ul className="review_list">
                  {reviews.slice(0, 8).map((review) => (
                    <li key={review.id} className="review_item">
                      {poster && <img src={poster} alt={movie.title || movie.name || "movie"} />}
                      <div className="review_item_text">
                        <div className="header_review_item">
                          <div className="review_item_name">{review.author}</div>
                          <div className="review_item_star">
                            {review.author_details?.rating ?? "--"}
                          </div>
                        </div>
                        <div className="content_review_item">{review.content}</div>
                        <div className="years_review_item">
                          {review.created_at ? new Date(review.created_at).toLocaleDateString("vi-VN") : ""}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">There is no reviews yet.</p>
              )}
            </div>

            <div className={`cw-body-content content-seasons ${tab === 'seasons' ? 'content_appear' : ''}`}>
              <div className="header_content_season">
                <p>Total season: {movie.number_of_seasons || 1}</p>
                <p>Total episodes: {movie.number_of_episodes ||  (movie.episodes ? movie.episodes.length : 10)}</p>
              </div>
              <ul className="content_season_list">
                <li className="content_season_item">
                  {poster && <img src={poster} alt={movie.title || movie.name || "movie"} />}
                  <div className="content_season_item_text">
                    <div className="content_season_item_header">
                      <div className="season_header_left">Season 1</div>
                      <div className="season_header_right">10 episodes</div>
                    </div>
                    <div className={`content_season_content ${seasonExpanded ? 'season_content_expanded' : ''}`}>
                      {movie.overview}
                    </div>
                    <button className="toggle-button" onClick={() => setSeasonExpanded((s) => !s)}>{seasonExpanded ? 'Show Less' : '...See more'}</button>
                    <div className="content_season_years">{movie.first_air_date || movie.release_date}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="cw-body-right">
            <div className="cw-body-right-title">MEDIA</div>
            <div className="cw-body-right-item">
              <div className="video-trailer">
                <iframe width="210" height="110"
                  src="https://www.youtube.com/embed/RokJ4M2UjNc"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen>
                </iframe>
              </div>
              <p>Official Trailer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right_wed">
        <div className="rw-search">
          <button className="rw-search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
          <input className="rw-search-input" type="text" placeholder="Search..." />
        </div>
        <div className="rw-similar">
          <div className="rw-similar-title">Similar</div>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div className="rw-similar-list">
          {similarMovies.length > 0 ? (
            similarMovies.slice(0, 8).map((item) => {
              const similarPoster = item.poster_path
                ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
                : poster;

              return (
                <RouterLink key={item.id} className="similar-item" to={`/movie/${item.id}`}>
                  {similarPoster && <img className="img-similar-item" src={similarPoster} alt={item.title || item.name || "similar movie"} />}
                  <div className="introduce-similar-item">
                    <div className="title-similar-item">{item.title || item.name}</div>
                    <div className="day-similar-item">{item.release_date || item.first_air_date || "—"}</div>
                    <div className="rates-similar-item">
                      {item.vote_average ? item.vote_average.toFixed(1) : "--"}
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                </RouterLink>
              );
            })
          ) : (
            <p className="text-white">There is no similar movies yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
