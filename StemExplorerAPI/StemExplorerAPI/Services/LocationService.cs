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

        public IEnumerable<LocationDto> GetLocations()
        {
            return _context.Locations.Select(l => new LocationDto
            {
                Id = l.LocationId,
                Name = l.Name,
                Lng = l.Longitude,
                Lat = l.Latitude,
                Link = l.Url,
            }).ToList();
        }
    }
}
