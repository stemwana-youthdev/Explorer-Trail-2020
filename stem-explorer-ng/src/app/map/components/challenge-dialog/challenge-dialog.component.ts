import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CameraComponent } from 'src/app/shared/camera/camera.component';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { LoadChallengesData } from 'src/app/store/challenges/challenges.actions';
import { ChallengesState } from 'src/app/store/challenges/challenges.state';
import { WatchLocationDistances } from 'src/app/store/location-distances/location-distances.actions';
import { LocationDistancesState } from 'src/app/store/location-distances/location-distances.state';
import { LoadLocationsData } from 'src/app/store/locations/locations.actions';
import { LocationsState } from 'src/app/store/locations/locations.state';
import { Challenge } from '../../../shared/models/challenge';
import { Location } from '../../../shared/models/location';

interface ChallengeDialogData {
  challengeId: number;
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

  constructor(
    private store: Store,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private dialog: MatDialog,
  ) { }

  ngOnInit()  {
    this.store.dispatch(new LoadChallengesData());
    this.store.dispatch(new LoadLocationsData());
    this.store.dispatch(new WatchLocationDistances());
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
