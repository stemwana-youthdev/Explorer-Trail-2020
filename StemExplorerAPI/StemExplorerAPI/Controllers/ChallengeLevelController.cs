using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private readonly IProfileService _profileService;

        public ChallengeLevelController(IChallengeLevelService challengeLevelService, IProfileService profileService)
        {
            _challengeLevelService = challengeLevelService;
            _profileService = profileService;
        }

        private string userId
        {
            get
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                return identity.FindFirst("user_id").Value;
            }
        }

        [HttpGet]
        public async Task<List<ChallengeLevelDto>> Get(int? challengeId, int? profileId)
        {
            if (profileId is int uid)
            {
                await _profileService.AssertProfileOwnership(userId, uid);
            }

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
