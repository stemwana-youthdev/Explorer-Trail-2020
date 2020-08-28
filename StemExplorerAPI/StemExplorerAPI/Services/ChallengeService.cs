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
        public ChallengeService(StemExplorerContext context, ILogger<ChallengeService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<ChallengeDto>> GetChallenges()
        {
            try
            {
                return await _context.Challenges
                    .AsNoTracking()
                    .Select(c => new ChallengeDto
                    {
                        Id = c.Id,
                        Title = c.Title,
                        Description = c.Description,
                        Category = c.Category,
                        LocationId = c.LocationId,
                    }).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<ChallengeDto> GetChallengeById(int challengeId)
        {
            try
            {
                return await _context.Challenges
                    .AsNoTracking()
                    .Where(c => c.Id == challengeId)
                    .Select(challenge => new ChallengeDto
                    {
                        Id = challenge.Id,
                        Title = challenge.Title,
                        Description = challenge.Description,
                        Category = challenge.Category,
                        LocationId = challenge.LocationId,
                        ChallengeLevels = challenge.ChallengeLevel.Select(cl => new LevelsForChallenge
                        {
                            Id = cl.Id,
                            Question = cl.QuestionText,
                            Instructions = cl.Instructions,
                            Difficulty = cl.Difficulty,
                            Answer = cl.Answers,
                            Hint = cl.Hint,
                            PossibleAnswers = cl.PossibleAnswers,
                            QuestionType = cl.AnswerType
                        }).ToList().OrderBy(l => l.Difficulty)
                    }).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }
    }
}
