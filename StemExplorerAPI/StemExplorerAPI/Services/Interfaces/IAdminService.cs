using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IAdminService
    {
        Task<bool> UserIsAdmin(HttpContext context);
    }
}
