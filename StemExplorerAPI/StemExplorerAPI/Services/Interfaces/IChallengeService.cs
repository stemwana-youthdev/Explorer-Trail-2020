using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Models.ViewModels.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IChallengeService
    {
        Task<List<ChallengeDto>> GetChallenges();
        Task<ChallengeDto> GetChallengeById(int challengeId);
        Task<int> AddChallenge(ChallengeRequestDto challengeDto);
        Task EditChallenge(ChallengeDto challengeDto);
        Task DeleteChallenge(ChallengeDto challengeDto);
    }
}
