using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StemExplorerService.Services.Interfaces;
using StemExplorerData.Models;
using StemExplorerData.Models.Entities;
using StemExplorerData.Models.ViewModels;

namespace StemExplorerAdminAPI.Controllers
{
    [Route("api/Admin/Challenges")]
    [ApiController]
    public class ChallengesController : ControllerBase
    {
        private readonly IChallengeService _challengeService;

        public ChallengesController(IChallengeService challengeService)
        {
            _challengeService = challengeService;
        }

        // GET: api/Challenges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChallengeDto>>> GetChallenges()
        {
            try
            {
                return Ok(await _challengeService.GetChallenges(null));
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        //// GET: api/Challenges/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Challenge>> GetChallenge(int id)
        //{
        //    var challenge = await _context.Challenges.FindAsync(id);

        //    if (challenge == null)
        //    {
        //        return NotFound();
        //    }

        //    return challenge;
        //}

        //// PUT: api/Challenges/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutChallenge(int id, Challenge challenge)
        //{
        //    if (id != challenge.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(challenge).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ChallengeExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Challenges
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<Challenge>> PostChallenge(Challenge challenge)
        //{
        //    _context.Challenges.Add(challenge);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetChallenge", new { id = challenge.Id }, challenge);
        //}

        //// DELETE: api/Challenges/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Challenge>> DeleteChallenge(int id)
        //{
        //    var challenge = await _context.Challenges.FindAsync(id);
        //    if (challenge == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Challenges.Remove(challenge);
        //    await _context.SaveChangesAsync();

        //    return challenge;
        //}

        //private bool ChallengeExists(int id)
        //{
        //    return _context.Challenges.Any(e => e.Id == id);
        //}
    }
}
