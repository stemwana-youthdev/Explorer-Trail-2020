import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './shared/camera/camera.component';
import { LoginPageComponent } from './users/login-page/login-page.component';
import { RegisterPageComponent } from './users/register-page/register-page.component';
import { ChallengeTallyComponent } from './users/challenge-tally/challenge-tally.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { MapComponent } from 'src/locations/components/map/map.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  /** the following routes are lazy loaded, so they will only load when the user
   * goes to them.
   */
  {
    path: 'list',
    loadChildren: () => import('../locations/locations.module').then(m => m.LocationsModule)
  },
  { path: 'challenge/:id',
    loadChildren: () => import('../challenges/challenges.module').then(m => m.ChallengesModule)
  },
  {
    path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'scan-code', component: CameraComponent
  },
  // test component for the guard
  {
    path: 'user/challenges', component: ChallengeTallyComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
