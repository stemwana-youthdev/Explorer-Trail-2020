using Microsoft.EntityFrameworkCore;
using StemExplorerData.Models;
using StemExplorerData.Models.Entities;
using StemExplorerData.Models.ViewModels;
using StemExplorerService.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerService.Services
{
    public class ExternalContentService : IExternalContentService
    {
        private readonly StemExplorerContext _context;
        public ExternalContentService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<List<ExternalContentDto>> GetContent()
        {
            return await _context.ExternalContent.Select(c => new ExternalContentDto
            {
                Id = c.Id,
                Title = c.Title,
                Url = c.Url,
                Order = c.Order,
            }).OrderBy(c => c.Order).ToListAsync();
        }

        public async Task InsertContent(ExternalContentDto newContent)
        {
            _context.ExternalContent.Add(new ExternalContent
            {
                Title = newContent.Title,
                Url = newContent.Url,
                Order = newContent.Order,
            });
            await _context.SaveChangesAsync();
        }

        public async Task UpdateContent(int id, ExternalContentDto newContent)
        {
            var content = await _context.ExternalContent.SingleAsync(c => c.Id == id);
            content.Title = newContent.Title;
            content.Url = newContent.Url;
            content.Order = newContent.Order;
            await _context.SaveChangesAsync();
        }
        
        public async Task DeleteContent(int id)
        {
            var content = await _context.ExternalContent.SingleAsync(c => c.Id == id);
            _context.ExternalContent.Remove(content);
            await _context.SaveChangesAsync();
        }
    }
}
