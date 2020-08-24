using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.Entities
{
    public class UserProgress
    {
        public int Id { get; set; }
        public int Attempts { get; set; }
        public bool Correct { get; set; }

        // EF relationship definition
        // TODO: point to a profile when they are added
        public string UserId { get; set; }
        public User User { get; set; }

        // EF relationship definition
        public int ChallengeLevelId { get; set; }
        public ChallengeLevel ChallengeLevel { get; set; }
    }
}

