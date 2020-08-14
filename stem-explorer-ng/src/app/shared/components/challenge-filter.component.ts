import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map } from 'rxjs/operators';
import { FilterChallenges } from '../../store/challenges/challenges.actions';
import { ChallengesState } from '../../store/challenges/challenges.state';

@Component({
  selector: 'app-challenge-filter',
  template: `
    <mat-button-toggle-group
      #group="matButtonToggleGroup"
      [value]="filter"
      multiple
    >
      <mat-icon>tune</mat-icon>
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
})
export class ChallengeFilterComponent {
  filter: any[];

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
    this.store.select(ChallengesState.challengeFilter).pipe(map(res => {
      this.filter = res;
    })).subscribe();
  }

  onFilter(filter: number[]): void {
    this.store.dispatch(new FilterChallenges(filter));
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
