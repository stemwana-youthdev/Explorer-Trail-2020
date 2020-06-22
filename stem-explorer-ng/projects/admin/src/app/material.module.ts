import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ]
})
export class AdminMaterialModule {}
