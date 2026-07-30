using System.ComponentModel.DataAnnotations;

namespace GameBackend.Models
{
    public class User
    {
        [Key]
        [StringLength(10, MinimumLength = 10)]
        public string AccountId { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public decimal Balance { get; set; } = 0.0m;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
