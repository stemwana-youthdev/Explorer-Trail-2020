import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';

@Component({
  selector: 'app-hint-dialog',
  template: `
    <app-base-dialog [class]="Colour[data.category]">
      <h3 [class]="Colour[data.category]">{{data.title}}</h3>
      <p>{{Level[data.level]}}</p>
      <p>{{data.hint}}</p>
    </app-base-dialog>
  `
})
export class HintDialogComponent {
  Level: any = Levels;
  Colour = StemColours;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
