import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CameraComponent } from '../camera/camera.component';

import { ChallengesState } from '../../store/challenges/challenges.state';
import { LocationsState } from '../../store/locations/locations.state';
import { LoadChallengesData } from '../../store/challenges/challenges.actions';
import { LoadLocationsData } from '../../store/locations/locations.actions';
import { WatchLocationDistances } from '../../store/location-distances/location-distances.actions';
import { LocationDistancesState } from 'src/app/store/location-distances/location-distances.state';
import { LoadChallengeLevelsData } from 'src/app/store/challenge-levels/challenge-levels.actions';

import { Challenge } from '../../shared/models/challenge';
import { Location } from '../../shared/models/location';

import { Categories } from '../../shared/enums/categories.enum';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { ChallengeLevelsState } from 'src/app/store/challenge-levels/challenge-levels.state';


export enum ChallengeDialogType {
  Preview,
  Hint
}

export interface ChallengeDialogData {
  challengeId: number;
  level: Levels;
  dialogType: ChallengeDialogType;
}

/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-challenge-dialog',
  templateUrl: './challenge-dialog.component.html',
  styleUrls: ['./challenge-dialog.component.scss'],
})
export class ChallengeDialogComponent implements OnInit {
  Categories: any = Categories;
  DialogType: any = ChallengeDialogType;
  Level: any = Levels;

  constructor(
    private store: Store,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private dialog: MatDialog,
  ) {
    this.data.dialogType = this.data.dialogType ?? ChallengeDialogType.Preview;
  }

  ngOnInit() {
    this.store.dispatch(new LoadChallengesData());
    this.store.dispatch(new LoadLocationsData());
    if (this.data.dialogType === ChallengeDialogType.Preview) {
      this.store.dispatch(new WatchLocationDistances());
    }
    this.store.dispatch(new LoadChallengeLevelsData());
  }

  get challenge$(): Observable<Challenge> {
    return this.store.select(ChallengesState.challenge).pipe(
      map((fn) => fn(this.data.challengeId)),
    );
  }

  get category$(): Observable<Categories> {
    return this.challenge$.pipe(
      map((challenge) => challenge?.category),
    );
  }

  get challengeLevel$(): Observable<ChallengeLevel> {
    return this.store.select(ChallengeLevelsState.challengeLevels).pipe(
      map((fn) => fn(this.data.challengeId)),
      map((levels) =>
        levels.find((level) => level.difficulty === this.data.level)
      ),
    );
  }

  get location$(): Observable<Location> {
    return this.store.select(LocationsState.challengeLocation).pipe(
      map((fn) => fn(this.data.challengeId)),
    );
  }

  get locationDistance$(): Observable<number> {
    return this.location$.pipe(
      switchMap((location) =>
        this.store
          .select(LocationDistancesState.locationDistance)
          .pipe(map((fn) => fn(location.uid)))
      )
    );
  }

  get loaded$(): Observable<boolean> {
    return combineLatest([
      this.challenge$,
      this.location$,
    ]).pipe(
      map(([challenge, location]) => Boolean(challenge && location)),
    );
  }

  goToChallenge() {
    this.router.navigate(['challenge/' + this.data.challengeId]);
  }

  cameraView() {
    this.dialog.open(CameraComponent, {
      panelClass: 'fullscreen-dialog',
    });
  }
}
