import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';

const routes: Routes = [
  {
    path: '', component: AppComponent
  },
  {
    path: 'locations', component: LocationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
