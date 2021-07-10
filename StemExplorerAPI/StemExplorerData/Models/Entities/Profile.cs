using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerData.Models.Entities
{
    public class Profile
    {
        public int Id { get; set; }
        public string UserId {get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public string Region { get; set; }
        public string HomeTown { get; set; }
        public string PhotoUrl { get; set; }
        public bool ProfileCompleted { get; set; }
    }
}

