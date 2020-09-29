using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models
{
    public class Enums
    {
        public enum ChallengeCategories
        {
            Science,
            Technology,
            Engineering,
            Mathematics
        }

        public enum ChallengeDifficulty
        {
            Easy,
            Medium,
            Hard,
            Expert
        }

        public enum AnswerType
        {
            Multichoice,
            Number,
            Text,
            Contains
        }
    }
}
