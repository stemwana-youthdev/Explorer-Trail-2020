using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Models.ViewModels.Requests;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Challenge")]
    [ApiController]
    public class ChallengeController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IChallengeService _challengeService;

        public ChallengeController(ILogger<ChallengeController> logger,IChallengeService challengeService)
        {
            _logger = logger;
            _challengeService = challengeService;
        }

        // GET: api/GetChallenges
        [HttpGet("GetChallenges")]
        public async Task<List<ChallengeDto>> GetAllChallenges()
        {
            return await _challengeService.GetChallenges();
        }

        // GET: api/Challenge/5
        [HttpGet("{id}", Name = "GetChallengeById")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var location = await _challengeService.GetChallengeById(id);

                if (location == null)
                {
                    return NotFound();
                }

                return Ok(location);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // POST: api/Challenge/AddChallenge
        [HttpPost("AddChallenge")]
        public async Task<IActionResult> AddLocationAsync([FromBody] ChallengeRequestDto challengeDto)
        {
            try
            {
                var challengeId = await _challengeService.AddChallenge(challengeDto);
                return CreatedAtRoute("GetChallengeById", new { id = challengeId }, challengeDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        //// PUT: api/Challenge/UpdateChallenge
        [HttpPut("UpdateChallenge")]
        public async Task<IActionResult> Put([FromBody] ChallengeDto challengeDto)
        {
            try
            {
                var challenge = await _challengeService.GetChallengeById(challengeDto.Id);

                if (challenge == null)
                {
                    return NotFound();
                }

                await _challengeService.EditChallenge(challengeDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // DELETE: api/Location/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var challenge = await _challengeService.GetChallengeById(id);

                if (challenge == null)
                {
                    return NotFound();
                }

                await _challengeService.DeleteChallenge(challenge);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
