import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Content } from '../../../shared/models/content.model';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.scss']
})
export class ContentDialogComponent implements OnInit {
  form: FormGroup;
  model = {};

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Content
  ) {
    this.model = data;
  }

  ngOnInit() {
    this.constructForm();
  }

  private constructForm(): void {
    this.form = this.fb.group({
      title: [this.data.title, [Validators.required, Validators.maxLength(25)]],
      link: [this.data.link, Validators.required]
    });
  }
}
