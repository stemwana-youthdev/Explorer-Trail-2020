import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { Location } from '../../../shared/models/location';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
    private router: Router,
    private gtmService: GoogleTagManagerService
  ) {
    this.location = this.data.location;
  }

  ngOnInit()  {
    this.getLocationDistance();
  }

  get locationDistance(): number {
    return this._locationDistance;
  }

  /**
   * @todo get location distance!
   */
  getLocationDistance() {
    this._locationDistance = 1;
  }

  scanCode() {
    this.gtmTag();
    this.router.navigate(['scan-code']);
  }

  private gtmTag(): void {
    const tag = {
      event: 'map challenge scan QR code',
      challengeTitle: this.location.challengetitle
    };
    this.gtmService.pushTag(tag);
  }
}
