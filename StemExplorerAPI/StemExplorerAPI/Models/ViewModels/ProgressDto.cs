using System.Collections.Generic;

namespace StemExplorerAPI.Models.ViewModels
{
    public class ProgressDto
    {
        public int ChallengeId { get; set; }
        public List<CompletedLevelDto> CompletedLevels { get; set; }
    }

    public class CompletedLevelDto
    {
        public string UserId { get; set; }
        public int ChallengeLevelId { get; set; }
    }
}
