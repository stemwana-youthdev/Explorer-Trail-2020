import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ChallengesState } from '../../store/challenges/challenges.state';
import { LoadChallengesData } from '../../store/challenges/challenges.actions';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';

import { Challenge } from '../../shared/models/challenge';

import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';

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

  constructor(
    private store: Store,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadChallengesData());
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
