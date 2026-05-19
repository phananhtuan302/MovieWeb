using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly MovieService _movieService;

    public MoviesController(MovieService movieService)
    {
        _movieService = movieService;
    }

    // GET: api/movies/popular?page=1
    [HttpGet("popular")]
    public async Task<IActionResult> GetPopularMovies([FromQuery] int page = 1)
    {
        var result = await _movieService.GetPopularMoviesAsync(page);
        return Ok(result);
    }

    [HttpGet("{mediaType}/popular")]
    public async Task<IActionResult> GetPopularMedia(string mediaType, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetPopularMediaAsync(mediaType, page);
        return Ok(result);
    }

    // GET: api/movies/top-rated
    [HttpGet("top-rated")]
    public async Task<IActionResult> GetTopRatedMovies([FromQuery] int page = 1)
    {
        var result = await _movieService.GetTopRatedMoviesAsync(page);
        return Ok(result);
    }

    [HttpGet("{mediaType}/top-rated")]
    public async Task<IActionResult> GetTopRatedMedia(string mediaType, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetTopRatedMediaAsync(mediaType, page);
        return Ok(result);
    }

    // GET: api/movies/upcoming
    [HttpGet("upcoming")]
    public async Task<IActionResult> GetUpcomingMovies([FromQuery] int page = 1)
    {
        var result = await _movieService.GetUpcomingMoviesAsync(page);
        return Ok(result);
    }

    [HttpGet("{mediaType}/upcoming")]
    public async Task<IActionResult> GetUpcomingMedia(string mediaType, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetUpcomingMediaAsync(mediaType, page);
        return Ok(result);
    }

    [HttpGet("{mediaType}/now-playing")]
    public async Task<IActionResult> GetNowPlayingMedia(string mediaType, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetNowPlayingMediaAsync(mediaType, page);
        return Ok(result);
    }

    // GET: api/movies/genres
    [HttpGet("genres")]
    public async Task<IActionResult> GetGenres()
    {
        var result = await _movieService.GetGenresAsync();
        return Ok(result);
    }

    [HttpGet("{mediaType}/genres")]
    public async Task<IActionResult> GetMediaGenres(string mediaType)
    {
        var result = await _movieService.GetGenresAsync(mediaType);
        return Ok(result);
    }

    // GET: api/movies/by-genre?genreIds=28,35&page=1
    [HttpGet("by-genre")]
    public async Task<IActionResult> GetByGenre([FromQuery] string genreIds, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetMoviesByGenreAsync(genreIds, page);
        return Ok(result);
    }

    [HttpGet("{mediaType}/by-genre")]
    public async Task<IActionResult> GetMediaByGenre(string mediaType, [FromQuery] string genreIds, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetMediaByGenreAsync(genreIds, mediaType, page);
        return Ok(result);
    }

    // GET: api/movies/search?query=batman&page=1
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] int page = 1)
    {
        var result = await _movieService.SearchMoviesAsync(query, page);
        return Ok(result);
    }

    [HttpGet("{mediaType}/search")]
    public async Task<IActionResult> SearchMedia(string mediaType, [FromQuery] string query, [FromQuery] int page = 1)
    {
        var result = await _movieService.SearchMediaAsync(query, mediaType, page);
        return Ok(result);
    }

    // =========================
    // 8. MOVIE DETAIL
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMovieDetail(int id)
    {
        var result = await _movieService.GetMovieDetailAsync(id);
        return Ok(result);
    }

    [HttpGet("{mediaType}/{id}")]
    public async Task<IActionResult> GetMediaDetail(string mediaType, int id)
    {
        var result = await _movieService.GetMediaDetailAsync(id, mediaType);
        return Ok(result);
    }

    // =========================
    // CAST + CREW
    // =========================
    [HttpGet("{id}/credits")]
    public async Task<IActionResult> GetMovieCredits(int id)
    {
        var result = await _movieService.GetMovieCreditsAsync(id);
        return Ok(result);
    }

    [HttpGet("{mediaType}/{id}/credits")]
    public async Task<IActionResult> GetMediaCredits(string mediaType, int id)
    {
        var result = await _movieService.GetMediaCreditsAsync(id, mediaType);
        return Ok(result);
    }

    // =========================
    // MOVIE REVIEWS
    // =========================
    [HttpGet("{id}/reviews")]
    public async Task<IActionResult> GetMovieReviews(int id, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetMovieReviewsAsync(id, page);
        return Ok(result);
    }

    [HttpGet("{mediaType}/{id}/reviews")]
    public async Task<IActionResult> GetMediaReviews(string mediaType, int id, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetMediaReviewsAsync(id, mediaType, page);
        return Ok(result);
    }

    // =========================
    // SIMILAR MOVIES
    // =========================
    [HttpGet("{id}/similar")]
    public async Task<IActionResult> GetSimilarMovies(int id, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetSimilarMoviesAsync(id, page);
        return Ok(result);
    }

    [HttpGet("{mediaType}/{id}/similar")]
    public async Task<IActionResult> GetSimilarMedia(string mediaType, int id, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetSimilarMediaAsync(id, mediaType, page);
        return Ok(result);
    }

    // =========================
    // TRENDING MOVIES (WEEK)
    // =========================
    [HttpGet("trending/week")]
    public async Task<IActionResult> GetTrendingMovies([FromQuery] int page = 1)
    {
        var result = await _movieService.GetTrendingMoviesAsync(page);
        return Ok(result);
    }

    [HttpGet("{mediaType}/trending/week")]
    public async Task<IActionResult> GetTrendingMedia(string mediaType, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetTrendingMediaAsync(mediaType, page);
        return Ok(result);
    }

    // GET: api/movies/{mediaType}/discover?... (forwards discover params)
    [HttpGet("{mediaType}/discover")]
    public async Task<IActionResult> DiscoverMedia(string mediaType)
    {
        var qs = HttpContext.Request.QueryString.HasValue ? HttpContext.Request.QueryString.Value : string.Empty;
        var result = await _movieService.DiscoverMediaAsync(mediaType, qs);
        return Ok(result);
    }
}