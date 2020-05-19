using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet("HealthCheck")]
        public ActionResult<string> HealthCheck()
        {
            return "API up and running";
        }
    }
}