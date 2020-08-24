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

        public async Task<List<UserProgressDto>> GetProgress(string userId)
        {
            return await _context.UserProgress
                .Where(p => p.UserId == userId)
                .Select(p => new UserProgressDto
                {
                    UserId = p.UserId,
                    ChallengeId = p.ChallengeLevel.ChallengeId,
                    ChallengeLevelId = p.ChallengeLevelId,
                    Attempts = p.Attempts,
                    Correct = p.Correct,
                })
                .ToListAsync();
        }

        private async Task<UserProgress> GetProgressForLevel(string userId, int levelId)
        {
            var progress = await _context.UserProgress
                .FirstOrDefaultAsync(p => p.UserId == userId && p.ChallengeLevelId == levelId);

            if (progress is null)
            {
                progress = new UserProgress
                {
                    Attempts = 0,
                    Correct = false,
                    UserId = userId,
                    ChallengeLevelId = levelId,
                };
                _context.UserProgress.Add(progress);
            }

            return progress;
        }

        public async Task LevelCompleted(string userId, int levelId, bool correct)
        {
            var progress = await GetProgressForLevel(userId, levelId);
            progress.Attempts++;
            if (correct)
            {
                progress.Correct = true;
            }
            await _context.SaveChangesAsync();
        }
    }
}

