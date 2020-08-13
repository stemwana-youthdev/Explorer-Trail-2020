import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, from, ReplaySubject, Subscription, combineLatest, of } from 'rxjs';
import { map, startWith, switchMap, mergeAll, tap, scan } from 'rxjs/operators';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import { ChallengesState } from '../../store/challenges/challenges.state';
import { LocationsState } from 'src/app/store/locations/locations.state';
import { LoadChallengesData } from '../../store/challenges/challenges.actions';
import { LoadLocationsData } from '../../store/locations/locations.actions';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';

import { Challenge } from '../../shared/models/challenge';
import { Location } from '../../shared/models/location';

import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { ChallengeWithDistance } from 'src/app/components/challenge-list/challenge-list.component';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {
  @Select(ChallengesState.challenges) public challenges$: Observable<Challenge[]>;
  @Select(LocationsState.locations) public locations$: Observable<Location[]>;
  @Select(ChallengesState.challengeFilter) public filter$: Observable<number[]>;
  public challengesWithDistances$: ReplaySubject<ChallengeWithDistance[]>;

  distancesSubscription: Subscription;

  challenges: Challenge[] = [];
  locations: Location[] = [];
  Categories: any = Categories;
  filter = [0, 1, 2, 3];

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    private geolocation: GeolocationService,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadChallengesData());
    this.store.dispatch(new LoadLocationsData());
    this.store.dispatch(new VisitedHomepage());

    this.challengesWithDistances$ = new ReplaySubject(1);
    this.distancesSubscription = this.watchChallengesWithDistances().subscribe(this.challengesWithDistances$);
  }

  ngOnDestroy() {
    this.distancesSubscription.unsubscribe();
  }

  get sortedChallenges$(): Observable<Challenge[]> {
    return this.challenges$.pipe(
      startWith([]),
      map((challenges) => challenges.sort((a, b) => (a.title > b.title) ? 1 : -1)),
    );
  }

  watchChallengesWithDistances(): Observable<ChallengeWithDistance[]> {
    return combineLatest([this.challenges$, this.locations$]).pipe(
      switchMap(([challenges, locations]) => {
        if (challenges.length <= 0) {
          return of([]);
        }

        return this.watchLocations(locations).pipe(
          scan((acc, [locationId, distance]) => {
            const newChallenges = [...acc];
            const changedIndex = newChallenges.findIndex(
              (challenge) => challenge.locationId === locationId
            );
            const changedChallenge = newChallenges[changedIndex];
            const newChallenge = { ...changedChallenge, distance };
            newChallenges.splice(changedIndex, 1, newChallenge);
            return newChallenges;
          }, challenges as ChallengeWithDistance[]),
          startWith(challenges)
        );
      })
    );
  }

  watchLocations(locations: Location[]) {
    return from(locations.map((location) =>
      this.geolocation
        .locationDistance(location)
        .pipe(map((distance) => [location.uid, distance]))
    )).pipe(mergeAll());
  }

  onItemClick(challenge: Challenge) {
    this.openChallengeDialog(challenge);
    // push to dataLayer
    const gtmTag = {
      event: 'card click',
      challengeTitle: challenge.title,
  };
    this.gtmService.pushTag(gtmTag);
  }

  /*
  * Opens the dialog for the given challenge
  */
  private openChallengeDialog(challenge: Challenge) {
    this.dialog.open(ChallengeDialogComponent, {
      data: {
        challengeId: challenge.uid,
      },
      panelClass: 'app-dialog',
    });
  }

}
