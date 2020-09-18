import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DirtyFormGuard implements CanDeactivate<unknown> {
  canDeactivate(component: { canLeave(): boolean }): boolean {
    return component.canLeave();
  }
}
