import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { from, Observable, ReplaySubject, Subscription } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { ChallengeDialogType } from 'src/app/shared/enums/challenge-dialog-type.enum';
import { Location } from 'src/app/shared/models/location';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';
import { GeolocationService } from 'src/locations/services/geolocation.service';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;

  locations: Location[] = [];
  Categories: any = Categories;
  filter = [0, 1, 2, 3];

  distance$: ReplaySubject<number>;
  distancesSubscription: Subscription;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    private geolocation: GeolocationService,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
    this.store.dispatch(new VisitedHomepage());

    this.getLocations();

    // this.challengesWithDistances$ = new ReplaySubject(1);
    // this.distancesSubscription = this.watchChallengesWithDistances().subscribe(this.challengesWithDistances$);
  }

  ngOnDestroy() {
    this.distancesSubscription.unsubscribe();
  }

  // watchChallengesWithDistances(): Observable<any[]> {
  //   return combineLatest([this.challenges$, this.locations$]).pipe(
  //     switchMap(([challenges, locations]) => {
  //       if (challenges.length <= 0) {
  //         return of([]);
  //       }

  //       return this.watchLocations(locations).pipe(
  //         scan((acc, [locationId, distance]) => {
  //           const newChallenges = [...acc];
  //           const changedIndex = newChallenges.findIndex(
  //             (challenge) => challenge.locationId === locationId
  //           );
  //           const changedChallenge = newChallenges[changedIndex];
  //           const newChallenge = { ...changedChallenge, distance };
  //           newChallenges.splice(changedIndex, 1, newChallenge);
  //           return newChallenges;
  //         }, challenges as ChallengeWithDistance[]),
  //         startWith(challenges)
  //       );
  //     })
  //   );
  // }

  watchLocations(locations: Location[]) {
    return from(locations.map((location) =>
      this.geolocation
        .locationDistance(location)
        .pipe(map((distance) => [location.uid, distance]))
    )).pipe(mergeAll());
  }

  onItemClick(location: Location) {
    this.openChallengeDialog(location);
    // push to dataLayer
    const gtmTag = {
      event: 'card click',
      challengeTitle: location.challengeTitle,
  };
    this.gtmService.pushTag(gtmTag);
  }

  private getLocations(): void {
    this.store.select(LocationsState.locations).pipe(map(res => {
      this.locations = res;
    })).subscribe();
  }

  /*
  * Opens the dialog for the given challenge
  */
  private openChallengeDialog(location: Location): void {
    const getDistance = this.getLocationDistances(location);
    location = {
      ...location,
      distance: getDistance
    };
    console.warn(getDistance)
    this.dialog.open(ChallengeDialogComponent, {
      data: {
        location,
        dialogType: ChallengeDialogType.Preview,
      },
      panelClass: 'app-dialog',
    });
  }

  private getLocationDistances(location: Location): number {
    let distance;
    this.distancesSubscription = this.geolocation.locationDistance(location).pipe(
      map(res => distance = res)
    ).subscribe();
    return distance;
  }
}
