import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Challenge } from '../../shared/models/challenge';
import { Location } from '../../shared/models/location';
import { Categories } from '../../shared/enums/categories.enum';


@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss']
})
export class ChallengeListComponent implements OnInit {
  @Input() challenges: Challenge[];
  @Input() locations: Location[];
  @Input() filter: number[];

  @Output() itemClick = new EventEmitter<Challenge>();

  Categories: any = Categories;

  icons = {
    [Categories.Science]: '/assets/icons/light green point.svg',
    [Categories.Technology]: '/assets/icons/light blue point.svg',
    [Categories.Engineering]: '/assets/icons/light orange point.svg',
    [Categories.Maths]: '/assets/icons/purple point.svg',
  };

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(challenge: Challenge) {
    this.itemClick.emit(challenge);
  }

  getMarkerIconForCategory(category: Categories) {
    return this.icons[category];
  }

  challengePosition(challenge: Challenge) {
    return this.locations?.find((l) => l.challengeid === challenge.uid)?.position;
  }

}
