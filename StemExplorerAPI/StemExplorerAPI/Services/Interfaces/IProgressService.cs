using StemExplorerAPI.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IProgressService
    {
        Task<List<UserProgressDto>> GetProgress(string userId);
        Task LevelCompleted(string userId, int levelId, bool correct);
    }
}
