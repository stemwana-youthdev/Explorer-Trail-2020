using Microsoft.EntityFrameworkCore;
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
    public class ProfileService : IProfileService
    {
        private readonly StemExplorerContext _context;
        public ProfileService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<ProfileDto> CreateProfile(ProfileDto profileInfo)
        {
            var profile = new Profile
            {
                Name = profileInfo.Name,
                UserId = profileInfo.UserId,
            };

            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();

            return new ProfileDto
            {
                Id = profile.Id,
                Name = profile.Name,
                UserId = profile.UserId,
            };
        }

        public async Task<List<ProfileDto>> GetProfiles(string userId)
        {
            return await _context.Profiles
                .Where(p => p.UserId == userId)
                .Select(p => new ProfileDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    UserId = p.UserId,
                })
                .ToListAsync();
        }

        public async Task<ProfileDto> GetProfile(int profileId)
        {
            var profile = await _context.Profiles
                .FirstAsync(p => p.Id == profileId);
            return new ProfileDto
            {
                Id = profile.Id,
                Name = profile.Name,
                UserId = profile.UserId,
            };
        }

        public async Task AssertProfileOwnership(string userId, int profileId)
        {
            var profile = await GetProfile(profileId);
            if (profile.UserId != userId)
            {
                throw new AccessViolationException("You do not own that profile");
            }
        }
    }
}

