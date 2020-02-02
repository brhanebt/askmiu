import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { NavComponent } from './components/nav/nav/nav.component';

import { TimelineComponent } from './components/timeline/timeline.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: '*', component: NavComponent}


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
