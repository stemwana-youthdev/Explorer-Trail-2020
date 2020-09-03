using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Progress")]
    [ApiController]
    [Authorize]
    public class ProgressController : ControllerBase
    {
        private readonly IProgressService _progressService;
        private readonly IProfileService _profileService;

        private string userId
        {
            get
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                return identity.FindFirst("user_id").Value;
            }
        }

        public ProgressController(
            IProgressService progressService,
            IProfileService profileService
        )
        {
            _progressService = progressService;
            _profileService = profileService;
        }

        // [HttpGet("{profileId}")]
        // public async Task<List<ProgressDto>> Get(int profileId)
        // {
        //     await _profileService.AssertProfileOwnership(userId, profileId);
        //     return await _progressService.GetProgress(profileId);
        // }

        // [HttpPost("LevelCompleted")]
        // public async Task LevelCompleted(CompletedLevelDto completed)
        // {
        //     await _profileService.AssertProfileOwnership(userId, completed.ProfileId);
        //     await _progressService.LevelCompleted(completed.ProfileId, completed.LevelId, completed.Correct);
        // }
    }
}
