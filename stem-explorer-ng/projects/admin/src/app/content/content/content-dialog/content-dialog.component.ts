import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Content } from '../../../shared/models/content.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html'
})
export class ContentDialogComponent implements OnInit {
  form: FormGroup;
  model = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Content
  ) {}

  ngOnInit() {
    console.warn('dialog oninit');
    this.constructForm();
  }

  saveContent(content) {
    console.warn('save content', content)
    console.warn('save content', this.form.value)
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private constructForm(): void {
    console.warn('hit construct form')

    this.form = this.fb.group({
      title: [this.data.title, [Validators.required, Validators.maxLength(25)]],
      link: [this.data.link, Validators.required]
    });
  }
}
