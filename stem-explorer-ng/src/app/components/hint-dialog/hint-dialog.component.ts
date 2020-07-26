import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Levels } from '../../shared/enums/levels.enum';
import { Categories } from '../../shared/enums/categories.enum';

interface HintDialogData {
  title: string;
  hint: string;
  level: number;
  category: Categories;
}


@Component({
  selector: 'app-hint-dialog',
  templateUrl: './hint-dialog.component.html',
  styleUrls: ['./hint-dialog.component.scss']
})
export class HintDialogComponent implements OnInit {

  Level: any = Levels;

  constructor(@Inject(MAT_DIALOG_DATA) public data: HintDialogData) { }

  ngOnInit() {
  }

}
