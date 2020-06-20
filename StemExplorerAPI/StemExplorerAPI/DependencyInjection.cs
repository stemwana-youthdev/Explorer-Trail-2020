﻿using Microsoft.Extensions.DependencyInjection;
using StemExplorerAPI.Services;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IChallengeService, ChallengeService>();

            return services;
        }
    }
}
