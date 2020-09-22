import { Component, OnInit } from '@angular/core';
import { FeaturedLocation } from 'src/app/shared/models/featured-location';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-featured-locations',
  templateUrl: './featured-locations.component.html',
  styleUrls: ['./featured-locations.component.scss']
})
export class FeaturedLocationsComponent implements OnInit {

  locations: FeaturedLocation[];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.api.getFeaturedLocations().subscribe((res) => {
      this.locations = res;
    });
  }

  visitWebsite(location: FeaturedLocation) {
    window.open(location.link, '_blank');
  }

}
