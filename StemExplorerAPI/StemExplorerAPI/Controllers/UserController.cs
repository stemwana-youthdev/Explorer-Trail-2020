using StemExplorerAPI.Models.ViewModels;
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

        private string userId
        {
            get
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                return identity.FindFirst("user_id").Value;
            }
        }

        public UserContoller(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("CurrentUser")]
        [Authorize]
        public async Task<UserDto> GetCurrentUser()
        {
            return await _userService.GetUser(userId);
        }

        [HttpPost("RegisterUser")]
        [Authorize]
        public async Task<UserDto> RegisterUser(UserDto userInfo)
        {
            // Use the user's actual userId
            userInfo.Id = userId;
            return await _userService.CreateUser(userInfo);
        }

        [HttpPut("CurrentUser")]
        [Authorize]
        public async Task<UserDto> PutCurrentUser(UserDto userInfo)
        {
            // Use the user's actual userId
            userInfo.Id = userId;
            await _userService.UpdateUser(userInfo);
            return await _userService.GetUser(userInfo.Id);
        }
    }
}
