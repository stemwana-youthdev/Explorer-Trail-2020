using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IAdminService
    {
        Task<bool> UserIsAdmin(ClaimsPrincipal user);
        Task<List<string>> GetAllAdmins();
        Task DeleteAdmin(string email);
        Task CreateAdmin(string email);
    }
}
