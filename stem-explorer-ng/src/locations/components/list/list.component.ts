import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map, tap } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { Location } from 'src/app/shared/models/location';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { ReplaySubject, Subscription, Observable } from 'rxjs';
import { GeolocationService } from 'src/locations/services/geolocation.service';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _locations: Location[] = [];
  @Select(LocationsState.locationFilter) public filters$: Observable<number[]>;

  distance$: ReplaySubject<number>;
  distanceSubscription: Subscription;

  Categories: any = Categories;
  filter: number[];
  Colour = StemColours;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    private router: Router,
    private geolocation: GeolocationService
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
    this.loadLocations();

    this.filters$.pipe(tap(res => this.filter = res)).subscribe();
  }

  get locations(): Location[] {
    return this._locations;
  }

  /**
   * Go to map
   */
  navigateToMap(): void {
    this.router.navigate(['']);
  }

  /**
   * Open the dialog of the challenge info
   * @param location data object to send through to the dialog
   */
  openDialog(location: Location) {
    this.distance$ = new ReplaySubject();
    this.distanceSubscription = this.getDistance(location).subscribe(this.distance$);

    this.distance$.pipe(tap(distance => {
      location.distance = distance;
    }));

    this.dialog.open(ChallengeDialogComponent, {
      data: {
        location,
      },
      panelClass: 'app-dialog',
    });
    // push to dataLayer
    this.gtmTag(location.challengeTitle);
  }

  /**
   * loads all the locations
   */
  private loadLocations(): void {
    /**
     * @todo sort alphabetically
     */
    this.store.select(LocationsState.locations).pipe(map(res => {
      this._locations = res;
    })).subscribe();
  }

  getDistance(location: Location): Observable<number> {
    return this.geolocation.locationDistance(location);
  }

  /**
   * google tag manager logging
   * @param title challenge title
   */
  private gtmTag(title: string): void {
    const tag = {
      event: 'card click',
      challengeTitle: title,
    };
    this.gtmService.pushTag(tag);
  }
}
