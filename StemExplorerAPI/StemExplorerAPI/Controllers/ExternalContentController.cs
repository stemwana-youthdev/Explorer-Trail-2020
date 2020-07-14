using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/ExternalContent")]
    [ApiController]
    public class ExternalContentController : ControllerBase
    {
        private readonly IExternalContentService _externalContentService;

        public ExternalContentController(IExternalContentService externalContentService)
        {
            _externalContentService = externalContentService;
        }

        [HttpGet("GetContent")]
        public async Task<List<ExternalContentDto>> GetAllContent()
        {
            return await _externalContentService.GetContent();
        }

        [HttpPost]
        public async Task Post([FromBody] ExternalContentDto newContent)
        {
            await _externalContentService.InsertContent(newContent);
        }
    }
}
