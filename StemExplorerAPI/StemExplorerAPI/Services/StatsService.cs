using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.Entities;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class StatsService : IStatsService
    {
        private readonly StemExplorerContext _context;
        public StatsService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<StatsDto> GetStats()
        {
            return new StatsDto
            {
                LocationCount = await _context.Locations.CountAsync(),
                ChallengeCount = await _context.Challenges.CountAsync(),
                LevelCount = await _context.ChallengeLevels.CountAsync(),
                AverageDifficulty = await _context.ChallengeLevels.AverageAsync(l => (double) l.Difficulty),
            };
        }
    }
}
