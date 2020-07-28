import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { LocationDistancesState } from 'src/app/store/location-distances/location-distances.state';

@Component({
  selector: 'app-challenge-distance',
  templateUrl: './challenge-distance.component.html',
  styleUrls: ['./challenge-distance.component.scss'],
})
export class ChallengeDistanceComponent {
  @Input() locationId: number;

  constructor(
    private store: Store,
  ) {}

  get locationDistance$() {
    return this.store
      .select(LocationDistancesState.locationDistance)
      .pipe(map((fn) => fn(this.locationId)));
  }

  get distanceText() {
    return this.locationDistance$.pipe(
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
