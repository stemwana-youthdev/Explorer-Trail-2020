import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  matchingCharTypes(password: string) {
    const charTypes = [
      /[a-z]/,
      /[A-Z]/,
      /[0-9]/,
      /[!@#$%^&*()_+-=}{\]\[:;'"?/.,<>\\\|~`]/,
    ];
    return charTypes.filter((regex) => regex.test(password)).length;
  }

  validPassword: ValidatorFn = (control) => {
    const password = control.value;

    if (password.length < 8) {
      return { invalidPassword: true };
    } else if (this.matchingCharTypes(password) < 3) {
      return { invalidPassword: true };
    } else {
      return null;
    }
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}
