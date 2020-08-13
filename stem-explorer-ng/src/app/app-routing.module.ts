import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './shared/camera/camera.component';
import { LoginPageComponent } from './users/components/login-page/login-page.component';
import { RegisterPageComponent } from './users/components/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', // match without map in the url?
    redirectTo: 'map'
  },
  /** the following routes are lazy loaded, so they will only load when the user
   * goes to them.
   */
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListModule)
  },
  { path: 'challenge/:id',
    loadChildren: () => import('./challenges/challenges.module').then(m => m.ChallengesModule)
  },
  {
    path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'scan-code', component: CameraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
