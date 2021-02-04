using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private ILogger _logger;
        private IStatsService _statsService;

        public HomeController(ILogger<HomeController> logger, IStatsService statsService)
        {
            _logger = logger;
            _statsService = statsService;
        }

        [HttpGet("HealthCheck")]
        public ActionResult<string> HealthCheck()
        {
            return "API up and running";
        }

        [HttpGet("Stats")]
        public async Task<IActionResult> Stats()
        {
            try
            {
                return Ok(await _statsService.GetStats());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}