using StemExplorerData.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services.Interfaces
{
    public interface ILocationService
    {
        Task<List<LocationDto>> GetLocations(int? profileId);
        Task<LocationDto> GetLocationById(int locationId);
        Task<List<FeaturedLocationDto>> GetFeaturedLocations();
    }
}
