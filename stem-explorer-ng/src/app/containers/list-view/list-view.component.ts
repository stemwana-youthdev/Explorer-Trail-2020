import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ApiService } from '../../shared/services/api.service';
import { ChallengesState } from '../../store/challenges/challenges.state';
import { LoadChallengesData, FilterChallenges } from '../../store/challenges/challenges.actions';

import { Challenge } from '../../shared/models/challenge';
import { Location } from '../../shared/models/location';

import { ListViewDialogComponent } from '../../components/list-view-dialog/list-view-dialog.component';

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

  locations: Location[] = [];

  constructor(
    private service: ApiService,
    private store: Store,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadChallengesData());
    this.getLocations();
  }

  get sortedChallenges$(): Observable<Challenge[]> {
    return this.challenges$.pipe(
      startWith([]),
      map((challenges) => challenges.sort((a, b) => (a.title > b.title) ? 1 : -1)),
    );
  }

  /*
  * Gets an array of locations from the API service
  */
  getLocations() {
    this.service.getLocations().subscribe((res) => {
      this.locations = res.location;
    });
  }

  onFilter(filter: number[]) {
    this.store.dispatch(new FilterChallenges(filter));
  }

  /*
  * Opens the dialog for the given challenge
  */
  openDialog(challenge: Challenge) {
    const location: Location | undefined = this.locations.find(l => l.uid === challenge.uid);
    this.dialog.open(ListViewDialogComponent, {
      data: {
        challenge,
        name: location?.name,
        link: location?.link
      },
      panelClass: 'app-dialog',
    });
  }

}
