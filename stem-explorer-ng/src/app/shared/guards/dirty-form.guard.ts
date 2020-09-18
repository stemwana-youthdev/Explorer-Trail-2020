import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanLeave {
  canLeave(): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DirtyFormGuard implements CanDeactivate<CanLeave> {
  canDeactivate(component: CanLeave): boolean {
    return component.canLeave();
  }
}
