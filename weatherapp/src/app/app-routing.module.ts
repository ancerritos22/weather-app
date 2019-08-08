import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { ExploreComponent } from './components/explore.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'explore', component: ExploreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
