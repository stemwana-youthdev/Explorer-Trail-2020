using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IFirebaseTokenService {
        IFirebaseTokenData GetTokenData(ClaimsPrincipal context);
        IFirebaseTokenData GetTokenData(HttpContext context);
    }

    public interface IFirebaseTokenData {
        string Name { get; }
        string UserId { get; }
    }
}
