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
    public class ChallengeService : IChallengeService
    {
        private readonly StemExplorerContext _context;
        public ChallengeService(StemExplorerContext context)
        {
            _context = context;
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
    }
}
