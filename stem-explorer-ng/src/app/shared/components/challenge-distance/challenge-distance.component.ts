import { Component, Input } from '@angular/core';
import { GeolocationService, LatLng } from '../../services/geolocation.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-challenge-distance',
  templateUrl: './challenge-distance.component.html',
  styleUrls: ['./challenge-distance.component.scss'],
})
export class ChallengeDistanceComponent {
  @Input() position: LatLng;

  constructor(
    private geolocation: GeolocationService,
  ) {}

  get distanceText() {
    return this.geolocation.distanceTo(this.position).pipe(
      map((distance) => {
        if (distance >= 1000) {
          return `${(distance / 1000).toFixed(1)}km`;
        } else {
          return `${distance.toFixed(0)}m`;
        }
      })
    );
  }
}
