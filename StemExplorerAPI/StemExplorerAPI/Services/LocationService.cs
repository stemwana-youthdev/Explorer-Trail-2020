using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class LocationService : ILocationService
    {
        private readonly StemExplorerContext _context;
        private readonly ILogger _logger;
        public LocationService(StemExplorerContext context, ILogger<LocationService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<LocationDto>> GetLocations()
        {
            try
            {
                return await _context.Locations
                    .AsNoTracking()
                    .Select(l => new LocationDto
                    {
                        Id = l.LocationId,
                        Name = l.Name,
                        GooglePlaceId = l.GooglePlaceId ?? null,
                        Position = new LocationPositionDto
                        {
                            Lat = l.Latitude ?? null,
                            Lng = l.Longitude ?? null,
                        },
                        LocationChallenges = l.Challenges.Select(lc => new LocationChallenge
                        {
                            ChallengeId = lc.Id,
                            ChallengeCategory = lc.Category,
                            ChallengeDescription = lc.Description,
                            ChallengeTitle = lc.Title
                        }).ToList(),
                        Link = l.Url,
                        Phone = l.Phone,
                        Email = l.Email,
                        ChallengeCount = l.Challenges.Count()
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<LocationDto> GetLocationById(int locationId)
        {
            try
            {
                return await _context.Locations
                    .AsNoTracking()
                    .Where(l => l.LocationId == locationId)
                    .Select(location => new LocationDto
                    {
                        Id = location.LocationId,
                        Name = location.Name,
                        GooglePlaceId = location.GooglePlaceId,
                        Position = new LocationPositionDto
                        {
                            Lat = location.Latitude ?? null,
                            Lng = location.Longitude ?? null,
                        },
                        LocationChallenges = location.Challenges.Select(lc => new LocationChallenge
                        {
                            ChallengeId = lc.Id,
                            ChallengeTitle = lc.Title,
                            ChallengeDescription = lc.Description,
                            ChallengeCategory = lc.Category
                        }).ToList(),
                        Link = location.Url,
                        ChallengeCount = location.Challenges.Count()
                    }).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }
    }
}
