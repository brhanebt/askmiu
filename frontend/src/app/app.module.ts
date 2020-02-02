import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { NavComponent } from './components/nav/nav/nav.component';
import {MatButtonModule,MatSnackBarModule} from '@angular/material';

import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopicComponent } from './components/topic/topic.component';
import { Appconstant } from './utils/appconstant';
import { CookieService } from 'ngx-cookie-service';
import { Localcookie } from './utils/localcookie';
import { HomeComponent } from './components/home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    TopicComponent,
    HomeComponent
  ],
  imports: [BrowserModule,HttpClientModule, AppRoutingModule, FormsModule,
     ReactiveFormsModule, MatSliderModule, BrowserAnimationsModule,
     MatButtonModule,MatSnackBarModule,
    ],

  providers: [Appconstant, CookieService,Localcookie],
  bootstrap: [AppComponent]
})
export class AppModule { }
