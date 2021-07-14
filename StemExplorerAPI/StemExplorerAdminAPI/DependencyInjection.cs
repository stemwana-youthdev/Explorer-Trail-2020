using Microsoft.Extensions.DependencyInjection;
using StemExplorerService.Services;
using StemExplorerService.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAdminAPI
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IChallengeService, ChallengeService>();
            //services.AddScoped<IChallengeLevelService, ChallengeLevelService>();
            //services.AddScoped<IExternalContentService, ExternalContentService>();
            services.AddScoped<ILocationService, LocationService>();
            // services.AddScoped<IUserService, UserService>();
            services.AddScoped<IProgressService, ProgressService>();
            //services.AddScoped<IProfileService, ProfileService>();
            //services.AddScoped<IFirebaseTokenService, FirebaseTokenService>();

            return services;
        }
    }
}
