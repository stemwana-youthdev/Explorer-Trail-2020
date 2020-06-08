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
        public string Url { get; set; }

        // EF relationship definition
        public ICollection<Challenge> Challenges { get; set; }
    }
}
