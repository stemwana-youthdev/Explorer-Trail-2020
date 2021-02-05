import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-not-admin-dialog',
  templateUrl: './not-admin-dialog.component.html',
  styleUrls: ['./not-admin-dialog.component.scss'],
})
export class NotAdminDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string }) {}
}
