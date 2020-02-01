import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm : FormGroup;

  constructor(private formBuilder : FormBuilder, private service: LoginService) { }

  ngOnInit() {

    this.myForm = this.formBuilder.group({

      logindetails :this.formBuilder.group({

        email : ['', [Validators.required, Validators.email]],
        password:['', Validators.required]

      })

    });
  }

  onSubmit() {
    // console.log(this.myForm.value.logindetails);
    this.service.loginUser(this.myForm.value.logindetails);
  }

}
