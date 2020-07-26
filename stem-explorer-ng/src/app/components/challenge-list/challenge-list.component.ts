import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Challenge } from '../../shared/models/challenge';
import { Categories } from '../../shared/enums/categories.enum';


@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss']
})
export class ChallengeListComponent implements OnInit {
  @Input() challenges: Challenge[];
  @Input() filter: number[];

  @Output() itemClick = new EventEmitter<Challenge>();

  Categories: any = Categories;

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(challenge: Challenge) {
    this.itemClick.emit(challenge);
  }

}
