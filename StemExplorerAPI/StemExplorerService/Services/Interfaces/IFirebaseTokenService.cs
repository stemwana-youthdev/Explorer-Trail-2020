using Microsoft.AspNetCore.Http;

namespace StemExplorerService.Services.Interfaces
{
    public interface IFirebaseTokenService {
        IFirebaseTokenData GetTokenData(HttpContext context);
    }

    public interface IFirebaseTokenData {
        string UserId { get; }
    }
}
