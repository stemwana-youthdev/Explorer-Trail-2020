using StemExplorerData.Models.ViewModels;
using StemExplorerData.Models.ViewModels.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IProfileService
    {
        Task<int> CreateProfile(ProfileRequestDto profileDto);
        Task<ProfileDto> GetProfile(string userId);
        Task EditProfile(ProfileDto profile);
    }
}
