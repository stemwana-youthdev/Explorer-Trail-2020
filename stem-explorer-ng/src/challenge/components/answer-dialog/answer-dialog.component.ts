import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionType } from 'src/app/shared/enums/answer-type.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';

/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.scss']
})
export class AnswerDialogComponent {
  answer = new FormControl('');

  QuestionType: any = QuestionType;
  Colour = StemColours;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
