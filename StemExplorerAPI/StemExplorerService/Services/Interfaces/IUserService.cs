using StemExplorerData.Models.ViewModels;
using System.Threading.Tasks;

namespace StemExplorerService.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUser(string userId);
        Task<UserDto> CreateUser(UserDto userInfo);
        Task UpdateUser(UserDto userInfo);
    }
}