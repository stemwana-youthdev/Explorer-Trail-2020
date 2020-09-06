using Newtonsoft.Json;
using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels
{
    public class ExternalContentDto
    {
        [JsonProperty("uid")]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public int Order { get; set; }
    }
}
