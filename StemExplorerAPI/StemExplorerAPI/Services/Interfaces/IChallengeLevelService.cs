using StemExplorerAPI.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IChallengeLevelService
    {
        Task<List<ChallengeLevelDto>> GetLevels(int? profileId);
        Task<List<ChallengeLevelDto>> GetLevelsForChallenge(int challengeId, int? profileId);
        Task<ChallengeLevelDto> GetLevelById(int id);
        Task<bool> ValidateAnswer(int levelId, string givenAnswer);
    }
}
