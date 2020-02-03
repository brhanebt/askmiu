import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  myForm: FormGroup;
  name;
  email;
  followedTopics;
  date;

  constructor(private service: UserprofileService, private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(
     data => {
       this.name = data.name;
       this.email = data.email;
       this.followedTopics = 'Followed Topics :' + data.topicscount;
       this.date = data.date;
     },
     err => {
       console.log(err);
     }
    );
  }

}
