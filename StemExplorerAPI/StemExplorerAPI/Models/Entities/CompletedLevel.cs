using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.Entities
{
    public class CompletedLevel
    {
        public int Id { get; set; }

        // EF relationship definition
        public string UserId { get; set; }
        public User User { get; set; }

        // EF relationship definition
        public int ChallengeLevelId { get; set; }
        public ChallengeLevel ChallengeLevel { get; set; }
    }
}

