import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-dialog',
  template: `
    <div class="dialog-position">
      <button mat-icon-button
        mat-dialog-close
        class="close-button"
      ><mat-icon>close</mat-icon>
      </button>
      <mat-dialog-content
        [class]="class">
        <ng-content></ng-content>
      </mat-dialog-content>
    </div>`,
  styleUrls: ['./base-dialog.component.scss']
})
export class BaseDialogComponent {
  @Input() class: string;

  constructor() {}
}
