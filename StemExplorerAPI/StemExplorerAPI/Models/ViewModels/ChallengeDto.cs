using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels
{
    public class ChallengeDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Enums.ChallengeCategories Category { get; set; }
        public Location Location { get; set; }
        public List<ChallengeLevel> ChallengeLevels { get; set; }
    }
}
