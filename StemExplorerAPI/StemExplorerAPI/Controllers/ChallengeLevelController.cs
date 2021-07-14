using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StemExplorerData.Models.ViewModels;
using StemExplorerService.Services.Interfaces;

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

        [HttpPost("{id}/ValidateAnswer")]
        public async Task<bool> ValidateAnswer(int id, [FromBody] string givenAnswer)
        {
            return await _challengeLevelService.ValidateAnswer(id, givenAnswer);
        }
    }
}
