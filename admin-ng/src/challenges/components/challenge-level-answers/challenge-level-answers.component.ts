import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { QuestionType } from 'src/app/shared/enums/question-type.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level.model';
import { NavButton } from 'src/app/shared/models/nav-button.model';
import { Table } from 'src/app/shared/models/table.model';
import { ChallengesTablesFactory } from 'src/challenges/factories/tables.factory';

interface Answer {
  answer: string;
  correct: boolean;
}

@Component({
  selector: 'app-challenge-level-answers',
  templateUrl: './challenge-level-answers.component.html',
  styleUrls: ['./challenge-level-answers.component.scss'],
})
export class ChallengeLevelAnswersComponent implements OnChanges {
  @Input() level: ChallengeLevel;
  @Output() saveAnswers = new EventEmitter<any>();

  answers: Answer[] = [];

  topButtons: NavButton[] = [
    {
      label: 'New Answer',
      colour: 'pink',
      onClick: () => this.newAnswer(),
    },
  ];
  QuestionType = QuestionType;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // If level Input has been changed to a truthy value
    if (changes.level?.currentValue) {
      if (this.level.answerType === QuestionType.Multichoice) {
        this.answers = this.level.possibleAnswers.map((answer) => ({
          answer,
          correct: this.level.answers.includes(answer),
        }));
      } else {
        this.answers = this.level.answers.map((answer) => ({
          answer,
          correct: true,
        }));
      }
    }
  }

  newAnswer(): void {
    this.answers.push({ answer: '', correct: false });
  }

  delete(answer: Answer): void {
    this.answers.splice(this.answers.indexOf(answer), 1);
  }

  onSave(): void {
    if (this.level.answerType === QuestionType.Multichoice) {
      this.level.possibleAnswers = this.answers.map((a) => a.answer);
      this.level.answers = this.answers
        .filter((a) => a.correct)
        .map((a) => a.answer);
    } else {
      this.level.possibleAnswers = null;
      this.level.answers = this.answers.map((a) => a.answer);
    }
    this.saveAnswers.emit();
  }
}
