using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
    }
}
