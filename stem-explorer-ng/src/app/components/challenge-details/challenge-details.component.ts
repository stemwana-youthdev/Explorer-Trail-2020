import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Challenge } from '../../shared/models/challenge';
import { ChallengeLevel } from '../../shared/models/challenge-level';

import { Categories } from '../../shared/enums/categories.enum';
import { Levels } from '../../shared/enums/levels.enum';
import { MatSelectChange } from '@angular/material/select';

export interface HintEvent {
  challenge: Challenge;
  level: ChallengeLevel;
}

export interface AnswerEvent {
  challenge: Challenge;
  level: ChallengeLevel;
}


@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.scss']
})
export class ChallengeDetailsComponent implements OnInit {
  @Input() challenge: Challenge;
  @Input() challengeLevels: ChallengeLevel[] = [];
  @Input() selectedLevel: number;

  @Output() levelChange = new EventEmitter<number>();
  @Output() hint = new EventEmitter<HintEvent>();
  @Output() answer = new EventEmitter<AnswerEvent>();

  Categories: any = Categories;
  Levels: any = Levels;

  constructor() { }

  ngOnInit(): void {
  }

  get levels(): number[] {
    return this.challengeLevels.map((level) => level.difficulty);
  }

  get currentLevel(): ChallengeLevel {
    return this.challengeLevels.find(
      (challenge) => challenge.difficulty === this.selectedLevel,
    );
  }

  onSelectionChange($event: MatSelectChange) {
    this.levelChange.emit($event.value);
  }

  onHint() {
    this.hint.emit({
      challenge: this.challenge,
      level: this.currentLevel,
    });
  }

  onAnswer() {
    this.answer.emit({
      challenge: this.challenge,
      level: this.currentLevel,
    });
  }

}
