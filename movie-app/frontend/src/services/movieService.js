import axios from "axios";

const API_BASE = "http://localhost:5062/api/movies";

// =========================
// 1. POPULAR MOVIES
// =========================
export const getPopularMovies = async(page = 1) => {
    const response = await axios.get(
        `${API_BASE}/popular?page=${page}`
    );
    return response.data;
};

// =========================
// 2. TOP RATED
// =========================
export const getTopRatedMovies = async(page = 1) => {
    const response = await axios.get(
        `${API_BASE}/top-rated?page=${page}`
    );
    return response.data;
};

// =========================
// 3. UPCOMING
// =========================
export const getUpcomingMovies = async(page = 1) => {
    const response = await axios.get(
        `${API_BASE}/upcoming?page=${page}`
    );
    return response.data;
};

// =========================
// 4. NOW PLAYING
// =========================
export const getNowPlayingMovies = async(page = 1) => {
    const response = await axios.get(
        `${API_BASE}/now-playing?page=${page}`
    );
    return response.data;
};

// =========================
// 5. GENRES
// =========================
export const getGenres = async() => {
    const response = await axios.get(
        `${API_BASE}/genres`
    );
    return response.data;
};

// =========================
// 6. MOVIES BY GENRE
// =========================
export const getMoviesByGenre = async(genreIds, page = 1) => {
    const response = await axios.get(
        `${API_BASE}/by-genre?genreIds=${genreIds}&page=${page}`
    );
    return response.data;
};

// =========================
// 7. SEARCH MOVIES
// =========================
export const searchMovies = async(query, page = 1) => {
    const response = await axios.get(
        `${API_BASE}/search?query=${query}&page=${page}`
    );
    return response.data;
};

// =========================
// 8. MOVIE DETAIL
// GET: api/movies/{id}
export const getMovieDetail = async(id) => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
};

// =========================
// 9. MOVIE CAST (CREDITS)
// =========================
export const getMovieCredits = async(id) => {
    const response = await axios.get(`${API_BASE}/${id}/credits`);
    return response.data;
};

// =========================
// 10. MOVIE REVIEWS
// =========================
export const getMovieReviews = async(id, page = 1) => {
    const response = await axios.get(`${API_BASE}/${id}/reviews?page=${page}`);
    return response.data;
};

// =========================
// 11. SIMILAR MOVIES
// =========================
export const getSimilarMovies = async(id, page = 1) => {
    const response = await axios.get(`${API_BASE}/${id}/similar?page=${page}`);
    return response.data;
};

// =========================
// 12. TRENDING MOVIES (WEEK)
// =========================
export const getTrendingMovies = async(page = 1) => {
    const response = await axios.get(`${API_BASE}/trending/week?page=${page}`);
    return response.data;
};