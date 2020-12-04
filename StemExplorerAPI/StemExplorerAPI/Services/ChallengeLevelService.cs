using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger _logger;
        public ChallengeLevelService(StemExplorerContext context, IProgressService progressService, ILogger<ChallengeLevelService> logger)
        {
            _context = context;
            _progressService = progressService;
            _logger = logger;
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

        public async Task<ChallengeLevelDto> GetLevelById(int levelId)
        {
            try
            {
                var level = await _context.ChallengeLevels
                    .AsNoTracking()
                    .Where(l => l.Id == levelId)
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
                    }).SingleOrDefaultAsync();
                return level;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<int> AddLevel(ChallengeLevelDto level)
        {
            try
            {
                var entity = new ChallengeLevel
                {
                    QuestionText = level.QuestionText,
                    Difficulty = level.Difficulty,
                    Instructions = level.Instructions,
                    AnswerType = level.AnswerType,
                    Hint = level.Hint,
                    PossibleAnswers = level.PossibleAnswers,
                    Answers = level.Answers,
                    ChallengeId = level.ChallengeId,
                };
                _context.ChallengeLevels.Add(entity);
                await _context.SaveChangesAsync();
                return level.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<ChallengeLevelDto> EditLevel(ChallengeLevelDto level)
        {
            try
            {
                var entity = await _context.ChallengeLevels.SingleOrDefaultAsync(l => l.Id == level.Id);
                entity.QuestionText = level.QuestionText;
                entity.Difficulty = level.Difficulty;
                entity.Instructions = level.Instructions;
                entity.AnswerType = level.AnswerType;
                entity.Hint = level.Hint;
                entity.PossibleAnswers = level.PossibleAnswers;
                entity.Answers = level.Answers;
                entity.ChallengeId = level.ChallengeId;
                await _context.SaveChangesAsync();
                return level;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task DeleteLevel(int levelId)
        {
            try
            {
                var entity = await _context.ChallengeLevels.SingleOrDefaultAsync(l => l.Id == levelId);
                _context.ChallengeLevels.Remove(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
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
