import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { ChallengeDialogType } from 'src/app/shared/enums/challenge-dialog-type.enum';
import { Location } from 'src/app/shared/models/location';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;

  locations: Location[] = [];
  Categories: any = Categories;
  filter = [0, 1, 2, 3];

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
    this.store.dispatch(new VisitedHomepage());

    this.getLocations();
  }

  onItemClick(location: Location) {
    this.openChallengeDialog(location);
    // push to dataLayer
    const gtmTag = {
      event: 'card click',
      challengeTitle: location.challengeTitle,
  };
    this.gtmService.pushTag(gtmTag);
  }

  private getLocations(): void {
    this.store.select(LocationsState.locations).pipe(map(res => {
      this.locations = res;
    })).subscribe();
  }

  /*
  * Opens the dialog for the given challenge
  */
  private openChallengeDialog(location: Location): void {
    this.dialog.open(ChallengeDialogComponent, {
      data: {
        location,
        dialogType: ChallengeDialogType.Preview,
      },
      panelClass: 'app-dialog',
    });
  }
}
