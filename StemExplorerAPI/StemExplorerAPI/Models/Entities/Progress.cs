using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.Entities
{
    public class Progress
    {
        public int Id { get; set; }
        public int Attempts { get; set; }
        public bool Correct { get; set; }

        // EF relationship definition
        public int ProfileId { get; set; }
        public Profile Profile { get; set; }

        // EF relationship definition
        public int ChallengeLevelId { get; set; }
        public ChallengeLevel ChallengeLevel { get; set; }
    }
}

