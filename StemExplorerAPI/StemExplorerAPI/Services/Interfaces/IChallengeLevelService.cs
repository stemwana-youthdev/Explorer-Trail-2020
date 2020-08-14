using StemExplorerAPI.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IChallengeLevelService
    {
        Task<List<ChallengeLevelDto>> GetLevels();
        Task<List<ChallengeLevelDto>> GetLevelsForChallenge(int challengeId);
        Task<bool> ValidateAnswer(int levelId, string givenAnswer);
    }
}
