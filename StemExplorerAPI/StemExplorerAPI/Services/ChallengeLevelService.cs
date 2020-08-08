﻿using Microsoft.EntityFrameworkCore;
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

        public async Task<ChallengeLevelsDto> GetLevels()
        {
            var levels = await _context.ChallengeLevels
                .Select(l => new ChallengeLevelDto
                {
                    Id = l.Id,
                    QuestionText = l.QuestionText,
                    Difficulty = l.Difficulty,
                    Instructions = l.Instructions,
                    AnswerType = l.AnswerType,
                    PossibleAnswers = l.Answers
                        .Select(a => new ChallengeAnswerDto
                        {
                            Id = a.Id,
                            AnswerText = a.AnswerText,
                            IsCorrect = a.IsCorrect,
                        }).ToList(),
                    ChallengeId = l.ChallengeId,
                    Hint = l.Hint,
                })
                .ToListAsync();
            return new ChallengeLevelsDto
            {
                ChallengeLevels = levels,
            };
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
                    Instructions = l.Instructions,
                    AnswerType = l.AnswerType,
                    PossibleAnswers = l.Answers
                        .Select(a => new ChallengeAnswerDto
                        {
                            Id = a.Id,
                            AnswerText = a.AnswerText,
                            IsCorrect = a.IsCorrect,
                        }).ToList(),
                    ChallengeId = l.ChallengeId,
                    Hint = l.Hint,
                })
                .ToListAsync();
            return new ChallengeLevelsDto
            {
                ChallengeLevels = levels,
            };
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