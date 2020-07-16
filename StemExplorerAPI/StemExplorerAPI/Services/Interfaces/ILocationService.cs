using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Models.ViewModels.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface ILocationService
    {
        Task<List<LocationDto>> GetLocations();
        Task<LocationDto> GetLocationById(int locationId);
        Task<int> AddLocation(LocationRequestDto locationDto);
        Task EditLocation(LocationDto locationDto);
        Task DeleteLocation(LocationDto locationDto);
    }
}
