import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';

@Component({
  selector: 'app-hint-dialog',
  template: `
    <app-dialog [category]="data.category">
      <h3 class="title">{{data.title}}</h3>
      <p>{{Level[data.level.difficulty]}}</p>
      <p [innerHTML]="hintHTML"></p>
    </app-dialog>
  `,
  styles: ['.title { padding-right: 30px; }']
})
export class HintDialogComponent {
  Level: any = Levels;
  Colour = StemColours;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  get hintHTML() {
    const originalHint: string = this.data.level.hint;
    const withLinks = originalHint.replace(
      // Regex from https://regexr.com/39nr7
      // Select links such as 'http://test.com/hi', 'example.nz' and 'https://youtu.be/sdlkajldkfjas'
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      (text) => {
        let url = text;
        if (!/^https?:\/\//.test(url)) {
          url = `https://${url}`;
        }
        return `<a href="${url}" target="_blank">${text}</a>`;
      }
    );
    return withLinks;
  }
}
