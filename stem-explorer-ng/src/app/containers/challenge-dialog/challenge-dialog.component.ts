import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { CameraComponent } from '../camera/camera.component';

import { Challenge } from '../../shared/models/challenge';
import { Location } from '../../shared/models/location';

import { Categories } from '../../shared/enums/categories.enum';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { ChallengeDialogType } from 'src/app/shared/enums/challenge-dialog-type.enum';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';

export interface ChallengeDialogData {
  challenge: Challenge;
  location: Location;
  level: ChallengeLevel;
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
export class ChallengeDialogComponent implements OnInit, OnDestroy {

  Categories: any = Categories;
  DialogType: any = ChallengeDialogType;
  Level: any = Levels;

  distance$: ReplaySubject<number>;
  distanceSubscription: Subscription;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private dialog: MatDialog,
    private geolocation: GeolocationService,
  ) { }

  ngOnInit()  {
    if (this.data.dialogType === ChallengeDialogType.Preview) {
      this.distance$ = new ReplaySubject();
      this.distanceSubscription = this.getDistance().subscribe(this.distance$);
    }
  }

  ngOnDestroy() {
    this.distanceSubscription?.unsubscribe();
  }

  getDistance(): Observable<number> {
    return this.geolocation.locationDistance(this.data.location);
  }

  goToChallenge() {
    this.router.navigate(['challenge/' + this.data.challenge.uid]);
  }

  cameraView() {
    this.dialog.open(CameraComponent, {
      panelClass: 'fullscreen-dialog',
    });
  }

  mapDirections() {
    (window as any).open('https://www.google.com/maps/dir/' + `${this.geolocation}/` + `${this.data.location.name}`, '_blank');
  }
  viewOnMap() {
    (window as any).open('https://www.google.com/maps/search/' + `${this.data.location.name}` + `/@${this.data.location.position.lat},${this.data.location.position.lng}`, '_blank');
  }

}
