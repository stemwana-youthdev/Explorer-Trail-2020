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
    public class ChallengeLevelService : IChallengeLevelService
    {
        private readonly StemExplorerContext _context;
        public ChallengeLevelService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<List<ChallengeLevelDto>> GetLevels()
        {
            return await _context.ChallengeLevels
                .Select(l => new ChallengeLevelDto
                {
                    Id = l.Id,
                    QuestionText = l.QuestionText,
                    Difficulty = l.Difficulty,
                    Instructions = l.Instructions,
                    AnswerType = l.AnswerType,
                    PossibleAnswers = l.Answers.Select(a => a.AnswerText).ToList(),
                    Answers = l.Answers.Where(a => a.IsCorrect).Select(a => a.AnswerText).ToList(),
                    ChallengeId = l.ChallengeId,
                    Hint = l.Hint,
                })
                .ToListAsync();
        }

        public async Task<List<ChallengeLevelDto>> GetLevelsForChallenge(int challengeId)
        {
            return await _context.ChallengeLevels
                .Where(l => l.ChallengeId == challengeId)
                .Select(l => new ChallengeLevelDto
                {
                    Id = l.Id,
                    QuestionText = l.QuestionText,
                    Difficulty = l.Difficulty,
                    Instructions = l.Instructions,
                    AnswerType = l.AnswerType,
                    PossibleAnswers = l.Answers.Select(a => a.AnswerText).ToList(),
                    Answers = l.Answers.Where(a => a.IsCorrect).Select(a => a.AnswerText).ToList(),
                    ChallengeId = l.ChallengeId,
                    Hint = l.Hint,
                })
                .ToListAsync();
        }

        public async Task<bool> ValidateAnswer(int levelId, string givenAnswer)
        {
            var level = await _context.ChallengeLevels
                .Include(l => l.Answers)
                .SingleAsync(l => l.Id == levelId);
            foreach (var possibleAnswer in level.Answers)
            {
                if (AnswerMatches(givenAnswer, possibleAnswer))
                {
                    return possibleAnswer.IsCorrect;
                }
            }
            return false;
        }

        private bool AnswerMatches(string givenAnswer, ChallengeAnswer possibleAnswer)
            => NormalizeAnswer(givenAnswer) == NormalizeAnswer(possibleAnswer.AnswerText);

        private string NormalizeAnswer(string answer)
            => answer.Trim().ToLowerInvariant();
    }
}
