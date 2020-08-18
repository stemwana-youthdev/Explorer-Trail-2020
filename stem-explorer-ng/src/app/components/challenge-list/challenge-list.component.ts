import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Challenge } from '../../shared/models/challenge';
import { Categories } from '../../shared/enums/categories.enum';

export interface ChallengeWithDistance extends Challenge {
  distance: number;
}

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss'],
})
export class ChallengeListComponent implements OnInit {
  @Input() challenges: ChallengeWithDistance[];
  @Input() filter: number[];

  @Output() itemClick = new EventEmitter<Challenge>();

  Categories: any = Categories;

  icons = {
    [Categories.Science]: '/assets/icons/MAP-light-green-point.svg',
    [Categories.Technology]: '/assets/icons/MAP-light-blue-point.svg',
    [Categories.Engineering]: '/assets/icons/MAP-light-orange-point.svg',
    [Categories.Maths]: '/assets/icons/MAP-purple-point.svg',
  };

  constructor() {}

  ngOnInit(): void {}

  onItemClick(challenge: Challenge) {
    this.itemClick.emit(challenge);
  }

  getMarkerIconForCategory(category: Categories) {
    return this.icons[category];
  }

  getId(_: number, challenge: Challenge) {
    return challenge.uid;
  }
}
