using StemExplorerData.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerService.Services.Interfaces
{
    public interface IExternalContentService
    {
        Task<List<ExternalContentDto>> GetContent();
        Task InsertContent(ExternalContentDto newContent);
        Task UpdateContent(int id, ExternalContentDto newContent);
        Task DeleteContent(int id);
    }
}
