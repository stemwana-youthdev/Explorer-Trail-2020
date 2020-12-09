import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestionType } from 'src/app/shared/enums/question-type.enum';
import { Location } from 'src/app/shared/models/locations.model';
import { Table } from 'src/app/shared/models/table.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { ChallengesTablesFactory } from 'src/challenges/factories/tables.factory';
import { ChallengeLevel } from '../../../app/shared/models/challenge-level.model';
import { NavButton } from '../../../app/shared/models/nav-button.model';
import { ChallengeFormsFactory } from '../../factories/forms.factory';

@Component({
  selector: 'app-challenge-level-item',
  templateUrl: './challenge-level-item.component.html',
  styleUrls: ['./challenge-level-item.component.scss'],
})
export class ChallengeLevelItemComponent implements OnInit {
  level: ChallengeLevel;
  challengeId: string;
  levelId: string;

  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  deleteButton: NavButton = {
    label: 'Delete',
    onClick: () => this.deleteLevel(),
    colour: 'pink',
  };
  backButton: NavButton = {
    label: 'Back to Challenge',
    link: 'challenges',
    colour: 'light-blue',
  };

  topButtons: NavButton[] = [this.deleteButton, this.backButton];

  get title(): string {
    return this.levelId ? 'Edit Level' : 'Create New Level';
  }

  constructor(
    activatedRoute: ActivatedRoute,
    formsFactory: ChallengeFormsFactory,
    tablesFactory: ChallengesTablesFactory,
    private service: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.challengeId = activatedRoute.snapshot.params.id;
    this.levelId = activatedRoute.snapshot.params.level;
    this.deleteButton.disabled = !this.levelId;
    this.backButton.link = `challenges/${this.challengeId}`;
    this.fields = formsFactory.levelForm();
  }

  ngOnInit(): void {
    if (this.levelId) {
      this.getLevel();
    } else {
      this.level = {
        uid: undefined,
        questionText: '',
        instructions: '',
        difficulty: 1,
        answerType: QuestionType.Text,
        possibleAnswers: [],
        answers: [],
        challengeId: +this.challengeId,
        hint: '',
      };
    }
  }

  saveLevel(): void {
    this.level.difficulty = Math.floor(this.level.difficulty);
    if (this.levelId) {
      this.service.updateLevel(this.level).subscribe();
    } else {
      this.service.createLevel(this.level).subscribe(res => {
        this.router.navigate([`challenges/${this.challengeId}/levels/${res.uid}`]);
      });
    }
  }

  private getLevel(): void {
    this.service.getLevel(this.levelId).subscribe((res) => {
      this.level = res;
    });
  }

  private deleteLevel(): void {
    this.service.deleteLevel(this.levelId).subscribe(() => {
      this.router.navigate(['challenges', this.challengeId]);
    });
  }
}
