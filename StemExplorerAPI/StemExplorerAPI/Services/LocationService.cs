using Microsoft.EntityFrameworkCore;
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
        public LocationService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<List<LocationDto>> GetLocations()
        {
            return await _context.Locations.Select(l => new LocationDto
            {
                Id = l.LocationId,
                Name = l.Name,
                Position = new LocationPositionDto
                {
                    Latitude = l.Latitude,
                    Longitude = l.Longitude,
                },
                ChallengeTitle = l.Challenges.Any() ? l.Challenges.First().Title : null,
                ChallengeDescription = l.Challenges.Any() ? l.Challenges.First().Description : null,
                ChallengeCategory = l.Challenges.Any() ? l.Challenges.First().Category : 0,
                Link = l.Url,
                ChallengeId = l.Challenges.Any() ? l.Challenges.First().Id : 0,
            }).ToListAsync();
        }
    }
}
