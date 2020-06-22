import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './containers/home-page/home-page.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { ListViewComponent } from './containers/list-view/list-view.component';
import { AdminAppSharedModule } from 'projects/admin/src/app/app.module';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent},
  { path: 'list-view', component: ListViewComponent},
  { path: 'admin', loadChildren: '../../projects/admin/src/app/app.module#AdminAppSharedModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminAppSharedModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
