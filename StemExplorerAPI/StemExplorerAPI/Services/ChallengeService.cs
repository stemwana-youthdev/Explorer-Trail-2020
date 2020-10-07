using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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

                if (profileId is int uid)
                {
                    var progress = await _progressService.GetProgress(uid);

                    foreach (var challenge in challenges)
                    {
                        foreach (var level in challenge.ChallengeLevels)
                        {
                            level.Complete = progress.FirstOrDefault(p => p.ChallengeLevelId == level.Id)?.Correct ?? false;
                        }
                    }
                }

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
                            VideoEmbedUrl = cl.VideoEmbedUrl,
                        }).OrderBy(l => l.Difficulty).ToList()
                    }).SingleOrDefaultAsync();

                if (profileId is int uid && challenge != null)
                {
                    var progress = await _progressService.GetProgress(uid);

                    foreach (var level in challenge.ChallengeLevels)
                    {
                        level.Complete = progress.FirstOrDefault(p => p.ChallengeLevelId == level.Id)?.Correct ?? false;
                    }
                }

                if (challenge != null)
                {
                    foreach (var level in challenge.ChallengeLevels)
                    {
                        if (level.VideoEmbedUrl == null)
                        {
                            level.VideoEmbedUrl = InferVideo(level);
                        }
                    }
                }

                return challenge;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        private string InferVideo(LevelsForChallenge level)
            => InferVideo(level.Instructions) ?? InferVideo(level.Hint);
        private string InferVideo(string text)
        {
            var youtubeUrl = new Regex(@"(youtube.com\/watch\?v=|youtu.be\/)([^ ]{11})", RegexOptions.Compiled);
            var match = youtubeUrl.Match(text);
            if (!match.Success)
            {
                return null;
            }
            var videoId = match.Groups[2];
            return $"https://www.youtube-nocookie.com/embed/{videoId}";
        }
    }
}
