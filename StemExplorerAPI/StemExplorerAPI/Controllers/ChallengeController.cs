using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StemExplorerData.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Challenges")]
    [ApiController]
    public class ChallengeController : ControllerBase
    {
        private readonly IChallengeService _challengeService;
        private readonly ILogger _logger;

        public ChallengeController(ILogger<LocationController> logger, IChallengeService challengeService)
        {
            _logger = logger;
            _challengeService = challengeService;
        }

        // GET: api/Challenge
        [HttpGet]
        public async Task<IActionResult> Get(int? profileId)
        {
            try
            {
                return Ok(await _challengeService.GetChallenges(profileId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // GET: api/Challenge/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChallenge(int id, int? profileId)
        {
            try
            {
                var challenge = await _challengeService.GetChallengeById(id, profileId);

                if (challenge == null)
                {
                    return NotFound();
                }

                return Ok(challenge);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
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
