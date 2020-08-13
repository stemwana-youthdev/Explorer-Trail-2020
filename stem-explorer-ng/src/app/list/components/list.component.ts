import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { MapIcons } from 'src/app/shared/enums/map-icons.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { LoadLocationsData } from 'src/app/store/locations/locations.actions';
import { LocationsState } from 'src/app/store/locations/locations.state';
import { Location } from '../../shared/models/location';
import { ChallengeDialogComponent } from 'src/app/map/components/challenge-dialog/challenge-dialog.component';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _locations: Location[] = [];

  Categories: any = Categories;
  filter = [0, 1, 2, 3];
  Colour = StemColours;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
    this.loadLocations();
  }

  get locations(): Location[] {
    return this._locations;
  }

  navigateToMap(): void {
    this.router.navigateByUrl('/');
  }

  getMapMarker(category: Categories): string {
    return `/assets/icons/${MapIcons[category]}`;
  }

  openDialog(location: Location) {
    this.dialog.open(ChallengeDialogComponent, {
      data: {
        location,
      },
      panelClass: 'app-dialog',
    });
    // push to dataLayer
    this.gtmTag(location.challengetitle);
  }

  private loadLocations(): void {
    /**
     * @todo sort alphabetically
     */
    this.store.select(LocationsState.locations).pipe(map(res => {
      this._locations = res;
    })).subscribe();
  }

  private gtmTag(title: string): void {
    const tag = {
      event: 'card click',
      challengeTitle: title,
    };
    this.gtmService.pushTag(tag);
  }
}
