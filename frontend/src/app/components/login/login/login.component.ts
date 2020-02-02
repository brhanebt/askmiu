import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Localcookie } from 'src/app/utils/localcookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private snackBar: MatSnackBar,
    private localcookie: Localcookie,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      logindetails: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    // this.service.loginUser(this.myForm.value.logindetails);
    this.service.loginUser(this.myForm.value.logindetails).subscribe(
      res => {
        if (res.status === true) {
          this.open('Login Successful');
          this.localcookie.setLoginCookie(res);
          this.router.navigate(['/home']);
          // console.log('data',this.localcookie.getLoginCookie());
          // this.localcookie.clearLoginCookie();
          // console.log('data2',this.localcookie.getLoginCookie());

        } else {
          this.open(res.message);
        }
      },
      err => {
        this.open('Something Error Occured');
      }
    );
  }

  open(message) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(
      message,
      null,
      config
    );
  }
}
