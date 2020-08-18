import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from 'src/app/shared/models/location';
import { Categories } from 'src/app/shared/enums/categories.enum';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss'],
})
export class ChallengeListComponent implements OnInit {
  @Input() locations: Location[];
  @Input() filter: number[];
  @Output() itemClick = new EventEmitter<Location>();

  Categories: any = Categories;

  icons = {
    [Categories.Science]: '/assets/icons/light green point.svg',
    [Categories.Technology]: '/assets/icons/light blue point.svg',
    [Categories.Engineering]: '/assets/icons/light orange point.svg',
    [Categories.Maths]: '/assets/icons/purple point.svg',
  };

  constructor() {}

  ngOnInit(): void {}

  onItemClick(location: Location) {
    this.itemClick.emit(location);
  }

  getMarkerIconForCategory(category: Categories) {
    return this.icons[category];
  }
}