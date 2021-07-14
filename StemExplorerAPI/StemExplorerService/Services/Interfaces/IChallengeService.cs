using StemExplorerData.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerService.Services.Interfaces
{
    public interface IChallengeService
    {
        Task<List<ChallengeDto>> GetChallenges(int? profileId);
        Task<ChallengeDto> GetChallengeById(int challengeId, int? profileId);
    }
}
