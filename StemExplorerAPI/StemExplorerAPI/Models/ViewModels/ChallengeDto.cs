using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels
{
    public class ChallengeDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Enums.ChallengeCategories Category { get; set; }
        public int LocationId { get; set; }
        public IEnumerable<LevelsForChallenge> ChallengeLevels { get; set; }
    }

    public class LevelsForChallenge
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Instructions { get; set; }
        public Enums.ChallengeDifficulty Difficulty { get; set; }
        public string Hint { get; set; }
        public Enums.AnswerType QuestionType { get; set; }
        public List<string> PossibleAnswers { get; set; }
        public List<string> Answer { get; set; }
    }
}
