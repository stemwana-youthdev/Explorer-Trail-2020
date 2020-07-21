using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels.Requests
{
    public class ChallengeRequestDto
    {
        public int LocationId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Enums.ChallengeCategories Category { get; set; }
    }
}
