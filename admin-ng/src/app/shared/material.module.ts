import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatCardModule, MatToolbarModule],
  exports: [MatCardModule, MatToolbarModule],
})
export class MaterialModule {}
