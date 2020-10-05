using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.Entities;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using static StemExplorerAPI.Models.Enums;

namespace StemExplorerAPI.Services
{
    public class ChallengeLevelService : IChallengeLevelService
    {
        private readonly StemExplorerContext _context;
        private readonly IProgressService _progressService;
        public ChallengeLevelService(StemExplorerContext context, IProgressService progressService)
        {
            _context = context;
            _progressService = progressService;
        }

        public async Task<List<ChallengeLevelDto>> GetLevels(int? profileId)
        {
            var levels = await _context.ChallengeLevels
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
                    Complete = false,
                })
                .OrderBy(l => l.Difficulty)
                .ToListAsync();

            if (profileId != null) 
            {
                var progress = await _progressService.GetProgress(profileId ?? 0);
            
                foreach (var level in levels)
                {
                    level.Complete = progress.FirstOrDefault(p => p.ChallengeLevelId == level.Id)?.Correct ?? false;
                }
            }
        
            return levels;
        }

        public async Task<List<ChallengeLevelDto>> GetLevelsForChallenge(int challengeId, int? profileId)
        {
            var levels = await _context.ChallengeLevels
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

            if (profileId != null) 
            {
                var progress = await _progressService.GetProgress(profileId ?? 0);
            
                foreach (var level in levels)
                {
                    level.Complete = progress.FirstOrDefault(p => p.ChallengeLevelId == level.Id)?.Correct ?? false;
                }
            }

            return levels;
        }

        public async Task<bool> ValidateAnswer(int levelId, string givenAnswer)
        {
            var level = await _context.ChallengeLevels.SingleAsync(l => l.Id == levelId);
            return level.Answers.Any(a => AnswerMatches(level.AnswerType, givenAnswer, a));
        }

        private bool AnswerMatches(AnswerType answerType, string givenAnswer, string possibleAnswer)
        {
            Console.WriteLine(answerType);
            switch (answerType)
            {
                case AnswerType.Number:
                    if (double.TryParse(givenAnswer, out double a) &&
                        double.TryParse(possibleAnswer, out double b))
                    {
                        return a == b;
                    }
                    else
                    {
                        return false;
                    }
                case AnswerType.Contains:
                    var given = NormalizeAnswer(givenAnswer);
                    var possible = NormalizeAnswer(possibleAnswer);
                    Console.WriteLine("{0}, {1}", given, possible);
                    return given.Contains(possible);
                default:
                    return NormalizeAnswer(givenAnswer) == NormalizeAnswer(possibleAnswer);
            }
        }

        private string NormalizeAnswer(string answer)
            => answer.Trim().ToLowerInvariant();
    }
}
