import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup/signup.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private formBuilder : FormBuilder,private service: SignupService,public snackBar: MatSnackBar
    ) { }



  ngOnInit() {
    this.myForm = this.formBuilder.group({
      signupdetails: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        name: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    this.service.signup(this.myForm.value.signupdetails).subscribe(
      res => {
        if (res.status === true) {
          this.open('Signup Successful');
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
