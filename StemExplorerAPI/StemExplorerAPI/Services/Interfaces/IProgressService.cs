using StemExplorerAPI.Models.ViewModels;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IProgressService
    {
        Task<ProgressDto> GetProgressForChallenge(string userId, int challengeId);
        Task LevelCompleted(string userId, int levelId);
    }
}
