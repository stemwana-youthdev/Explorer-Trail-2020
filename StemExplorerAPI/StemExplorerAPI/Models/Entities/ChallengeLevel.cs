using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.Entities
{
    public class ChallengeLevel
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public Enums.ChallengeDifficulty Difficulty { get; set; }
        public string Instructions { get; set; }
        public Enums.AnswerType AnswerType { get; set; }
        public string Hint { get; set; }
        public string VideoEmbedUrl { get; set; }

        public List<string> PossibleAnswers { get; set; }
        public List<string> Answers { get; set; }

        // EF relationship definition
        public int ChallengeId { get; set; }
        public Challenge Challenge { get; set; }
    }
}
