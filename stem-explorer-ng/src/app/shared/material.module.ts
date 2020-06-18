import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule
  ],
  exports: [
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule
  ],
})
export class MaterialModule { }
