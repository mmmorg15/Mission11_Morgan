using BookStore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }
        [HttpGet("AllBooks")]
        public IActionResult Get(int pageSize = 5, int pageNum = 1, bool sortByTitle = false, [FromQuery] List<string> bookCategory = null)
        {

            var query = _bookContext.Books.AsQueryable();

            if (bookCategory != null && bookCategory.Any())
            {
                query = query.Where(p => bookCategory.Contains(p.Category));
            }

            if (sortByTitle)
                {
                    query = query.OrderBy(p => p.Title);
                }

            var totalNumBooks = query.Count();

            var something = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

            

            return Ok(new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            });
        }

        [HttpGet("U500")]
        public IEnumerable<Book> GetPageCount()
        {
            var something = _bookContext.Books.Where(p => p.PageCount <= 500).ToList();
            return something;
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookCategories);
        }
    }
}
