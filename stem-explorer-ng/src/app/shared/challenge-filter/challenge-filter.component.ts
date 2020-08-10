import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import { ChallengesState } from '../../store/challenges/challenges.state';
import { FilterChallenges } from '../../store/challenges/challenges.actions';


@Component({
  selector: 'app-challenge-filter',
  templateUrl: './challenge-filter.component.html',
  styleUrls: ['./challenge-filter.component.scss']
})
export class ChallengeFilterComponent implements OnInit {
  @Select(ChallengesState.challengeFilter) public filter$: Observable<number[]>;

  constructor(
    private store: Store,
    private gtmService: GoogleTagManagerService,
  ) { }

  ngOnInit(): void {
  }

  onFilter(filter: number[]): void {
    this.store.dispatch(new FilterChallenges(filter));
    // push to dataLayer
    const gtmTag = {
      event: 'filters',
      filters: filter
  };
    this.gtmService.pushTag(gtmTag);
  }

}
