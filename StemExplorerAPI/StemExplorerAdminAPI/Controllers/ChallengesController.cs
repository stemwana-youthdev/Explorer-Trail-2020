using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StemExplorerData.Models;
using StemExplorerData.Models.Entities;

namespace StemExplorerAdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChallengesController : ControllerBase
    {
        private readonly StemExplorerContext _context;

        public ChallengesController(StemExplorerContext context)
        {
            _context = context;
        }

        // GET: api/Challenges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Challenge>>> GetChallenges()
        {
            return await _context.Challenges.ToListAsync();
        }

        // GET: api/Challenges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Challenge>> GetChallenge(int id)
        {
            var challenge = await _context.Challenges.FindAsync(id);

            if (challenge == null)
            {
                return NotFound();
            }

            return challenge;
        }

        // PUT: api/Challenges/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChallenge(int id, Challenge challenge)
        {
            if (id != challenge.Id)
            {
                return BadRequest();
            }

            _context.Entry(challenge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChallengeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Challenges
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Challenge>> PostChallenge(Challenge challenge)
        {
            _context.Challenges.Add(challenge);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChallenge", new { id = challenge.Id }, challenge);
        }

        // DELETE: api/Challenges/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Challenge>> DeleteChallenge(int id)
        {
            var challenge = await _context.Challenges.FindAsync(id);
            if (challenge == null)
            {
                return NotFound();
            }

            _context.Challenges.Remove(challenge);
            await _context.SaveChangesAsync();

            return challenge;
        }

        private bool ChallengeExists(int id)
        {
            return _context.Challenges.Any(e => e.Id == id);
        }
    }
}
