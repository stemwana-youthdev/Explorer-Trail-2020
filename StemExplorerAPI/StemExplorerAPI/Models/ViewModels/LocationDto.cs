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
        [JsonPropertyName("challengeTitle")]
        public string ChallengeTitle { get; set; }
        [JsonPropertyName("challengeDescription")]
        public string ChallengeDescription { get; set; }
        [JsonPropertyName("category")]
        public Enums.ChallengeCategories ChallengeCategory { get; set; }
        public string Link { get; set; }
        [JsonPropertyName("challengeId")]
        public int ChallengeId { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }

    public class LocationPositionDto
    {
        [JsonPropertyName("lat")]
        public double Latitude { get; set; }
        [JsonPropertyName("lng")]
        public double Longitude { get; set; }
    }
}
