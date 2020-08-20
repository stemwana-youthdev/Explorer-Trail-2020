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
    [Route("api/ChallengeLevels")]
    [ApiController]
    public class ChallengeLevelController : ControllerBase
    {
        private readonly IChallengeLevelService _challengeLevelService;

        public ChallengeLevelController(IChallengeLevelService challengeLevelService)
        {
            _challengeLevelService = challengeLevelService;
        }

        [HttpGet]
        public async Task<List<ChallengeLevelDto>> Get()
        {
            return await _challengeLevelService.GetLevels();
        }

        [HttpGet("ForChallenge/{challengeId}")]
        public async Task<List<ChallengeLevelDto>> GetForChallenge(int challengeId)
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
