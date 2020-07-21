import { Component, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() color = '';
  @Input() placeholder = '';

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  constructor() {}

  // Allow the use of ngModel
  writeValue(obj: any): void {
    this.input.nativeElement.value = obj;
  }
  registerOnChange(fn: any): void {
    this.input.nativeElement.addEventListener('keyup', (ev) => {
      fn(this.input.nativeElement.value);
    });
  }
  registerOnTouched(fn: any): void {
    this.input.nativeElement.addEventListener('change', (ev) => {
      fn(this.input.nativeElement.value);
    });
  }
  setDisabledState?(isDisabled: boolean): void {
    this.input.nativeElement.disabled = isDisabled;
  }
}
