using BookStore.API.Data;
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
        public IActionResult Get(int pageSize = 5, int pageNum = 1, bool sortByTitle = false, [FromQuery] List<string>? bookCategory = null)
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

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;


            _bookContext.Update(existingBook);
            _bookContext.SaveChanges();
            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);
            if (book == null)
            {
                return NotFound();
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            return NoContent();
        }
    }
}



//     public class Book
//     {
//         [Key]
//         public int BookID { get; set; }
//         [Required]
//         public string Title { get; set; }
//         [Required]
//         public string Author { get; set; }
//         [Required]
//         public string Publisher { get; set; }
//         [Required]
//         public string ISBN { get; set; }
//         [Required]
//         public string Classification { get; set; }
//         [Required]
//         public string Category { get; set; }
//         [Required]
//         public int PageCount { get; set; }
//         [Required]
//         public double Price { get; set; }
//     }
// }
