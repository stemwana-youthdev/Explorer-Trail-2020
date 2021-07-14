using StemExplorerService.Services.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace StemExplorerService.Services
{
    public class FirebaseTokenService : IFirebaseTokenService
    {
        public IFirebaseTokenData GetTokenData(HttpContext context)
            => new FirebaseTokenData(context.User.Identity as ClaimsIdentity);

        private class FirebaseTokenData : IFirebaseTokenData
        {
            private ClaimsIdentity _identity;

            public FirebaseTokenData(ClaimsIdentity identity)
            {
                _identity = identity;
            }

            public string UserId => _identity.FindFirst("user_id")?.Value;
        }
    }
}
