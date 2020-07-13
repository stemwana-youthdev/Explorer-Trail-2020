using StemExplorerAPI.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IChallengeLevelService
    {
        Task<ChallengeLevelsDto> GetLevelsForChallenge(int challengeId);
    }
}
