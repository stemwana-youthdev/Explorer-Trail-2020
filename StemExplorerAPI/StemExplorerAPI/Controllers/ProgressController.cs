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

        [HttpGet("")]
        public async Task<List<UserProgressDto>> Get()
        {
            return await _progressService.GetProgress(userId);
        }

        [HttpPost("LevelCompleted")]
        public async Task LevelCompleted(CompletedLevelDto completed)
        {
            await _progressService.LevelCompleted(userId, completed.LevelId, completed.Correct);
        }
    }
}
