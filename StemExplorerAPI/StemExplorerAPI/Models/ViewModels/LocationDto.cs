using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels
{
    public class LocationsDto
    {
        [JsonPropertyName("location")]
        public List<LocationDto> Locations { get; set; }
    }

    public class LocationDto
    {
        [JsonPropertyName("uid")]
        public int Id { get; set; }
        public string Name { get; set; }
        public LocationPositionDto Position { get; set; }
        [JsonPropertyName("challengetitle")]
        public string ChallengeTitle { get; set; }
        [JsonPropertyName("challengedescription")]
        public string ChallengeDescription { get; set; }
        [JsonPropertyName("challengecategory")]
        public Enums.ChallengeCategories ChallengeCategory { get; set; }
        public string Link { get; set; }
    }

    public class LocationPositionDto
    {
        [JsonPropertyName("lat")]
        public double Latitude { get; set; }
        [JsonPropertyName("lng")]
        public double Longitude { get; set; }
    }
}
