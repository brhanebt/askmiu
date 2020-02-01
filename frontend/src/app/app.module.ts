import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { NavComponent } from './components/nav/nav/nav.component';

import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavComponent
  ],
  imports: [BrowserModule,HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, MatSliderModule, BrowserAnimationsModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
