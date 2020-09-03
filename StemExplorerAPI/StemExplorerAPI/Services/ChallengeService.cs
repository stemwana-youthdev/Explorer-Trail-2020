using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class ChallengeService : IChallengeService
    {
        private readonly StemExplorerContext _context;
        private readonly ILogger _logger;
        private readonly IProgressService _progressService;
        public ChallengeService(StemExplorerContext context, ILogger<ChallengeService> logger, IProgressService progressService)
        {
            _context = context;
            _logger = logger;
            _progressService = progressService;
        }

        public async Task<List<ChallengeDto>> GetChallenges(int? profileId)
        {
            try
            {
                var challenges = await _context.Challenges
                    .AsNoTracking()
                    .Select(c => new ChallengeDto
                    {
                        Id = c.Id,
                        Title = c.Title,
                        Description = c.Description,
                        Category = c.Category,
                        LocationId = c.LocationId,
                    }).ToListAsync();

                return challenges;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<ChallengeDto> GetChallengeById(int challengeId, int? profileId)
        {
            try
            {
                var unwrappedProfileId = profileId ?? -1;

                var challenge = await _context.Challenges
                    .AsNoTracking()
                    .Where(c => c.Id == challengeId)
                    .Select(challenge => new ChallengeDto
                    {
                        Id = challenge.Id,
                        Title = challenge.Title,
                        Description = challenge.Description,
                        Category = challenge.Category,
                        LocationId = challenge.LocationId,
                        ChallengeLevels = challenge.ChallengeLevels.Select(cl => new LevelsForChallenge
                        {
                            Id = cl.Id,
                            Question = cl.QuestionText,
                            Instructions = cl.Instructions,
                            Difficulty = cl.Difficulty,
                            Answer = cl.Answers,
                            Hint = cl.Hint,
                            PossibleAnswers = cl.PossibleAnswers,
                            QuestionType = cl.AnswerType,
                            Complete = _context.Progress.Any(p => p.ProfileId == unwrappedProfileId && p.ChallengeLevelId == cl.Id) && _context.Progress.First(p => p.ProfileId == unwrappedProfileId && p.ChallengeLevelId == cl.Id).Correct,
                        }).OrderBy(l => l.Difficulty).ToList()
                    }).SingleOrDefaultAsync();

                return challenge;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }
    }
}
