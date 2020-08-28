using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.Entities
{
    public class Challenge
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Enums.ChallengeCategories Category { get; set; }
        
        // EF relationship definition
        public int LocationId { get; set; }
        public Location Location { get; set; }

        public List<ChallengeLevel> ChallengeLevels { get; set; }
    }
}
