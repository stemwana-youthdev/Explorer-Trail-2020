using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class ChallengeLevelService : IChallengeLevelService
    {
        private readonly StemExplorerContext _context;
        public ChallengeLevelService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<ChallengeLevelsDto> GetLevelsForChallenge(int challengeId)
        {
            var levels = await _context.ChallengeLevels
                .Where(l => l.ChallengeId == challengeId)
                .Select(l => new ChallengeLevelDto
                {
                    Id = l.Id,
                    QuestionText = l.QuestionText,
                    Difficulty = l.Difficulty,
                    AnswerType = l.AnswerType,
                    PossibleAnswers = l.Answers
                        .Select(a => new ChallengeAnswerDto
                        {
                            Id = a.Id,
                            AnswerText = a.AnswerText,
                            IsCorrect = a.IsCorrect,
                        }).ToList(),
                })
                .ToListAsync();
            return new ChallengeLevelsDto
            {
                ChallengeLevels = levels,
            };
        }
    }
}
