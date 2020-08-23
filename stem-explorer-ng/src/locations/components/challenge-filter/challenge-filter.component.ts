import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { LocationsState } from 'src/locations/store/locations.state';
import { FilterLocations } from 'src/locations/store/locations.actions';

@Component({
  selector: 'app-challenge-filter',
  templateUrl: './challenge-filter.component.html',
  styleUrls: ['./challenge-filter.component.scss']
})
export class ChallengeFilterComponent implements OnInit {
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;

  constructor(
    private store: Store,
    private gtmService: GoogleTagManagerService,
  ) { }

  ngOnInit(): void {
  }

  onFilter(filter: number[]): void {
    this.store.dispatch(new FilterLocations(filter));
    // push to dataLayer
    const gtmTag = {
      event: 'filters',
      filters: filter
  };
    this.gtmService.pushTag(gtmTag);
  }

}
