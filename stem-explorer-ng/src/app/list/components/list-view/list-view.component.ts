import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';
import { WatchLocationDistances } from 'src/app/store/location-distances/location-distances.actions';
import { LocationDistance, LocationDistancesState } from 'src/app/store/location-distances/location-distances.state';
import { LocationsState } from 'src/app/store/locations/locations.state';
import { Challenge } from '../../../shared/models/challenge';
import { Location } from '../../../shared/models/location';
import { ChallengesState } from 'src/app/store/challenges/challenges.state';
import { LoadChallengesData } from 'src/app/store/challenges/challenges.actions';
import { LoadLocationsData } from 'src/app/store/locations/locations.actions';
import { ChallengeDialogComponent } from 'src/app/map/components/challenge-dialog/challenge-dialog.component';
import { Router } from '@angular/router';

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
    private router: Router
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

  navigateToMap() {
    this.router.navigateByUrl('/');
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
