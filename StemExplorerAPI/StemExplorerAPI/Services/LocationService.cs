using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.Entities;
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
		private readonly IProgressService _progressService;
		public LocationService(StemExplorerContext context, ILogger<LocationService> logger, IProgressService progressService)
		{
			_context = context;
			_logger = logger;
			_progressService = progressService;
		}

		public async Task<List<LocationDto>> GetLocations(int? profileId)
		{
			try
			{
				var locations = await _context.Locations
					.AsNoTracking()
					.Select(l => new LocationDto
					{
						Id = l.LocationId,
						Name = l.Name,
						Address = l.Address,
						GooglePlaceId = l.GooglePlaceId ?? null,
						Position = new LocationPositionDto
						{
							Lat = l.Latitude,
							Lng = l.Longitude,
						},
						LocationChallenges = l.Challenges
							.Where(lc => lc.ChallengeLevels.Count > 0)
							.Select(lc => new LocationChallenge
							{
								Id = lc.Id,
								Category = lc.Category,
								Description = lc.Description,
								Title = lc.Title,
								Levels = lc.ChallengeLevels.Select(l => new LocationLevelDto
								{
									Id = l.Id,
									Difficulty = l.Difficulty,
									Complete = false,
								}),
							}).ToList(),
						Link = l.Url,
						Phone = l.Phone,
						Email = l.Email,
						ChallengeCount = l.Challenges.Count(),
						Featured = l.Featured,
					})
					.ToListAsync();

				if (profileId != null)
				{
					var progress = await _progressService.GetProgress(profileId ?? 0);

					foreach (var l in locations)
					{
						foreach (var lc in l.LocationChallenges)
						{
							foreach (var level in lc.Levels)
							{
								level.Complete = progress.FirstOrDefault(p => p.ChallengeLevelId == level.Id)?.Correct ?? false;
							}
						}
					}
				}

				return locations;
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
						Address = location.Address,
						GooglePlaceId = location.GooglePlaceId,
						Position = new LocationPositionDto
						{
							Lat = location.Latitude,
							Lng = location.Longitude,
						},
						LocationChallenges = location.Challenges.Select(lc => new LocationChallenge
						{
							Id = lc.Id,
							Title = lc.Title,
							Description = lc.Description,
							Category = lc.Category
						}).ToList(),
						Link = location.Url,
						ChallengeCount = location.Challenges.Count(),
						Featured = location.Featured,
					}).SingleOrDefaultAsync();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message, ex);
				throw;
			}
		}

		public async Task<List<FeaturedLocationDto>> GetFeaturedLocations()
		{
			try
			{
				var locations = await _context.Locations
					.AsNoTracking()
					.Where(l => l.Featured)
					.Select(l => new FeaturedLocationDto
					{
						Id = l.LocationId,
						Name = l.Name,
						GooglePlaceId = l.GooglePlaceId ?? null,
						Position = new LocationPositionDto
						{
							Lat = l.Latitude,
							Lng = l.Longitude,
						},
						Link = l.Url,
						Phone = l.Phone,
						Email = l.Email,
						Featured = l.Featured,
						Address = l.Address,
						FeaturedImage = l.FeaturedImage,
						FeaturedText = l.FeaturedText,
						OfferText = l.OfferText,
						Order = l.Order,
					})
					.ToListAsync();

				return locations;
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message, ex);
				throw;
			}
		}

		public async Task<int> AddLocation(LocationDto newLocation)
		{
			var location = new Location
			{
				Name = newLocation.Name,
				Address = newLocation.Address,
				Latitude = newLocation.Position.Lat,
				Longitude = newLocation.Position.Lng,
				GooglePlaceId = newLocation.GooglePlaceId ?? null,
				Url = newLocation.Link ?? null,
				Phone = newLocation.Phone ?? null,
				Email = newLocation.Email ?? null,
				Featured = newLocation.Featured
			};
			_context.Locations.Add(location);
			await _context.SaveChangesAsync();
			return location.LocationId;
		}

		public async Task<LocationDto> EditLocation(LocationDto locationDto)
		{
			//TODO - check where this method is called from within the UI to determine what kind of Dto it should receive
			try
			{
				var entity = await _context.Locations.SingleOrDefaultAsync(l => l.LocationId == locationDto.Id);
				entity.Name = locationDto.Name;
				entity.GooglePlaceId = locationDto.GooglePlaceId;
				entity.Latitude = locationDto.Position.Lat;
				entity.Longitude = locationDto.Position.Lng;
				entity.Url = locationDto.Link;
				entity.Address = locationDto.Address;
				entity.Phone = locationDto.Phone;
				entity.Email = locationDto.Email;
				entity.Featured = locationDto.Featured;
				await _context.SaveChangesAsync();
				return locationDto;
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
