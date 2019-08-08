using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cachetest_backend.Models;

namespace cachetest_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountObjectController : ControllerBase
    {
        private readonly dbContext _context;

        public AccountObjectController(dbContext context)
        {
            _context = context;

            if (_context.AccountObjects.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.AccountObjects.Add(new AccountObjectModel { account_object_name = "account_object_1" });
                _context.SaveChanges();
            }
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountObjectModel>>> GetAll()
        {
            return await _context.AccountObjects.ToListAsync();
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountObjectModel>> GetById(long id)
        {
            var accountObject = await _context.AccountObjects.FindAsync(id);

            if (accountObject == null)
            {
                return NotFound();
            }

            return accountObject;
        }
    }
}