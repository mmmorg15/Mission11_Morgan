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
        public IEnumerable<Book> Get() 
        {
            var something = _bookContext.Books.ToList();
            return something;
        }

        [HttpGet("U500")]
        public IEnumerable<Book> GetPageCount()
        {
            var something = _bookContext.Books.Where( p => p.PageCount <= 500).ToList();
            return something;
        }
    }
}
