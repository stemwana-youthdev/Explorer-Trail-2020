import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { ChallengeDialogType } from 'src/app/shared/enums/challenge-dialog-type.enum';
import { GeolocationService } from 'src/locations/services/geolocation.service';
import { CameraComponent } from 'src/app/containers/camera/camera.component';
import { Location } from 'src/app/shared/models/location';
import { Categories } from 'src/app/shared/enums/categories.enum';

export interface ChallengeDialogData {
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

  location: Location;

  // distance$: ReplaySubject<number>;
  // distanceSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private dialog: MatDialog,
    private geolocation: GeolocationService,
  ) {
    this.location = this.data.location;
  }

  ngOnInit()  {
    // if (this.data.dialogType === ChallengeDialogType.Preview) {
    //   this.distance$ = new ReplaySubject();
    //   this.distanceSubscription = this.getDistance().subscribe(this.distance$);
    // }
  }

  ngOnDestroy() {
    // this.distanceSubscription?.unsubscribe();
  }

  // getDistance(): Observable<number> {
  //   return this.geolocation.locationDistance(this.data.location);
  // }

  cameraView() {
    this.dialog.open(CameraComponent, {
      panelClass: 'fullscreen-dialog',
    });
  }

  mapDirections() {
    (window as any).open('https://www.google.com/maps/search/' + `${this.data.location.name}` + `/@${this.data.location.position.lat},${this.data.location.position.lng}`, '_blank');
  }

}
