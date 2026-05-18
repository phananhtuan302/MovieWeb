using System.Net.Http.Headers;

namespace backend.Services;

public class MovieService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

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
    }