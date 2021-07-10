using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerData.Models.ViewModels.Requests
{
	public class LocationRequestDto
	{
		public string Name { get; set; }
		public string GooglePlaceId { get; set; }
		public double? Longitude { get; set; }
		public double? Latitude { get; set; }
		public string Url { get; set; }
	}
}
