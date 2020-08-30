import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { ConfigService } from './config/config.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  providers: [ConfigService]
})
export class CoreModule {}
