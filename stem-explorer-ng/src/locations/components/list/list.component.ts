import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';
import { Location, LocationChallenge } from 'src/locations/models/location';
import { GeolocationService } from 'src/locations/services/geolocation.service';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';
import { LargeCategoryIcons } from 'src/app/shared/enums/large-category-icons.enum';
import { Filter } from 'src/locations/models/filter';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  locations: Location[] = [];
  Categories: any = Categories;
  CategoryIcons: any = LargeCategoryIcons;
  filter: Filter;
  userLocation: google.maps.LatLngLiteral;
  distances: number[] = [];

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private gtmService: GoogleTagManagerService,
    private geolocation: GeolocationService,
  ) {
    this.geolocation.getPosition().then(pos => {
      if (pos) {
        this.userLocation = {
          lat: pos.lat,
          lng: pos.lng
        };
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
    this.store.dispatch(new VisitedHomepage());

    this.getLocations();
  }

  trackLocations(_: number, item: Location) {
    return item?.uid;
  }

  trackChallenges(_: number, item: LocationChallenge) {
    return item?.challengeId;
  }

  filterChanged(filter: Filter) {
    this.filter = filter;
  }

  /**
   * Method that opens the challenge dialog
   * @param location location data object
   * @param challenge data object of the challenge
   */
  openInfo(location: Location, challenge: LocationChallenge): void {
    this.dialog.open(ChallengeDialogComponent, {
      data: { location, challenge },
      panelClass: 'app-dialog',
    });
    // push to dataLayer
    this.addGtmTag(challenge.challengeTitle);
  }

  /**
   * @param location location data object
   */
  getLocationDistance(location: Location) {
    // Don't get the distance more than once
    if (this.distances[location.uid] === undefined) {
      this.distances[location.uid] = null;
      // Don't use this.userLocation because it may not be set when this method is called
      this.geolocation.getPosition().then((userLocation) => {
        const res = this.geolocation.getDistance(
          location.position,
          userLocation
        );
        // This is required to have angular detect that the array has changed.
        const newDistances = Array.from(this.distances);
        newDistances[location.uid] = res;
        this.distances = newDistances;
      });
    }
  }

  /**
   * Gets all locations
   */
  private getLocations(): void {
    this.store.select(LocationsState.locations).pipe(map(res => {
      this.locations = res;
      for (const location of res) {
        this.getLocationDistance(location);
      }
    })).subscribe();
  }

  /**
   * add tag to GTM on the card click
   * @param title challenge title
   */
  private addGtmTag(title: string): void {
    const gtmTag = {
      event: 'card click',
      challengeTitle: title,
    };
    this.gtmService.pushTag(gtmTag);
  }
}
