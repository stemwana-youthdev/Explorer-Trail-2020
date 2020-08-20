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
                    PossibleAnswers = l.PossibleAnswers,
                    Answers = l.Answers,
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
                    PossibleAnswers = l.PossibleAnswers,
                    Answers = l.Answers,
                    ChallengeId = l.ChallengeId,
                    Hint = l.Hint,
                })
                .ToListAsync();
        }

        public async Task<bool> ValidateAnswer(int levelId, string givenAnswer)
        {
            var level = await _context.ChallengeLevels.SingleAsync(l => l.Id == levelId);
            return level.Answers.Any(a => AnswerMatches(givenAnswer, a));
        }

        private bool AnswerMatches(string givenAnswer, string possibleAnswer)
            => NormalizeAnswer(givenAnswer) == NormalizeAnswer(possibleAnswer);

        private string NormalizeAnswer(string answer)
            => answer.Trim().ToLowerInvariant();
    }
}
