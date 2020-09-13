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
  filter: number[] = [];

  @Output() filterChanged = new EventEmitter<number[]>();

  buttons = [
    {category: 'S', value: 0, colorClass: 'green'},
    {category: 'T', value: 1, colorClass: 'blue'},
    {category: 'E', value: 2, colorClass: 'orange'},
    {category: 'M', value: 3, colorClass: 'purple'}
  ];

  ngOnInit(): void {
    const filter = JSON.parse(localStorage.getItem('filter'));
    this.filter = filter ?? [1, 2, 3, 4];
    this.filterChanged.emit(this.filter);
  }

  change(filter: number[]): void {
    localStorage.setItem('filter', JSON.stringify(filter));
    this.filter = filter;
    this.filterChanged.emit(filter);
  }
}
