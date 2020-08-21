import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from 'src/locations/components/map/map.component';
import { ChallengeViewComponent } from './containers/challenge-view/challenge-view.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'challenge/:id', component: ChallengeViewComponent },
  // lazy loading
  {
    path: 'list-view',
    loadChildren: () => import('../locations/locations.module').then(m => m.LocationsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
