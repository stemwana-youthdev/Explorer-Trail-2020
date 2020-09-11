import { Injectable } from '@angular/core';

@Injectable()
export class ProfileReminderService {
  constructor() {
    this.checkCompleted();
  }

  async checkCompleted() {
    if (!this.auth._user) {
      return;
    }

    const profile = await this.auth.getProfile().toPromise();
    if (profile.profileCompleted) {
      return;
    }

    const lastPrompt = new Date(localStorage.getItem('lastProfileReminder') ?? '2020-01-01');
    const now = new Date();
    if (daysBetween(lastPrompt, now) >= 5) {
      this.remindUser();
    }
  }

  remindUser() {
    this.router.navigateByUrl('/profile');
    localStorage.setItem('lastProfileReminder', new Date().toISOString());
  }
}

function daysBetween(start: Date, end: Date) {
  const millis = end.getTime() - start.getTime();
  return millis / (24 * 60 * 60 * 1000);
}
