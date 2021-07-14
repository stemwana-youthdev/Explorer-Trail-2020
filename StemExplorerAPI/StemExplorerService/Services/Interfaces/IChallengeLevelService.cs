using StemExplorerData.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerService.Services.Interfaces
{
    public interface IChallengeLevelService
    {
        Task<List<ChallengeLevelDto>> GetLevels(int? profileId);
        Task<List<ChallengeLevelDto>> GetLevelsForChallenge(int challengeId, int? profileId);
        Task<bool> ValidateAnswer(int levelId, string givenAnswer);
    }
}
