using Microsoft.AspNetCore.Http;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface IFirebaseTokenService {
        IFirebaseTokenData GetTokenData(HttpContext context);
    }

    public interface IFirebaseTokenData {
        string Name { get; }
        string UserId { get; }
    }
}
