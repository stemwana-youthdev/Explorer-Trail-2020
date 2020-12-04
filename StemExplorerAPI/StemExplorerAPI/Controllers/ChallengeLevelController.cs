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
    [Route("api/ChallengeLevels")]
    [ApiController]
    public class ChallengeLevelController : ControllerBase
    {
        private readonly IChallengeLevelService _challengeLevelService;
        private readonly ILogger _logger;

        public ChallengeLevelController(ILogger<LocationController> logger, IChallengeLevelService challengeLevelService)
        {
            _logger = logger;
            _challengeLevelService = challengeLevelService;
        }

        [HttpGet]
        public async Task<List<ChallengeLevelDto>> Get(int? challengeId, int? profileId)
        {
            if (challengeId is int id)
            {
                return await _challengeLevelService.GetLevelsForChallenge(id, profileId);
            }
            else
            {
                return await _challengeLevelService.GetLevels(profileId);
            }
        }

        [HttpGet("{id}", Name="GetLevelById")]
        public async Task<IActionResult> GetLevel(int id)
        {
            try
            {
                var level = await _challengeLevelService.GetLevelById(id);

                if (level == null)
                {
                    return NotFound();
                }

                return Ok(level);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPost("{id}/ValidateAnswer")]
        public async Task<bool> ValidateAnswer(int id, [FromBody] string givenAnswer)
        {
            return await _challengeLevelService.ValidateAnswer(id, givenAnswer);
        }
    }
}
