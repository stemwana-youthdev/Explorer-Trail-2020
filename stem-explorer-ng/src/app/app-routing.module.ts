import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/components/map/map.component';
import { LoginPageComponent } from './users/components/login-page/login-page.component';
import { RegisterPageComponent } from './users/components/register-page/register-page.component';
import { ListViewComponent } from './list/components/list-view/list-view.component';
import { ChallengeViewComponent } from './challenges/components/challenge-view/challenge-view.component';
import { CameraComponent } from './shared/camera/camera.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'list-view', component: ListViewComponent },
  { path: 'challenge/:id', component: ChallengeViewComponent },
  {
    path: 'scan-code', component: CameraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
