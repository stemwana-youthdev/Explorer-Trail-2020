import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CameraComponent } from './components/camera/camera.component';
import { CameraRoutingModule } from './camera-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CameraRoutingModule,
    ZXingScannerModule,
  ],
  declarations: [
    CameraComponent,
  ]
})
export class CameraModule {}
