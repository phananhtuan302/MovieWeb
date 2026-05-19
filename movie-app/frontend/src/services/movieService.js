import axios from "axios";

const API_BASE = "http://localhost:5062/api/movies";

const normalizeMediaType = (mediaType) => (mediaType === "tv" ? "tv" : "movie");

const createMediaEndpoint = (mediaType, path) => `${API_BASE}/${normalizeMediaType(mediaType)}${path}`;

const unwrapResponseData = (data) => {
    if (typeof data !== "string") {
        return data;
    }

    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
};

// =========================
// 1. POPULAR MOVIES
// =========================
export const getPopularMovies = async(page = 1) => {
    const response = await axios.get(
        `${API_BASE}/popular?page=${page}`
    );
    return unwrapResponseData(response.data);
};

export const getPopularMedia = async(mediaType, page = 1) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/popular?page=${page}`));
    return unwrapResponseData(response.data);
};

// =========================
// 2. TOP RATED
// =========================
export const getTopRatedMovies = async(page = 1) => {
    const response = await axios.get(
        `${API_BASE}/top-rated?page=${page}`
    );
    return unwrapResponseData(response.data);
};

export const getTopRatedMedia = async(mediaType, page = 1) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/top-rated?page=${page}`));
    return unwrapResponseData(response.data);
};

// =========================
// 3. UPCOMING
// =========================
export const getUpcomingMovies = async(page = 1) => {
    const response = await axios.get(
        `${API_BASE}/upcoming?page=${page}`
    );
    return unwrapResponseData(response.data);
};

export const getUpcomingMedia = async(mediaType, page = 1) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/upcoming?page=${page}`));
    return unwrapResponseData(response.data);
};

// =========================
// 4. NOW PLAYING
// =========================
export const getNowPlayingMovies = async(page = 1) => {
    const response = await axios.get(
        `${API_BASE}/now-playing?page=${page}`
    );
    return unwrapResponseData(response.data);
};

export const getNowPlayingMedia = async(mediaType, page = 1) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/now-playing?page=${page}`));
    return unwrapResponseData(response.data);
};

// =========================
// 5. GENRES
// =========================
export const getGenres = async() => {
    const response = await axios.get(
        `${API_BASE}/genres`
    );
    return unwrapResponseData(response.data);
};

export const getGenresByMedia = async(mediaType) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/genres`));
    return unwrapResponseData(response.data);
};

// =========================
// 6. MOVIES BY GENRE
// =========================
export const getMoviesByGenre = async(genreIds, page = 1) => {
    const response = await axios.get(
        `${API_BASE}/by-genre?genreIds=${genreIds}&page=${page}`
    );
    return unwrapResponseData(response.data);
};

export const getMediaByGenre = async(mediaType, genreIds, page = 1) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/by-genre?genreIds=${genreIds}&page=${page}`));
    return unwrapResponseData(response.data);
};

// =========================
// 7. SEARCH MOVIES
// =========================
export const searchMovies = async(query, page = 1) => {
    const response = await axios.get(
        `${API_BASE}/search?query=${query}&page=${page}`
    );
    return unwrapResponseData(response.data);
};

export const searchMedia = async(mediaType, query, page = 1) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/search?query=${encodeURIComponent(query)}&page=${page}`));
    return unwrapResponseData(response.data);
};

// =========================
// 8. MOVIE DETAIL
// GET: api/movies/{id}
export const getMovieDetail = async(id) => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return unwrapResponseData(response.data);
};

export const getMediaDetail = async(mediaType, id) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/${id}`));
    return unwrapResponseData(response.data);
};

// =========================
// 9. MOVIE CAST (CREDITS)
// =========================
export const getMovieCredits = async(id) => {
    const response = await axios.get(`${API_BASE}/${id}/credits`);
    return unwrapResponseData(response.data);
};

export const getMediaCredits = async(mediaType, id) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/${id}/credits`));
    return unwrapResponseData(response.data);
};

// =========================
// 10. MOVIE REVIEWS
// =========================
export const getMovieReviews = async(id, page = 1) => {
    const response = await axios.get(`${API_BASE}/${id}/reviews?page=${page}`);
    return unwrapResponseData(response.data);
};

export const getMediaReviews = async(mediaType, id, page = 1) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/${id}/reviews?page=${page}`));
    return unwrapResponseData(response.data);
};

// =========================
// 11. SIMILAR MOVIES
// =========================
export const getSimilarMovies = async(id, page = 1) => {
    const response = await axios.get(`${API_BASE}/${id}/similar?page=${page}`);
    return unwrapResponseData(response.data);
};

export const getSimilarMedia = async(mediaType, id, page = 1) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/${id}/similar?page=${page}`));
    return unwrapResponseData(response.data);
};

// =========================
// 12. TRENDING MOVIES (WEEK)
// =========================
export const getTrendingMovies = async(page = 1) => {
    const response = await axios.get(`${API_BASE}/trending/week?page=${page}`);
    return unwrapResponseData(response.data);
};

export const getTrendingMedia = async(mediaType, page = 1) => {
    const response = await axios.get(createMediaEndpoint(mediaType, `/trending/week?page=${page}`));
    return unwrapResponseData(response.data);
};

// =========================
// 13. DISCOVER
// options: object of discover params (e.g., { with_genres: '18', sort_by: 'popularity.desc', page: 1 })
export const getDiscoverMedia = async(mediaType, options = {}) => {
        const params = new URLSearchParams();
        Object.entries(options || {}).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") params.append(k, v);
        });
        const qs = params.toString();
        const url = createMediaEndpoint(mediaType, `/discover${qs ? `?${qs}` : ""}`);
    const response = await axios.get(url);
    return unwrapResponseData(response.data);
};