import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { NavComponent } from './components/nav/nav/nav.component';
import {MatButtonModule, MatSnackBarModule, MatInputModule} from '@angular/material';

import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopicComponent } from './components/topic/topic.component';


import { FeedComponent } from './components/feed/feed.component';
import { TimelineComponent } from './components/timeline/timeline.component';


import { Appconstant } from './utils/appconstant';
import { CookieService } from 'ngx-cookie-service';
import { Localcookie } from './utils/localcookie';
import { HomeComponent } from './components/home/home/home.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';
import { UserprofileComponent } from './components/userprofile/userprofile/userprofile.component';
import { DateconvertPipe } from './pipes/date/dateconvert.pipe';
import { DatePipe } from '@angular/common';
import { MainComponent } from './components/main/main/main.component';
// import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule }from '@angular/material';
// import { UserprofileComponent } from './components/userprofile/userprofile/userprofile.component';
// import { DateconvertPipe } from './pipes/date/dateconvert.pipe';
// import { DatePipe } from '@angular/common';
// import { MainComponent } from './components/main/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    TopicComponent,
    FeedComponent,
    TimelineComponent,
    HomeComponent,
    UserprofileComponent,
    DateconvertPipe,
    MainComponent

  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule,
     ReactiveFormsModule, MatSliderModule, BrowserAnimationsModule,
     MatButtonModule, MatSnackBarModule, MatToolbarModule,
     MatSidenavModule,
     MatListModule,
     MatIconModule, MatButtonModule, MatSnackBarModule, MatToolbarModule,
     MatSidenavModule,
     MatListModule,
     MatIconModule, MatButtonModule, MatInputModule
    ],

  providers: [Appconstant, CookieService, Localcookie],
  bootstrap: [AppComponent]
})
export class AppModule { }
