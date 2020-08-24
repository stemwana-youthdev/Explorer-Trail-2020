using System.Collections.Generic;

namespace StemExplorerAPI.Models.ViewModels
{
    public class UserProgressDto
    {
        public string UserId { get; set; }
        public int ChallengeId { get; set; }
        public int ChallengeLevelId { get; set; }
        public int Attempts { get; set; }
        public bool Correct { get; set; }
    }

    public class CompletedLevelDto
    {
        public int LevelId { get; set; }
        public bool Correct { get; set; }
    }
}
