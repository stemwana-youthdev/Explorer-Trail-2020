using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
                        GooglePlaceId = l.GooglePlaceId,
                        Position = new LocationPositionDto
                        {
                            Latitude = l.Latitude ?? null,
                            Longitude = l.Longitude ?? null,
                        },
                        Link = l.Url,
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
                            Latitude = location.Latitude ?? null,
                            Longitude = location.Longitude ?? null,
                        },
                        LocationChallenges = location.Challenges.Select(lc => new LocationChallenges
                        {
                            ChallengeId = lc.Id,
                            ChallengeTitle = lc.Title,
                            ChallengeDescription = lc.Description,
                            ChallengeCategory = lc.Category
                        }).ToList(),
                        Link = location.Url,
                    }).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<int> AddLocation(LocationRequestDto locationDto)
        {
            var location = new Location
            {
                Name = locationDto.Name,
                GooglePlaceId = locationDto.GooglePlaceId,
                Latitude = locationDto?.Latitude,
                Longitude = locationDto?.Longitude,
                Url = locationDto.Url,
                // TODO - Clarify workflow for adding contact to new location
                //ContactName = locationDto.ContactName,
                //PreferredContactMethodForContact = locationDto.PreferredContactMethodForContact
            };

            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            return location.LocationId;
        }

        public async Task EditLocation(LocationDto locationDto)
        {
            //TODO - check where this method is called from within the UI to determine what kind of Dto it should receive
            try
            {
                var entity = await _context.Locations.SingleOrDefaultAsync(l => l.LocationId == locationDto.Id);

                entity.Name = locationDto.Name;
                entity.GooglePlaceId = locationDto.GooglePlaceId;
                entity.Latitude = locationDto.Position.Latitude ?? null;
                entity.Longitude = locationDto.Position.Longitude ?? null;
                entity.Url = locationDto.Link;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }

        }

        public async Task DeleteLocation(LocationDto locationDto)
        {
            //TODO - check where this method is called from within the UI to determine what kind of Dto it should receive
            try
            {
                var entity = await _context.Locations.SingleOrDefaultAsync(l => l.LocationId == locationDto.Id);

                _context.Remove(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }

        }
    }
}
