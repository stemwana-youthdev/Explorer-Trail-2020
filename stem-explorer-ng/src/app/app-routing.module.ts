import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './containers/home-page/home-page.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { ListViewComponent } from './containers/list-view/list-view.component';
import { ChallengeViewComponent } from './containers/challenge-view/challenge-view.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'list-view', component: ListViewComponent },
  { path: 'challenge/:id', component: ChallengeViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
