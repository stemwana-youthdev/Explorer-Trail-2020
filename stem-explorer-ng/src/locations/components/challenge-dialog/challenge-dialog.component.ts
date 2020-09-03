import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CameraComponent } from 'src/app/shared/components/camera/camera.component';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { Location, LocationChallenge } from 'src/locations/models/location';

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
export class ChallengeDialogComponent implements OnInit {
  Categories: any = Categories;
  challenge: LocationChallenge;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private dialog: MatDialog,
  ) {
    this.challenge = this.data.challenge;
  }

  ngOnInit(): void  {
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
