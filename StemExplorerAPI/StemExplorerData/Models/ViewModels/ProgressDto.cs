using System.Collections.Generic;

namespace StemExplorerData.Models.ViewModels
{
    public class ProgressDto
    {
        public int ProfileId { get; set; }
        public int ChallengeId { get; set; }
        public int ChallengeLevelId { get; set; }
        public int Attempts { get; set; }
        public bool Correct { get; set; }
    }

    public class CompletedLevelDto
    {
        public int ProfileId { get; set; }
        public int LevelId { get; set; }
        public bool Correct { get; set; }
    }
}
