using Newtonsoft.Json;
using StemExplorerData.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerData.Models.ViewModels
{
    public class LocationDto
    {
        [JsonProperty("uid")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string GooglePlaceId { get; set; }
        public string Address { get; set; }
        public LocationPositionDto Position { get; set; }
        public IEnumerable<LocationChallenge> LocationChallenges { get; set; }
        public string Link { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int ChallengeCount { get; set; }
        public bool Featured { get; set; }
    }

    public class LocationPositionDto
    {
        public double? Lat { get; set; }
        public double? Lng { get; set; }
    }

    public class LocationChallenge
    {
        public int ChallengeId { get; set; }
        public string ChallengeTitle { get; set; }
        public string ChallengeDescription { get; set; }
        public Enums.ChallengeCategories ChallengeCategory { get; set; }
        public IEnumerable<LocationLevelDto> ChallengeLevels { get; set; }
    }

    public class LocationLevelDto
    {
        [JsonIgnore]
        public int Id { get; set; }
        public Enums.ChallengeDifficulty Difficulty { get; set; }
        public bool Complete { get; set; }
    }
}
