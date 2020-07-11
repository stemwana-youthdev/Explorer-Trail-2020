import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Levels } from 'src/app/shared/enums/levels.enum';

@Component({
  selector: 'app-hint-dialog',
  templateUrl: './hint-dialog.component.html',
  styleUrls: ['./hint-dialog.component.scss']
})
export class HintDialogComponent implements OnInit {

  Level: any = Levels;

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
