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
                Region = profileInfo.Region,
                HomeTown = profileInfo.HomeTown,
                PhotoUrl = profileInfo.PhotoUrl,
                ProfileCompleted = profileInfo.ProfileCompleted
            };

            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();

            return profile.Id;
        }

        public async Task<ProfileDto> GetProfile(string userId)
        {
            try {
                return await _context.Profiles
                    .AsNoTracking()
                    .Where(p => p.UserId == userId)
                    .Select(profile => new ProfileDto
                    {
                        Id = profile.Id,
                        UserId = profile.UserId,
                        FirstName = profile.FirstName,
                        LastName = profile.LastName,
                        Email = profile.Email,
                        Region = profile.Region,
                        HomeTown = profile.HomeTown,
                        PhotoUrl = profile.PhotoUrl,
                        ProfileCompleted = profile.ProfileCompleted
                    })
            }
        }

        // public async Task AssertProfileOwnership(string userId, int profileId)
        // {
        //     var profile = await GetProfile(profileId);
        //     if (profile.UserId != userId)
        //     {
        //         throw new AccessViolationException("You do not own that profile");
        //     }
        // }
    }
}

