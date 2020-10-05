using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels.Requests
{
	public class ProfileRequestDto
	{
    public string UserId {get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Region { get; set; }
    public string HomeTown { get; set; }
    public string PhotoUrl { get; set; }
    public bool ProfileCompleted { get; set; }
	}
}
