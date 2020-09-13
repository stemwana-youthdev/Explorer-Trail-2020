import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { LargeCategoryIcons } from 'src/app/shared/enums/large-category-icons.enum';
import { Filter } from 'src/locations/models/filter';

@Component({
  selector: 'app-challenge-filter',
  templateUrl: './challenge-filter.component.html',
  styleUrls: ['./challenge-filter.component.scss']
})
export class ChallengeFilterComponent implements OnInit {
  Categories = Categories;
  CategoryIcons = LargeCategoryIcons;
  filter: Filter;

  @Output() filterChanged = new EventEmitter<Filter>();

  buttons = [
    {category: 'S', value: 0, colorClass: 'green'},
    {category: 'T', value: 1, colorClass: 'blue'},
    {category: 'E', value: 2, colorClass: 'orange'},
    {category: 'M', value: 3, colorClass: 'purple'}
  ];

  ngOnInit(): void {
    const filter: Partial<Filter> = JSON.parse(localStorage.getItem('filter'));
    this.filter = {
      categories: filter?.categories ?? [0, 1, 2, 3],
      showCompleted: filter?.showCompleted ?? true,
    };
    this.filterChanged.emit(this.filter);
  }

  categoriesChange(categories: number[]) {
    this.filterChange({ categories });
  }

  showCompletedChange(event: MatCheckboxChange) {
    this.filterChange({ showCompleted: event.checked });
  }

  filterChange(change: Partial<Filter>) {
    this.filter = {
      ...this.filter,
      ...change,
    };
    localStorage.setItem('filter', JSON.stringify(this.filter));
    this.filterChanged.emit(this.filter);
  }
}
