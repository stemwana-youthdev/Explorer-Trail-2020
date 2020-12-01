using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models.ViewModels;
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
        [HttpGet("{id}", Name="GetChallengeById")]
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
        public async Task<IActionResult> AddChallenge([FromBody] ChallengeDto challenge)
        {
            try
            {
                var challengeId = await _challengeService.AddChallenge(challenge);
                challenge.Id = challengeId;
                return CreatedAtRoute("GetChallengeById", new { id = challengeId }, challenge);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // PUT: api/Challenge/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] ChallengeDto challengeDto)
        {
            try
            {
                var challenge = await _challengeService.GetChallengeById(challengeDto.Id, null);
                if (challengeDto == null)
                {
                    return NotFound();
                }
                return Ok(await _challengeService.EditChallenge(challengeDto));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

        }

        // PUT: api/Challenge/add-location
        [HttpPut("add-location")]
        public async Task<IActionResult> AddLocationToChallenge(int challengeId, int locationId)
        {
            try
            {
                return Ok(await _challengeService.AddLocationToChallenge(challengeId, locationId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _challengeService.DeleteChallenge(id);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
