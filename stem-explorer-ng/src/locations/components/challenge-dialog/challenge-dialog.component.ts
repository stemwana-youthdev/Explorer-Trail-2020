import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { CameraComponent } from 'src/app/containers/camera/camera.component';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { Location, LocationChallenge } from 'src/locations/models/location';
import { GeolocationService } from 'src/locations/services/geolocation.service';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private dialog: MatDialog,
    private geolocation: GeolocationService,
  ) {
    this.challenge = this.data.challenge;
  }

  ngOnInit(): void  {
    this.distance$ = new ReplaySubject();
    // this.distanceSubscription = this.getDistance(this.location).subscribe(this.distance$);
  }

  ngOnDestroy(): void {
    this.distanceSubscription?.unsubscribe();
  }

  cameraView(): void {
    this.dialog.open(CameraComponent, {
      panelClass: 'fullscreen-dialog',
    });
  }

  mapDirections(): void {
    window.open('https://www.google.com/maps/search/' + `${this.data.location.name}` + `/@${this.data.location.position.lat},${this.data.location.position.lng}`, '_blank');
  }

  private getDistance(location: Location): Observable<number> {
    return this.geolocation.locationDistance(location);
  }
}
