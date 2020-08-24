using StemExplorerAPI.Models.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IProgressService
    {
        Task<List<ProgressDto>> GetProgress(int profileId);
        Task LevelCompleted(int profileId, int levelId, bool correct);
    }
}
