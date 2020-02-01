import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup/signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;

  constructor(private formBuilder : FormBuilder,private service: SignupService) { }



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
    this.service.signup(this.myForm.value.signupdetails);
  }
}
