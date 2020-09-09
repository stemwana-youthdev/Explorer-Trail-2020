import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FilterLocations } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { CategoryIcons } from 'src/app/shared/enums/category-icons.enum';
import { Categories } from 'src/app/shared/enums/categories.enum';

@Component({
  selector: 'app-challenge-filter',
  templateUrl: './challenge-filter.component.html',
  styleUrls: ['./challenge-filter.component.scss']
})
export class ChallengeFilterComponent implements OnInit {
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;

  Categories = Categories;
  CategoryIcons = CategoryIcons;

  buttons = [
    {category: 'S', value: 0, colorClass: 'green'},
    {category: 'T', value: 1, colorClass: 'blue'},
    {category: 'E', value: 2, colorClass: 'orange'},
    {category: 'M', value: 3, colorClass: 'purple'}
  ];

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  change(filter: number[]): void {
    this.store.dispatch(new FilterLocations(filter));
  }
}
