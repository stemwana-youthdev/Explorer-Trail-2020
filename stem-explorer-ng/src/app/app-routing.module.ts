import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSharedModule } from 'projects/admin/src/app/app.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { ListViewComponent } from './containers/list-view/list-view.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent},
  { path: 'list-view', component: ListViewComponent},
  // { path: 'admin', loadChildren: '../../projects/admin/src/app/app.module#AdminSharedModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminSharedModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
