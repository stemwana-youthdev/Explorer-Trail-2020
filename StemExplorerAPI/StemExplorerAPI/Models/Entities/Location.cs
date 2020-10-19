using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.Entities
{
    public class Location
    {
        public int LocationId { get; set; }
        public string Name { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string GooglePlaceId { get; set; }
        public string Url { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        // The following will be set to null if the location is not featured
        public bool Featured { get; set; }
        public string Address { get; set; }
        public string FeaturedImage { get; set; }
        public string FeaturedText { get; set; }
        public string OfferText { get; set; }
        public int Order { get; set; }

        // EF relationship definition
        public ICollection<Challenge> Challenges { get; set; }
    }
}
