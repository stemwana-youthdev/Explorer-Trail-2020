import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from '../models/profile';

@Injectable()
export class ProfileReminderService {
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  public checkCompleted(profile: Profile) {
    if (profile.profileCompleted) {
      return;
    }

    const lastPrompt = new Date(localStorage.getItem('lastProfileReminder') ?? '2020-01-01');
    const now = new Date();
    if (daysBetween(lastPrompt, now) >= 5) {
      this.remindUser();
    }
  }

  // This can be used anywhere to prompt the user to give us their details
  public remindUser() {
    this.router.navigateByUrl('/profile');
    localStorage.setItem('lastProfileReminder', new Date().toISOString());

    // Show a quick explanatory message for 10 seconds.
    /** @todo use message service when it is implemented */
    this.snackbar.open(
      'Please take the time to give us some of your details. It helps us make STEM more engaging for everyone.',
      'Close',
      { duration: 10000 }
    );
  }
}

function daysBetween(start: Date, end: Date) {
  const millis = end.getTime() - start.getTime();
  return millis / (24 * 60 * 60 * 1000);
}
