import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable, ReplaySubject, Subscription, combineLatest } from 'rxjs';

import { CameraComponent } from 'src/app/containers/camera/camera.component';

import { Categories } from 'src/app/shared/enums/categories.enum';
import { LevelProgress } from '../challenge-progress/challenge-progress.component';
import { Location, LocationChallenge } from 'src/locations/models/location';

import { GeolocationService } from 'src/locations/services/geolocation.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

import { LoadProfiles } from 'src/app/store/profiles/profiles.actions';
import { ProfilesState } from 'src/app/store/profiles/profiles.state';
import { LoadProgress } from 'src/app/store/progress/progress.actions';
import { ProgressState } from 'src/app/store/progress/progress.state';
import { ChallengeLevelsState } from 'src/app/store/challenge-levels/challenge-levels.state';
import { LoadChallengeLevelsData } from 'src/app/store/challenge-levels/challenge-levels.actions';
import { map } from 'rxjs/operators';

export interface ChallengeDialogData {
  challenge: LocationChallenge;
  location: Location;
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
  challenge: LocationChallenge;
  distance$: ReplaySubject<number>;
  distanceSubscription: Subscription;
  loggedInSubscription: Subscription;
  profilesSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private dialog: MatDialog,
    private geolocation: GeolocationService,
    private auth: AuthService,
    private store: Store,
  ) {
    this.challenge = this.data.challenge;
  }

  ngOnInit(): void  {
    this.distance$ = new ReplaySubject();
    // this.distanceSubscription = this.getDistance(this.location).subscribe(this.distance$);

    this.store.dispatch(new LoadChallengeLevelsData());
    this.loggedInSubscription = this.auth.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.store.dispatch(new LoadProfiles());
      }
    });
    this.profilesSubscription = this.store.select(ProfilesState.currentProfile).subscribe((profile) => {
      if (profile) {
        this.store.dispatch(new LoadProgress(profile.id));
      }
    });
  }

  ngOnDestroy(): void {
    this.distanceSubscription?.unsubscribe();
    this.loggedInSubscription?.unsubscribe();
    this.profilesSubscription?.unsubscribe();
  }

  get progress$(): Observable<LevelProgress[]> {
    return combineLatest([
      this.store.select(ChallengeLevelsState.challengeLevels),
      this.store.select(ProgressState.completedLevels),
    ]).pipe(
      map(([levels, completedLevels]) =>
        levels(this.challenge.challengeId).map((level) => ({
          difficulty: level.difficulty,
          complete: completedLevels.includes(level.id),
        }))
      )
    );
  }

  cameraView(): void {
    this.dialog.open(CameraComponent, {
      panelClass: 'fullscreen-dialog',
    });
  }

  mapDirections() {
    this.geolocation.getCurrentLocation();
    if (!navigator.geolocation) {
      this.viewOnMap();
    } else {
      (window as any).open('https://www.google.com/maps/dir/' + `${this.geolocation.currentLocation}/` + `${this.data.location.name}`, '_blank');
    }
  }

  viewOnMap() {
    (window as any).open('https://www.google.com/maps/search/' + `${this.data.location.name}` + `/@${this.data.location.position.lat},${this.data.location.position.lng}`, '_blank');
  }

  // private getDistance(location: Location): Observable<number> {
  //   return this.geolocation.locationDistance(location);
  // }
}
