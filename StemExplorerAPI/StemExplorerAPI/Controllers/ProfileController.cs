using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Models.ViewModels.Requests;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Profile")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;
        private readonly ILogger _logger;
        private readonly IFirebaseTokenService _firebaseTokenService;

        public ProfileController(IProfileService profileService, ILogger<ProfileController> logger, IFirebaseTokenService firebaseTokenService)
        {
            _profileService = profileService;
            _logger = logger;
            _firebaseTokenService = firebaseTokenService;
        }

        // GET: api/Profile
        [HttpGet(Name ="GetProfile")]
        [Authorize]
        public async Task<IActionResult> Get(string userId)
        {
            try
            {
                var actualUserId = _firebaseTokenService.GetTokenData(HttpContext).UserId;
                if (userId != actualUserId)
                {
                    return Unauthorized();
                }

                var profile = await _profileService.GetProfile(userId);

                if (profile == null)
                {
                    return NotFound();
                }

                return Ok(profile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // POST: api/Profile
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateProfileAsync([FromBody] ProfileRequestDto profileDto)
        {
            try
            {
                var actualUserId = _firebaseTokenService.GetTokenData(HttpContext).UserId;
                if (profileDto.UserId != actualUserId)
                {
                    return Unauthorized();
                }

                var oldProfile = await _profileService.GetProfile(profileDto.UserId);
                if (oldProfile != null)
                {
                    return Conflict();
                }

                var profileId = await _profileService.CreateProfile(profileDto);
                
                // profileDto does not contain the profile id
                var profile = await _profileService.GetProfile(profileDto.UserId);
                return CreatedAtRoute("GetProfile", profile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // PUT: api/Profile/Update
        [HttpPut("Update")]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] ProfileDto profileDto)
        {
            try
            {
                var actualUserId = _firebaseTokenService.GetTokenData(HttpContext).UserId;
                if (profileDto.UserId != actualUserId)
                {
                    return Unauthorized();
                }

                var profile = await _profileService.GetProfile(profileDto.UserId);

                if (profile == null)
                {
                    return NotFound();
                }

                await _profileService.EditProfile(profileDto);
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
