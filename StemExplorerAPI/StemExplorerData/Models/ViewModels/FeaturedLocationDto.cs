using Newtonsoft.Json;
using StemExplorerData.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerData.Models.ViewModels
{
    public class FeaturedLocationDto
    {
        [JsonProperty("uid")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string GooglePlaceId { get; set; }
        public LocationPositionDto Position { get; set; }
        public string Link { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public bool Featured { get; set; }
        public string Address { get; set; }
        public string FeaturedImage { get; set; }
        public string FeaturedText { get; set; }
        public string OfferText { get; set; }
        public int Order { get; set; }
    }
}
