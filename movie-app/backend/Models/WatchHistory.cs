namespace backend.Models;

public class WatchHistory
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int MediaId { get; set; }
    public string MediaType { get; set; } = "movie"; // "movie" or "tv"
    public string Title { get; set; } = string.Empty;
    public string PosterPath { get; set; } = string.Empty;
    public DateTime WatchedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public User User { get; set; } = null!;
}
