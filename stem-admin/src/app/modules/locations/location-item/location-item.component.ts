import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFactory } from 'src/app/shared/factories/form.factory';
import { Location } from '../../../shared/models/location.model';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
  providers: [FormFactory]
})
export class LocationItemComponent implements OnInit {
  location: Location;

  constructor(
    readonly formFactory: FormFactory,
    public dialogRef: MatDialogRef<LocationItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get pageTitle(): string {
    return this.location ? `Edit ${this.location.name}` : `Create New Location`;
  }

  ngOnInit() {
    this.location = this.data;
    this.formFactory.locationsForm(this.location);
  }

  cancelClick(): void {
    this.dialogRef.close();
  }
}
