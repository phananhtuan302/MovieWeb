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

    // GET: api/movies/top-rated
    [HttpGet("top-rated")]
    public async Task<IActionResult> GetTopRatedMovies([FromQuery] int page = 1)
    {
        var result = await _movieService.GetTopRatedMoviesAsync(page);
        return Ok(result);
    }

    // GET: api/movies/upcoming
    [HttpGet("upcoming")]
    public async Task<IActionResult> GetUpcomingMovies([FromQuery] int page = 1)
    {
        var result = await _movieService.GetUpcomingMoviesAsync(page);
        return Ok(result);
    }

    // GET: api/movies/genres
    [HttpGet("genres")]
    public async Task<IActionResult> GetGenres()
    {
        var result = await _movieService.GetGenresAsync();
        return Ok(result);
    }

    // GET: api/movies/by-genre?genreIds=28,35&page=1
    [HttpGet("by-genre")]
    public async Task<IActionResult> GetByGenre([FromQuery] string genreIds, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetMoviesByGenreAsync(genreIds, page);
        return Ok(result);
    }

    // GET: api/movies/search?query=batman&page=1
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] int page = 1)
    {
        var result = await _movieService.SearchMoviesAsync(query, page);
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

    // =========================
    // CAST + CREW
    // =========================
    [HttpGet("{id}/credits")]
    public async Task<IActionResult> GetMovieCredits(int id)
    {
        var result = await _movieService.GetMovieCreditsAsync(id);
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

    // =========================
    // SIMILAR MOVIES
    // =========================
    [HttpGet("{id}/similar")]
    public async Task<IActionResult> GetSimilarMovies(int id, [FromQuery] int page = 1)
    {
        var result = await _movieService.GetSimilarMoviesAsync(id, page);
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
}