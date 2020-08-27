using StemExplorerAPI.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IProfileService
    {
        Task<ProfileDto> CreateProfile(ProfileDto profileInfo);
        Task<List<ProfileDto>> GetProfiles(string userId);
        Task<ProfileDto> GetProfile(int profileId);
        Task AssertProfileOwnership(string userId, int profileId);
    }
}
