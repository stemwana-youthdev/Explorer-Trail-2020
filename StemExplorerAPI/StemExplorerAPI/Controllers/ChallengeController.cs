using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Challenge")]
    [ApiController]
    public class ChallengeController : ControllerBase
    {
        private readonly IChallengeService _challengeService;

        public ChallengeController(IChallengeService challengeService)
        {
            _challengeService = challengeService;
        }

        // GET: api/GetChallenges
        [HttpGet("GetChallenges")]
        public async Task<ChallengesDto> GetAllChallenges()
        {
            return await _challengeService.GetChallenges();
        }

        // GET: api/Challenge/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(int id)
        {
            var challenge = await _challengeService.GetChallengeById(id);

            if (challenge == null)
            {
                return NotFound();
            }

            return Ok(challenge);
        }

        // POST: api/Challenge
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Challenge/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
