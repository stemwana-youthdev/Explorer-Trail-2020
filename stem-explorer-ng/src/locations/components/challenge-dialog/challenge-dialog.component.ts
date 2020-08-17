import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { Location } from 'src/app/shared/models/location';

interface ChallengeDialogData {
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
  location: Location;
  // tslint:disable-next-line: variable-name
  _locationDistance: number;
  Colour = StemColours;

  // distance$: ReplaySubject<number>;
  // distanceSubscription: Subscription;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private router: Router,
    private gtmService: GoogleTagManagerService
  ) {
    this.location = this.data.location;
  }

  ngOnInit()  {
    this.getLocationDistance();

    // if (this.data.dialogType === ChallengeDialogType.Preview) {
    //   this.distance$ = new ReplaySubject();
    //   this.distanceSubscription = this.getDistance().subscribe(this.distance$);
    // }

  }

  // ngOnDestroy() {
  //   this.distanceSubscription?.unsubscribe();
  // }

  get locationDistance(): number {
    return this._locationDistance;
  }

  /**
   * @todo get location distance!
   */
  getLocationDistance() {
    this._locationDistance = 1;

    // return this.geolocation.locationDistance(this.data.location);
  }

  scanCode() {
    this.gtmTag();
    this.router.navigate(['scan-code']);
  }

  private gtmTag(): void {
    const tag = {
      event: 'map challenge scan QR code',
      challengeTitle: this.location.challengeTitle
    };
    this.gtmService.pushTag(tag);
  }
}
