import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
import { WatchLocationDistances } from 'src/app/store/location-distances/location-distances.actions';
import { LocationDistance, LocationDistancesState } from 'src/app/store/location-distances/location-distances.state';
import { ChallengeDialogType } from 'src/app/shared/enums/challenge-dialog-type.enum';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Select(ChallengesState.challenges) public challenges$: Observable<Challenge[]>;
  @Select(ChallengesState.challengeFilter) public filter$: Observable<number[]>;
  @Select(LocationsState.locations) public locations$: Observable<Location[]>;
  @Select(LocationDistancesState.locationDistances) public locationDistances$: Observable<LocationDistance[]>;

  challenges: Challenge[] = [];
  locations: Location[] = [];
  Categories: any = Categories;
  filter = [0, 1, 2, 3];

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadChallengesData());
    this.store.dispatch(new LoadLocationsData());
    this.store.dispatch(new WatchLocationDistances());
    this.store.dispatch(new VisitedHomepage());
  }

  get sortedChallenges$(): Observable<Challenge[]> {
    return this.challenges$.pipe(
      startWith([]),
      map((challenges) => challenges.sort((a, b) => (a.title > b.title) ? 1 : -1)),
    );
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
        dialogType: ChallengeDialogType.Preview,
      },
      panelClass: 'app-dialog',
    });
  }

}
