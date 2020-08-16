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
    [Route("api/ChallengeLevel")]
    [ApiController]
    public class ChallengeLevelController : ControllerBase
    {
        private readonly IChallengeLevelService _challengeLevelService;

        public ChallengeLevelController(IChallengeLevelService challengeLevelService)
        {
            _challengeLevelService = challengeLevelService;
        }

        [HttpGet("GetLevels")]
        public async Task<List<ChallengeLevelDto>> GetLevels()
        {
            return await _challengeLevelService.GetLevels();
        }

        [HttpGet("GetLevelsForChallenge/{challengeId}")]
        public async Task<List<ChallengeLevelDto>> GetLevelsForChallenge(int challengeId)
        {
            return await _challengeLevelService.GetLevelsForChallenge(challengeId);
        }

        [HttpPost("ValidateAnswer/{levelId}")]
        public async Task<bool> ValidateAnswer(int levelId, [FromBody] string givenAnswer)
        {
            return await _challengeLevelService.ValidateAnswer(levelId, givenAnswer);
        }
    }
}
