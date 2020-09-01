import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { Location, LocationChallenge } from 'src/locations/models/location';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';
import { GeolocationService } from 'src/locations/services/geolocation.service';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';
import { LoadProfiles } from 'src/app/store/profiles/profiles.actions';
import { Router } from '@angular/router';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;
  locations: Location[] = [];
  Categories: any = Categories;
  filter: number[] = [];
  userLocation: google.maps.LatLngLiteral;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private gtmService: GoogleTagManagerService,
    private geolocation: GeolocationService,
    private router: Router
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
    this.store.dispatch(new LoadProfiles());

    this.getLocations();
    this.filter$.pipe(map(res => this.filter = res)).subscribe();
  }

  trackLocations(idx, item) {
    if (!item) { return null; }
    return idx;
  }

  trackChallenges(idx, item) {
    if (!item) { return null; }
    return idx;
  }

  navigateToMap() {
    this.router.navigateByUrl('/');
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
   * @todo finish this to show distance to location in the list. Currently polling too much.
   * @param location location data object
   */
  getLocationDistance(location: Location): string {
    const distance = '';
    // if (this.userLocation) {
    //   this.geolocation.getDistance(location.position, this.userLocation).pipe(
    //     map(res => distance = res)
    //   ).subscribe();
    // }
    return distance;
  }

  /**
   * Gets all locations
   */
  private getLocations(): void {
    this.store.select(LocationsState.locations).pipe(map(res => {
      this.locations = res;
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
