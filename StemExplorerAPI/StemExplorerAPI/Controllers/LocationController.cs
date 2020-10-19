using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;

namespace StemExplorerAPI.Controllers
{
    [Route("api/Locations")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;
        private readonly ILogger _logger;

        public LocationController(ILogger<LocationController> logger, ILocationService locationService)
        {
            _logger = logger;
            _locationService = locationService;
        }

        // GET: api/Location
        [HttpGet]
        public async Task<IActionResult> Get(int? profileId)
        {
            try
            {
                return Ok(await _locationService.GetLocations(profileId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // GET: api/Location/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocation(int id)
        {
            try
            {
                var location = await _locationService.GetLocationById(id);

                if (location == null)
                {
                    return NotFound();
                }

                return Ok(location);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // GET: api/Locations/Featured
        [HttpGet("Featured")]
        public async Task<IActionResult> GetFeaturedLocations()
        {
            try
            {
                return Ok(await _locationService.GetFeaturedLocations());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // POST: api/Location
        [HttpPost]
        public async Task<IActionResult> AddLocationAsync([FromBody] LocationDto locationDto)
        {
            try
            {
                var locationId = await _locationService.AddLocation(locationDto);
                return CreatedAtRoute("GetLocationById", new { id = locationId }, locationDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // PUT: api/Location/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] LocationDto locationDto)
        {
            try
            {
                var location = await _locationService.GetLocationById(locationDto.Id);
                if (locationDto == null)
                {
                    return NotFound();
                }
                return Ok(await _locationService.EditLocation(locationDto));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // DELETE: api/Location/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
