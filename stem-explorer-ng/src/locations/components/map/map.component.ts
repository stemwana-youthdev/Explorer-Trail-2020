import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ChallengeDialogType } from 'src/app/shared/enums/challenge-dialog-type.enum';
import { Location } from 'src/app/shared/models/location';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;
  locations: Location[] = [];

  // added a dependency injection in order to use the getLocations method without creating an instance of the object
  constructor(
    private store: Store,
    private dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
  ) { }

  // separate property for the information for the map pop up
  infoLocation = null as Location;

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
    this.getLocations();
  }

  onChallengeLocationClick(location: Location): void {
    this.openChallengeDialog(location);
    // push to dataLayer
    const gtmTag = {
      event: 'map marker click',
      challengeTitle: location.challengeTitle,
  };
    this.gtmService.pushTag(gtmTag);
  }

  onInfoLocationClick({ location, marker }): void {
    this.infoLocation = location;
    // @todo we don't need to do this
    // this.challengeMap.openInfoLocation(marker);
  }

  private getLocations(): void {
    this.store.select(LocationsState.locations).pipe(map(res => {
      this.locations = res;
    })).subscribe();
  }

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
