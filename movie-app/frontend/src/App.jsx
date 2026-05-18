import { useEffect, useState } from "react";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getNowPlayingMovies, getGenres, getTrendingMovies } from "./services/movieService";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  const [selectedType, setSelectedType] = useState("tv");

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getPopularMovies(1).then((data) => {
      setMovies(data.results);
    });
  }, []);

  const [topRateds, setTopRateds] = useState([]);
  useEffect(() => {
    getTopRatedMovies(1).then((data) => {
      setTopRateds(data.results);
    });
  }, []);

    const [upcomingMovies, setUpcomingMovies] = useState([]);
  useEffect(() => {
    getUpcomingMovies(1).then((data) => {
      setUpcomingMovies(data.results);
    });
  }, []);

    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  useEffect(() => {
    getNowPlayingMovies(1).then((data) => {
      setNowPlayingMovies(data.results);
    });
  }, []);

    const [genres, setGenres] = useState([]);
  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data);
    });
  }, []);

      const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    getTrendingMovies(1).then((data) => {
      setTrendingMovies(data.results);
    });
  }, []);

  const genreList = (() => {
    if (Array.isArray(genres)) {
      return genres;
    }

    if (typeof genres === "string") {
      try {
        const parsedGenres = JSON.parse(genres);
        return parsedGenres.genres ?? parsedGenres ?? [];
      } catch {
        return [];
      }
    }

    return genres?.genres ?? [];
  })();

  const genreNameMap = Object.fromEntries(
    genreList.map((genre) => [genre.id, genre.name])
  );

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
                      <img src="~/Content/img/avt.jpg" />
                      <p>Anonymous</p>
                  </div>
              </div>
        <div className="body_left-movies-load">
          <Swiper
            className="swiper mySwiper"
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            modules={[Navigation, Autoplay, Pagination]}
          >
            {trendingMovies.map((movie) => (
              <SwiperSlide className="swiper-slide" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path || ""}`}
                  alt={movie.title} className="swiper-slide-image_banner"
                />

                <div className="swiper-slide_work text-white">
                  <div className="ssw-title text-primary">
                    {movie.title}
                  </div>

                  <div className="ssw-firm_name">
                    {movie.original_title}
                  </div>

                  <div className="ssw-firsdt_day">
                    First air date: {movie.release_date}
                  </div>

                  <div className="ssw-category gap-6">
                    {(movie.genre_ids || []).map((genreId) => (
                      <div key={genreId}>{genreNameMap[genreId] || genreId}</div>
                    ))}
                  </div>

                  <div className="ssw-describe">
                    {movie.overview || "No description available."}
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </Swiper>
        </div>
        
        <div className="body_left-top_rated">
          <div className="bl-category-title text-white font-medium">
            Popular
          </div>

          <div className="bl-category-list">

            {/* GIỮ CLASS SWIPER CŨ */}
          <Swiper
          className="swiper1 mySwiper1 swiper-initialized swiper-horizontal swiper-pointer-events"
          slidesPerView={5}
          spaceBetween={10}
          loop={true}
          loopedSlides={10}
          loopAdditionalSlides={10}
          watchSlidesProgress={true}
          observer={true}
          observeParents={true}
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
              {/* GIỮ WRAPPER CLASS */}
              <div className="swiper-wrapper text-white">

                {movies.map((movie) => (
                  <SwiperSlide key={movie.id} className="swiper-slide">
                    <Link to={`/movie/${movie.id}`} className="swiper-slide-link">
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                      <div className="swiper-slide-title">{movie.title}</div>
                    </Link>
                  </SwiperSlide>
                ))}

              </div>

              {/* pagination nếu cần */}
              <div className="swiper-pagination"></div>

            </Swiper>

          </div>
        </div>

        <div className="body_left-top_rated">
          <div className="bl-category-title text-white font-medium">
            Top Rated
          </div>

          <div className="bl-category-list">

            {/* GIỮ CLASS SWIPER CŨ */}
          <Swiper
          className="swiper1 mySwiper1 swiper-initialized swiper-horizontal swiper-pointer-events"
          slidesPerView={5}
          spaceBetween={10}
          loop={true}
          loopedSlides={10}
          loopAdditionalSlides={10}
          watchSlidesProgress={true}
          observer={true}
          observeParents={true}
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
              {/* GIỮ WRAPPER CLASS */}
              <div className="swiper-wrapper text-white">

                {topRateds.map((movie) => (
                  <SwiperSlide key={movie.id} className="swiper-slide">
                    <Link to={`/movie/${movie.id}`} className="swiper-slide-link">
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                      <div className="swiper-slide-title">{movie.title}</div>
                    </Link>
                  </SwiperSlide>
                ))}

              </div>

              {/* pagination nếu cần */}
              <div className="swiper-pagination"></div>

            </Swiper>

          </div>
        </div>

        <div className="body_left-top_rated">
          <div className="bl-category-title text-white font-medium">
            Popular
          </div>

          <div className="bl-category-list">

            {/* GIỮ CLASS SWIPER CŨ */}
          <Swiper
          className="swiper1 mySwiper1 swiper-initialized swiper-horizontal swiper-pointer-events"
          slidesPerView={5}
          spaceBetween={10}
          loop={true}
          loopedSlides={10}
          loopAdditionalSlides={10}
          watchSlidesProgress={true}
          observer={true}
          observeParents={true}
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
              {/* GIỮ WRAPPER CLASS */}
              <div className="swiper-wrapper text-white">

                {upcomingMovies.map((movie) => (
                  <SwiperSlide key={movie.id} className="swiper-slide">
                    <Link to={`/movie/${movie.id}`} className="swiper-slide-link">
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                      <div className="swiper-slide-title">{movie.title}</div>
                    </Link>
                  </SwiperSlide>
                ))}

              </div>

              {/* pagination nếu cần */}
              <div className="swiper-pagination"></div>

            </Swiper>

          </div>
        </div>

        </div>
        <div className="right_wed">
    <div className="rw-search">
        <button className="rw-search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
        <input className="rw-search-input" type="text" placeholder="Search..." />
    </div>
    <div className="rw-search-sugestions">
        <a href="">Drama</a>
        <a href="">Comedy</a>
        <a href="">Talk</a>
        <a href="">Walk & Politics</a>
        <a href="">Family</a>
        <a href="">Kids</a>
        <a href="">Documentary</a>
    </div>
    <div className="rw-trending">
        <div className="rw-trending-title">Trending</div>
        <i className="fa-solid fa-ellipsis-vertical"></i>
    </div>
    <div className="rw-trending-list">
        <div className="trending-item">
            <img className="img-trending-item" src="~/Content/img/trending1.jpg" />
            <div className="introduce-trending-item">
                <div className="title-trending-item">Bad Monkey</div>
                <div className="day-trending-item">2024-08-13</div>
                <div className="rates-trending-item">7.4<i className="fa-solid fa-star"></i></div>
            </div>
        </div>
    </div>
    <div className="rw-trending-list">
        <div className="trending-item">
            <img className="img-trending-item" src="~/Content/img/trending1.jpg" />
            <div className="introduce-trending-item">
                <div className="title-trending-item">Bad Monkey</div>
                <div className="day-trending-item">2024-08-13</div>
                <div className="rates-trending-item">7.4<i className="fa-solid fa-star"></i></div>
            </div>
        </div>
    </div>
    <div className="more-trending-list">
        <button className="more-trending-list-button">See more</button>
    </div>
        </div>
</div>

  );
}

export default App;

