using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.Entities;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Models.ViewModels.Requests;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class ProfileService : IProfileService
    {
        private readonly StemExplorerContext _context;
        private readonly ILogger _logger;
        public ProfileService(StemExplorerContext context, ILogger<ProfileService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<int> CreateProfile(ProfileRequestDto profileInfo)
        {
            var profile = new Profile
            {
                UserId = profileInfo.UserId,
                FirstName = profileInfo.FirstName,
                LastName = profileInfo.LastName,
                Email = profileInfo.Email,
            };

            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();

            return profile.Id;
        }

        public async Task<ProfileDto> GetProfile(string userId)
        {
            try
            {
                return await _context.Profiles
                    .AsNoTracking()
                    .Where(p => p.UserId == userId)
                    .Select(profile => new ProfileDto
                    {
                        Id = profile.Id,
                        UserId = profile.UserId,
                        FirstName = profile.FirstName,
                        LastName = profile.LastName,
                        Nickname = profile.Nickname,
                        Email = profile.Email,
                        Region = profile.Region,
                        HomeTown = profile.HomeTown,
                        PhotoUrl = profile.PhotoUrl,
                        ProfileCompleted = profile.ProfileCompleted
                    }).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task EditProfile(ProfileDto profileDto)
        {
            try
            {
                var entity = await _context.Profiles.SingleOrDefaultAsync(p => p.Id == profileDto.Id);

                entity.FirstName = profileDto.FirstName;
                entity.LastName = profileDto.LastName;
                entity.Nickname = profileDto.Nickname;
                entity.Region = profileDto.Region;
                entity.HomeTown = profileDto.HomeTown;
                entity.PhotoUrl = profileDto.PhotoUrl;
                entity.ProfileCompleted = profileDto.ProfileCompleted;

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

