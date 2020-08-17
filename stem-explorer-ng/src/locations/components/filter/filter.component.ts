import { Component, Output, EventEmitter } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map, tap } from 'rxjs/operators';
import { FilterLocations } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  template: `
    <mat-button-toggle-group
      #group="matButtonToggleGroup"
      [value]="filter"
      multiple
    >
      <span>
        <mat-icon aria-label="Extra filters">tune</mat-icon>
      </span>
      <mat-button-toggle *ngFor='let button of buttons'
        [value]="button.value"
        [class]="button.colorClass"
        (change)="onFilter(group.value)"
        aria-label="Filter by {{button.category}}"
      >
        {{button.category}}
      </mat-button-toggle>
    </mat-button-toggle-group>
  `,
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;
  filter: number[];
  buttons = [
    {category: 'S', value: 0, colorClass: 'green'},
    {category: 'T', value: 1, colorClass: 'blue'},
    {category: 'E', value: 2, colorClass: 'orange'},
    {category: 'M', value: 3, colorClass: 'purple'}
  ];

  constructor(
    private store: Store,
    private gtmService: GoogleTagManagerService,
  ) {
    this.filter$.pipe(tap(res => this.filter = res)).subscribe();
  }

  onFilter(filter: number[]): void {
    this.store.dispatch(new FilterLocations(filter));
    this.gtmTag(filter);
  }

  // push to dataLayer
  private gtmTag(filters: number[]) {
    const tag = {
      event: 'filters',
      filters
    };
    this.gtmService.pushTag(tag);
  }
}
