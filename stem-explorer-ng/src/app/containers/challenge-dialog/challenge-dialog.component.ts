import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CameraComponent } from '../camera/camera.component';

import { ChallengesState } from '../../store/challenges/challenges.state';
import { LocationsState } from '../../store/locations/locations.state';
import { LoadChallengesData } from '../../store/challenges/challenges.actions';
import { LoadLocationsData } from '../../store/locations/locations.actions';

import { Challenge } from '../../shared/models/challenge';
import { Location } from '../../shared/models/location';

import { Categories } from '../../shared/enums/categories.enum';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';


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
export class ChallengeDialogComponent implements OnInit, OnDestroy {

  Categories: any = Categories;

  distance$: ReplaySubject<number>;
  distanceSubscription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private dialog: MatDialog,
    private geolocation: GeolocationService,
  ) { }

  ngOnInit()  {
    this.store.dispatch(new LoadChallengesData());
    this.store.dispatch(new LoadLocationsData());

    this.distance$ = new ReplaySubject();
    this.distanceSubscription = this.getDistance().subscribe(this.distance$);
  }

  ngOnDestroy() {
    this.distanceSubscription.unsubscribe();
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

  getDistance(): Observable<number> {
    return this.location$.pipe(
      switchMap((location) => this.geolocation.locationDistance(location))
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
