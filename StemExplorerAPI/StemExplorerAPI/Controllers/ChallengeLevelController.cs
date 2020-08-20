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
        public async Task<List<ChallengeLevelDto>> Get(int? challengeId)
        {
            if (challengeId is int id)
            {
                return await _challengeLevelService.GetLevelsForChallenge(id);
            }
            else
            {
                return await _challengeLevelService.GetLevels();
            }
        }

        [HttpPost("ValidateAnswer")]
        public async Task<bool> ValidateAnswer(int levelId, [FromBody] string givenAnswer)
        {
            return await _challengeLevelService.ValidateAnswer(levelId, givenAnswer);
        }
    }
}
