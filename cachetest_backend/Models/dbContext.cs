using Microsoft.EntityFrameworkCore;
namespace cachetest_backend.Models
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options)
        {

        }
        public DbSet<AccountObjectModel> AccountObjects { get; set; }
    }
}