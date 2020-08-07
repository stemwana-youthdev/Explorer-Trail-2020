using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels
{
    public class ChallengeLevelsDto
    {
        public List<ChallengeLevelDto> ChallengeLevels { get; set; }
    }

    public class ChallengeLevelDto
    {
        [JsonPropertyName("uid")]
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public Enums.ChallengeLevel Difficulty { get; set; }
        public string Instructions { get; set; }
        public Enums.AnswerType AnswerType { get; set; }
        public List<ChallengeAnswerDto> PossibleAnswers { get; set; }
        public int ChallengeId { get; set; }
        public string Hint { get; set; }
    }
}
