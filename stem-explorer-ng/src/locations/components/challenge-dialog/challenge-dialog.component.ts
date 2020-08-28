import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { CameraComponent } from 'src/app/containers/camera/camera.component';

import { Categories } from 'src/app/shared/enums/categories.enum';
import { LevelProgress } from '../challenge-progress/challenge-progress.component';
import { Location, LocationChallenge } from 'src/locations/models/location';


import { LoadProfiles } from 'src/app/store/profiles/profiles.actions';
import { ProgressState } from 'src/app/store/progress/progress.state';
import { ChallengeLevelsState } from 'src/app/store/challenge-levels/challenge-levels.state';
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
  profilesSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private dialog: MatDialog,
    private store: Store,
  ) {
    this.challenge = this.data.challenge;
  }

  ngOnInit(): void  {
    this.store.dispatch(new LoadProfiles());
  }

  ngOnDestroy(): void {
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
          complete: completedLevels.includes(level.uid),
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
    if (!navigator.geolocation) {
      this.viewOnMap();
    } else {
      let currentLocation;
      navigator.geolocation.getCurrentPosition((pos) => {
        currentLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      });
      (window as any).open('https://www.google.com/maps/dir/' + `${currentLocation}/` + `${this.data.location.name}`, '_blank');
    }
  }

  viewOnMap() {
    (window as any).open('https://www.google.com/maps/search/' + `${this.data.location.name}` + `/@${this.data.location.position.lat},${this.data.location.position.lng}`, '_blank');
  }
}
