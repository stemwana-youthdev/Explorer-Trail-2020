import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from 'src/locations/components/map/map.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // lazy loading
  {
    path: 'list',
    loadChildren: () => import('../locations/locations.module').then(m => m.LocationsModule)
  },
  {
    path: 'challenge/:id',
    loadChildren: () => import('../challenge/challenge.module').then(m => m.ChallengeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
