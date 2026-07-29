using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameBackend.Models
{
    public class GameSession
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        
        public string PlayerId { get; set; } = string.Empty;
        
        public decimal BetAmount { get; set; }
        
        public decimal CurrentWin { get; set; }
        
        public int ActiveRow { get; set; } = 0;
        
        // Serialized 10x5 grid: "apple" or "core"
        [Column(TypeName = "jsonb")]
        public string GridData { get; set; } = "[]"; 

        public bool IsFinished { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
