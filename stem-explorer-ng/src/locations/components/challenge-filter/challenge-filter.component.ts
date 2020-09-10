import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { LargeCategoryIcons } from 'src/app/shared/enums/large-category-icons.enum';

@Component({
  selector: 'app-challenge-filter',
  templateUrl: './challenge-filter.component.html',
  styleUrls: ['./challenge-filter.component.scss']
})
export class ChallengeFilterComponent implements OnInit {
  Categories = Categories;
  CategoryIcons = LargeCategoryIcons;
  filter: number[] = [0, 1, 2, 3];

  @Output() filterChanged = new EventEmitter<number[]>();

  buttons = [
    {category: 'S', value: 0, colorClass: 'green'},
    {category: 'T', value: 1, colorClass: 'blue'},
    {category: 'E', value: 2, colorClass: 'orange'},
    {category: 'M', value: 3, colorClass: 'purple'}
  ];

  ngOnInit(): void {
    // TODO: init from localstorage
    this.filterChanged.emit(this.filter);
  }

  change(filter: number[]): void {
    // TODO: save to localstorage
    this.filter = filter;
    this.filterChanged.emit(filter);
  }
}
