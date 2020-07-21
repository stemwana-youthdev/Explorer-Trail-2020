using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.Entities;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Models.ViewModels.Requests;
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
            return await _context.Challenges
                .AsNoTracking()
                .Select(c => new ChallengeDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Description = c.Description,
                    Category = c.Category,
                }).ToListAsync();
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
                        Category = challenge.Category
                    }).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<int> AddChallenge(ChallengeRequestDto challengeDto)
        {
            var challenge = new Challenge
            {
                LocationId = challengeDto.LocationId,
                Title = challengeDto.Title,
                Description = challengeDto.Description,
                Category = challengeDto.Category
            };

            _context.Challenges.Add(challenge);
            await _context.SaveChangesAsync();

            return challenge.Id;
        }

        public async Task EditChallenge(ChallengeDto challengeDto)
        {
            //TODO - check where this method is called from within the UI to determine what kind of Dto it should receive
            try
            {
                var entity = await _context.Challenges.SingleOrDefaultAsync(c => c.Id == challengeDto.Id);

                entity.Title = challengeDto.Title;
                entity.Description = challengeDto.Description;
                entity.Category = challengeDto.Category;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }

        }

        public async Task DeleteChallenge(ChallengeDto challengeDto)
        {
            //TODO - check where this method is called from within the UI to determine what kind of Dto it should receive
            try
            {
                var entity = await _context.Challenges.SingleOrDefaultAsync(c => c.Id == challengeDto.Id);

                _context.Remove(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }

        }
    }
}
