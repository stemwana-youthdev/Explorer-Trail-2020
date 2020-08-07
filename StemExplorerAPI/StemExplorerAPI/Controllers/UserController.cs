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
    [Authorize]
    public class UserContoller : ControllerBase
    {
        [HttpGet("GetTokenInfo")]
        public async Task<string> GetTokenInfo()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return String.Join(',', identity.Claims);
        }
    }
}
