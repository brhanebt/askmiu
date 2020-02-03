import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Localcookie } from 'src/app/utils/localcookie';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic/topic.service';
import { Topic } from 'src/app/models/topic';
import { Question } from 'src/app/models/Question';

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
  topic: Topic;
  question: Question;


  constructor(private service: UserprofileService, private formBuilder: FormBuilder,private localcookie: Localcookie,
    private router: Router
    , private topicService: TopicService ) { }

  ngOnInit() {
    console.log("COming here");
    this.getUserProfile();
    this.allTopics();

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



  async logout(){
    await this.localcookie.clearLoginCookie();
    this.router.navigate(['/login']);
  }

  allTopics(){
    this.topicService.getTopics().subscribe(
      res => {
        this.topic= res;
      },
      err => {
        console.log(err);
      }
    );
  }

}
