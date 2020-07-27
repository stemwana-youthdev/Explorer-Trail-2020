import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ChallengesState } from '../../store/challenges/challenges.state';
import { LocationsState } from '../../store/locations/locations.state';
import { LoadLocationsData } from '../../store/locations/locations.actions';

import { Location } from '../../shared/models/location';

import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';
import { InfoLocationClickEvent, ChallengeMapComponent } from '../../components/challenge-map/challenge-map.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Select(LocationsState.locations) public locations$: Observable<Location[]>;
  @Select(ChallengesState.challengeFilter) public filter$: Observable<number[]>;

  // added a dependency injection in order to use the getLocations method without creating an instance of the object
  constructor(
    private store: Store,
    private dialog: MatDialog,
    private geolocation: GeolocationService
  ) {}

  zoom = 15;
  center: google.maps.LatLngLiteral;
  geolocationSubscription: Subscription;

  // local property to store the json data from getLocations
  location: Location[] = [];

  filter = [0, 1, 2, 3];

  // separate property for the information for the map pop up
  infoLocation = null as Location;

  @ViewChild(ChallengeMapComponent, { static: false }) challengeMap: ChallengeMapComponent;

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
  }

  onChallengeLocationClick(location: Location) {
    this.openChallengeDialog(location);
  }

  onInfoLocationClick({ location, marker }: InfoLocationClickEvent) {
    this.infoLocation = location;
    this.challengeMap.openInfoLocation(marker);
  }

  private openChallengeDialog(location: Location) {
    this.dialog.open(ChallengeDialogComponent, {
      data: {
        challengeId: location.challengeid,
      },
      panelClass: 'app-dialog',
    });
  }
}
