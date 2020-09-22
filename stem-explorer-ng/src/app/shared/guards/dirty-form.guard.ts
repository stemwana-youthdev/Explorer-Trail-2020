import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export interface CanLeave {
  canLeave(): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DirtyFormGuard implements CanDeactivate<CanLeave> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(component: CanLeave): boolean | Observable<boolean> {
    return component.canLeave() || this.confirmDialog();
  }

  confirmDialog(): Observable<boolean> {
    const message =
      'You have unsaved changes, are you sure you want to navigate away?';

    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { message },
      panelClass: 'app-dialog',
    });
    return dialog.afterClosed();
  }
}
