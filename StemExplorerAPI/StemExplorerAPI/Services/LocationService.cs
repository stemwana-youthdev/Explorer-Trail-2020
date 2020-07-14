using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.Entities;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Models.ViewModels.Requests;
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
            return await _context.Locations
                .AsNoTracking()
                .Select(l => new LocationDto
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
                }).ToListAsync();
        }

        public async Task<LocationDto> GetLocationById(int locationId)
        {
            return await _context.Locations
                .AsNoTracking()
                .Where(l => l.LocationId == locationId)
                .Select(dto => new LocationDto
                {
                    Id = dto.LocationId,
                    Name = dto.Name,
                    Position = new LocationPositionDto
                    {
                        Latitude = dto.Latitude,
                        Longitude = dto.Longitude,
                    },
                    ChallengeTitle = dto.Challenges.Any() ? dto.Challenges.First().Title : null,
                    ChallengeDescription = dto.Challenges.Any() ? dto.Challenges.First().Description : null,
                    ChallengeCategory = dto.Challenges.Any() ? dto.Challenges.First().Category : 0,
                    Link = dto.Url,
                }).SingleOrDefaultAsync();
        }

        public async Task<int> AddLocation(LocationRequestDto locationDto)
        {
            var location = new Location
            {
                Name = locationDto.Name,
                Latitude = locationDto.Latitude,
                Longitude = locationDto.Longitude,
                Url = locationDto.Url,
                // TODO - Clarify workflow for adding contact to new location
                //ContactName = locationDto.ContactName,
                //PreferredContactMethodForContact = locationDto.PreferredContactMethodForContact
            };

            _context.Locations.Add(location);
            await _context.SaveChangesAsync();
            
            return location.LocationId;
        }
    }
}
