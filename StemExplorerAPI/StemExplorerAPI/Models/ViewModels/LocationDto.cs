using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels
{
    public class LocationDto
    {
        [JsonPropertyName("uid")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string GooglePlaceId { get; set; }
        public LocationPositionDto Position { get; set; }
        public IEnumerable<LocationChallenges> LocationChallenges { get; set; }
        public string Link { get; set; }
    }

    public class LocationPositionDto
    {
        [JsonPropertyName("lat")]
        public double? Lat { get; set; }
        [JsonPropertyName("lng")]
        public double? Lng { get; set; }
    }

    public class LocationChallenges
    {
        [JsonPropertyName("challengeid")]
        public int ChallengeId { get; set; }
        [JsonPropertyName("challengetitle")]
        public string ChallengeTitle { get; set; }
        [JsonPropertyName("challengedescription")]
        public string ChallengeDescription { get; set; }
        [JsonPropertyName("category")]
        public Enums.ChallengeCategories ChallengeCategory { get; set; }
    }
}
