using Newtonsoft.Json;
using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels
{
    public class ChallengeLevelDto
    {
        [JsonProperty("uid")]
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public Enums.ChallengeDifficulty Difficulty { get; set; }
        public string Instructions { get; set; }
        public Enums.AnswerType AnswerType { get; set; }
        public List<string> PossibleAnswers { get; set; }
        public List<string> Answers { get; set; }
        public int ChallengeId { get; set; }
        public string Hint { get; set; }
    }
}
