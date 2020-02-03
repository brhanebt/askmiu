import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { TopicComponent } from './components/topic/topic.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { HomeComponent } from './components/home/home/home.component';

import { TimelineComponent } from './components/timeline/timeline.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'topic', component: TopicComponent},
  {path: 'posts/filter', component: TopicComponent},
  {path: 'posts/reply/:questionid', component: TopicComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: '*', component: NavComponent},
  {path: 'home', component: HomeComponent}


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
