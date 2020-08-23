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

        private string userId
        {
            get
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                return identity.FindFirst("user_id").Value;
            }
        }

        public ProgressController(IProgressService progressService)
        {
            _progressService = progressService;
        }

        [HttpGet("{challengeId}")]
        public async Task<ProgressDto> GetProgressForChallenge(int challengeId)
        {
            return await _progressService.GetProgressForChallenge(userId, challengeId);
        }

        [HttpPost("LevelCompleted/{levelId}")]
        public async Task LevelCompleted(int levelId)
        {
            await _progressService.LevelCompleted(userId, levelId);
        }
    }
}
