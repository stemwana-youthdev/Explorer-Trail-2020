import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { MapIcons } from 'src/app/shared/enums/map-icons.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { Location } from 'src/app/shared/models/location';
import { ChallengeDialogComponent } from 'src/app/shared/components/challenge-dialog/challenge-dialog.component';
import { LocationsState } from 'src/locations/store/locations.state';

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

  Categories: any = Categories;
  filter = [0, 1, 2, 3];
  Colour = StemColours;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
    this.loadLocations();
  }

  get locations(): Location[] {
    return this._locations;
  }

  navigateToMap(): void {
    this.router.navigateByUrl('/');
  }

  getMapMarker(category: Categories): string {
    return `/assets/icons/${MapIcons[category]}`;
  }

  openDialog(location: Location) {
    this.dialog.open(ChallengeDialogComponent, {
      data: {
        location,
      },
      panelClass: 'app-dialog',
    });
    // push to dataLayer
    this.gtmTag(location.challengeTitle);
  }

  private loadLocations(): void {
    /**
     * @todo sort alphabetically
     */
    this.store.select(LocationsState.locations).pipe(map(res => {
      this._locations = res;
    })).subscribe();
  }

  private gtmTag(title: string): void {
    const tag = {
      event: 'card click',
      challengeTitle: title,
    };
    this.gtmService.pushTag(tag);
  }
}

// export class ListViewComponent implements OnInit, OnDestroy {
//   public challengesWithDistances$: ReplaySubject<ChallengeWithDistance[]>;

//   distancesSubscription: Subscription;

//   ngOnInit() {

//     this.challengesWithDistances$ = new ReplaySubject(1);
//     this.distancesSubscription = this.watchChallengesWithDistances().subscribe(this.challengesWithDistances$);
//   }

//   ngOnDestroy() {
//     this.distancesSubscription.unsubscribe();
//   }

//   watchChallengesWithDistances(): Observable<ChallengeWithDistance[]> {
//     return combineLatest([this.challenges$, this.locations$]).pipe(
//       switchMap(([challenges, locations]) => {
//         if (challenges.length <= 0) {
//           return of([]);
//         }

//         return this.watchLocations(locations).pipe(
//           scan((acc, [locationId, distance]) => {
//             const newChallenges = [...acc];
//             const changedIndex = newChallenges.findIndex(
//               (challenge) => challenge.locationId === locationId
//             );
//             const changedChallenge = newChallenges[changedIndex];
//             const newChallenge = { ...changedChallenge, distance };
//             newChallenges.splice(changedIndex, 1, newChallenge);
//             return newChallenges;
//           }, challenges as ChallengeWithDistance[]),
//           startWith(challenges)
//         );
//       })
//     );
//   }

//   watchLocations(locations: Location[]) {
//     return from(locations.map((location) =>
//       this.geolocation
//         .locationDistance(location)
//         .pipe(map((distance) => [location.uid, distance]))
//     )).pipe(mergeAll());
//   }
// }

