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

        public async Task<List<ProgressDto>> GetProgress(int profileId)
        {
            return await _context.Progress
                .Where(p => p.ProfileId == profileId)
                .Select(p => new ProgressDto
                {
                    ProfileId = p.ProfileId,
                    ChallengeId = p.ChallengeLevel.ChallengeId,
                    ChallengeLevelId = p.ChallengeLevelId,
                    Attempts = p.Attempts,
                    Correct = p.Correct,
                })
                .ToListAsync();
        }

        private async Task<Progress> GetProgressForLevel(int profileId, int levelId)
        {
            var progress = await _context.Progress
                .FirstOrDefaultAsync(p => p.ProfileId == profileId && p.ChallengeLevelId == levelId);

            if (progress is null)
            {
                progress = new Progress
                {
                    Attempts = 0,
                    Correct = false,
                    ProfileId = profileId,
                    ChallengeLevelId = levelId,
                };
                _context.Progress.Add(progress);
            }

            return progress;
        }

        public async Task LevelCompleted(int profileId, int levelId, bool correct)
        {
            var progress = await GetProgressForLevel(profileId, levelId);
            if (progress.Correct)
            {
                // Don't store anything if the user has already completed the challenge
                return;
            }

            progress.Attempts++;
            if (correct)
            {
                progress.Correct = true;
            }
            await _context.SaveChangesAsync();
        }
    }
}

