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
    public class ProgressService : IProgressService
    {
        private readonly StemExplorerContext _context;
        public ProgressService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<ProgressDto> GetProgressForChallenge(string userId, int challengeId)
        {
            var completedLevels = await _context.CompletedLevels
                .Where(l => l.UserId == userId && l.ChallengeLevel.ChallengeId == challengeId)
                .Select(l => new CompletedLevelDto
                {
                    UserId = l.UserId,
                    ChallengeLevelId = l.ChallengeLevelId,
                })
                .ToListAsync();

            return new ProgressDto
            {
                ChallengeId = challengeId,
                CompletedLevels = completedLevels,
            };
        }

        public async Task LevelCompleted(string userId, int levelId)
        {
            var completedLevel = new CompletedLevel
            {
                UserId = userId,
                ChallengeLevelId = levelId,
            };

            _context.CompletedLevels.Add(completedLevel);
            await _context.SaveChangesAsync();
        }
    }
}

