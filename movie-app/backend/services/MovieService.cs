using System.Net.Http.Headers;

namespace backend.Services;

public class MovieService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    private static string NormalizeMediaType(string mediaType)
    {
        return string.Equals(mediaType, "tv", StringComparison.OrdinalIgnoreCase) ? "tv" : "movie";
    }

    public MovieService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    // =========================
    // SET AUTH HEADER (reuse)
    // =========================
    private void SetAuthHeader()
    {
        var token = _configuration["TMDb:BearerToken"];

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);

        _httpClient.DefaultRequestHeaders.Accept.Clear();
        _httpClient.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
    }

    // =========================
    // 1. POPULAR MOVIES
    // =========================
    public async Task<string> GetPopularMoviesAsync(int page = 1)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/movie/popular?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetPopularMediaAsync(string mediaType, int page = 1)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/{type}/popular?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 2. TOP RATED MOVIES
    // =========================
    public async Task<string> GetTopRatedMoviesAsync(int page = 1)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/movie/top_rated?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetTopRatedMediaAsync(string mediaType, int page = 1)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/{type}/top_rated?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 3. UPCOMING MOVIES
    // =========================
    public async Task<string> GetUpcomingMoviesAsync(int page = 1)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/movie/upcoming?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetUpcomingMediaAsync(string mediaType, int page = 1)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var endpoint = type == "tv" ? "airing_today" : "upcoming";
        var url = $"https://api.themoviedb.org/3/{type}/{endpoint}?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 4. NOW PLAYING
    // =========================
    public async Task<string> GetNowPlayingMoviesAsync(int page = 1)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/movie/now_playing?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetNowPlayingMediaAsync(string mediaType, int page = 1)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var endpoint = type == "tv" ? "on_the_air" : "now_playing";
        var url = $"https://api.themoviedb.org/3/{type}/{endpoint}?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 5. GET ALL GENRES
    // =========================
    public async Task<string> GetGenresAsync()
    {
        SetAuthHeader();

        var url =
            "https://api.themoviedb.org/3/genre/movie/list?language=vi-VN";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetGenresAsync(string mediaType)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/genre/{type}/list?language=vi-VN";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 6. MOVIES BY GENRE
    // =========================
    public async Task<string> GetMoviesByGenreAsync(string genreIds, int page = 1)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/discover/movie" +
            $"?with_genres={genreIds}&language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetMediaByGenreAsync(string genreIds, string mediaType, int page = 1)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/discover/{type}?with_genres={genreIds}&language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 7. SEARCH MOVIE
    // =========================
    public async Task<string> SearchMoviesAsync(string keyword, int page = 1)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/search/movie" +
            $"?query={Uri.EscapeDataString(keyword)}&language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> SearchMediaAsync(string keyword, string mediaType, int page = 1)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/search/{type}?query={Uri.EscapeDataString(keyword)}&language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 8. MOVIE DETAIL
    // =========================
    public async Task<string> GetMovieDetailAsync(int movieId)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/movie/{movieId}?language=vi-VN";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetMediaDetailAsync(int id, string mediaType)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/{type}/{id}?language=vi-VN";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }


    // =========================
    // 9. MOVIE CREDITS (CAST + CREW)
    // =========================
    public async Task<string> GetMovieCreditsAsync(int id)
    {
        SetAuthHeader();

        var url = $"https://api.themoviedb.org/3/movie/{id}/credits";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetMediaCreditsAsync(int id, string mediaType)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/{type}/{id}/credits";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 10. MOVIE REVIEWS
    // =========================
    public async Task<string> GetMovieReviewsAsync(int id, int page = 1)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/movie/{id}/reviews?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetMediaReviewsAsync(int id, string mediaType, int page = 1)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/{type}/{id}/reviews?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 11. SIMILAR MOVIES
    // =========================
    public async Task<string> GetSimilarMoviesAsync(int id, int page = 1)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/movie/{id}/similar?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetSimilarMediaAsync(int id, string mediaType, int page = 1)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/{type}/{id}/similar?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 12. TRENDING MOVIES (WEEK)
    // =========================
    public async Task<string> GetTrendingMoviesAsync(int page = 1)
    {
        SetAuthHeader();

        var url =
            $"https://api.themoviedb.org/3/trending/movie/week?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetTrendingMediaAsync(string mediaType, int page = 1)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);
        var url = $"https://api.themoviedb.org/3/trending/{type}/week?language=vi-VN&page={page}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    // =========================
    // 13. DISCOVER (GENERAL)
    // Accepts arbitrary discover query parameters forwarded from client
    // Example: /api/movies/tv/discover?with_genres=18&sort_by=popularity.desc&page=1
    // =========================
    public async Task<string> DiscoverMediaAsync(string mediaType, string queryString)
    {
        SetAuthHeader();

        var type = NormalizeMediaType(mediaType);

        // queryString includes leading '?' when forwarded from HttpContext.Request.QueryString
        var qs = string.IsNullOrWhiteSpace(queryString) ? string.Empty : queryString.TrimStart('?');

        var url = $"https://api.themoviedb.org/3/discover/{type}?language=vi-VN" + (string.IsNullOrEmpty(qs) ? string.Empty : "&" + qs);

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}