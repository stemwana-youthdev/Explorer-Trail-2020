using System.ComponentModel.DataAnnotations;

namespace StemExplorerAPI.Models.Entities
{
    public class Admin
    {
        // The email associated with their Google Account
        [Key]
        public string Email { get; set; }
    }
}
