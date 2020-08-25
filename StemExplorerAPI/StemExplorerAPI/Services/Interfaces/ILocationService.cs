using StemExplorerAPI.Models.ViewModels;
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
    }
}
