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

        public LocationsDto GetLocations()
        {
            var locations = _context.Locations.Select(l => new LocationDto
            {
                Id = l.LocationId,
                Name = l.Name,
                Position = new LocationPositionDto
                {
                    Latitude = l.Latitude,
                    Longitude = l.Longitude,
                },
                ChallengeTitle = l.Challenges.First().Title,
                ChallengeDescription = l.Challenges.First().Description,
                ChallengeCategory = l.Challenges.First().Category,
                Link = l.Url,
            }).ToList();

            return new LocationsDto
            {
                Locations = locations,
            };
        }
    }
}
