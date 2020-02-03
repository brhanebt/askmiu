import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { TopicComponent } from './components/topic/topic.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { HomeComponent } from './components/home/home/home.component';

import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginGuard } from './guards/login/login.guard';
import { UserprofileComponent } from './components/userprofile/userprofile/userprofile.component';
import { HomeGuard } from './guards/home/home.guard';



const routes: Routes = [

{path: 'login', component: LoginComponent,canActivate:[HomeGuard]},
  {path: '', component: HomeComponent,canActivate:[LoginGuard]},
  {path: 'signup', component: SignupComponent,canActivate:[HomeGuard]},
  {path: 'topic', component: TopicComponent , canActivate:[LoginGuard]},
  {path: 'timeline', component: TimelineComponent , canActivate:[LoginGuard]},
  // {path: '*', component: NavComponent},
  {path: 'home', component: HomeComponent,canActivate:[LoginGuard]},
  {path: 'profile', component: UserprofileComponent ,canActivate:[LoginGuard]}

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// {path: 'login', component: LoginComponent,canActivate:[HomeGuard]},
//   {path: '', component: HomeComponent,canActivate:[LoginGuard]},
//   {path: 'signup', component: SignupComponent,canActivate:[HomeGuard]},
//   {path: 'topic', component: TopicComponent , canActivate:[LoginGuard]},
//   {path: 'timeline', component: TimelineComponent , canActivate:[LoginGuard]},
//   // {path: '*', component: NavComponent},
//   {path: 'home', component: HomeComponent,canActivate:[LoginGuard]},
//   {path: 'profile', component: UserprofileComponent ,canActivate:[LoginGuard]}

// {path: 'login', component: LoginComponent},
//   {path: '', component: HomeComponent},
//   {path: 'signup', component: SignupComponent},
//   {path: 'topic', component: TopicComponent , },
//   {path: 'timeline', component: TimelineComponent},
//   // {path: '*', component: NavComponent},
//   {path: 'home', component: HomeComponent},
//   {path: 'profile', component: UserprofileComponent}
