using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IAdminService
    {
        Task<bool> UserIsAdmin(ClaimsPrincipal user);
    }
}
