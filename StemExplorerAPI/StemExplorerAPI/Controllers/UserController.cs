using StemExplorerData.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StemExplorerAPI.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserContoller : ControllerBase
    {
        private IUserService _userService;
        private IFirebaseTokenService _firebaseTokenService;

        public UserContoller(IUserService userService, IFirebaseTokenService firebaseTokenService)
        {
            _userService = userService;
            _firebaseTokenService = firebaseTokenService;
        }

        [HttpGet("CurrentUser")]
        [Authorize]
        public async Task<UserDto> GetCurrentUser()
        {
            var userId = _firebaseTokenService.GetTokenData(HttpContext).UserId;
            return await _userService.GetUser(userId);
        }

        [HttpPost("RegisterUser")]
        [Authorize]
        public async Task<UserDto> RegisterUser(UserDto userInfo)
        {
            // Use the user's actual userId
            var userId = _firebaseTokenService.GetTokenData(HttpContext).UserId;
            userInfo.Id = userId;
            return await _userService.CreateUser(userInfo);
        }

        [HttpPut("CurrentUser")]
        [Authorize]
        public async Task<UserDto> PutCurrentUser(UserDto userInfo)
        {
            // Use the user's actual userId
            var userId = _firebaseTokenService.GetTokenData(HttpContext).UserId;
            userInfo.Id = userId;
            await _userService.UpdateUser(userInfo);
            return await _userService.GetUser(userInfo.Id);
        }
    }
}
