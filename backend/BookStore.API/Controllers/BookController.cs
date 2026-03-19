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
        public IActionResult Get(int pageSize = 5, int pageNum = 1, bool sortByTitle = false) 
        {
            var query = _bookContext.Books.AsQueryable();

            if (sortByTitle)
            {
                query = query.OrderBy(b => b.Title);
            }

            var something = query
            .Skip((pageNum -1) * pageSize)
            .Take(pageSize)
            .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            return Ok(new 
            { 
                Books = something, 
                TotalNumBooks = totalNumBooks 
            });
        }

        [HttpGet("U500")]
        public IEnumerable<Book> GetPageCount()
        {
            var something = _bookContext.Books.Where( p => p.PageCount <= 500).ToList();
            return something;
        }
    }
}
