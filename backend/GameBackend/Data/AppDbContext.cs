using GameBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace GameBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<GameSession> GameSessions { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
