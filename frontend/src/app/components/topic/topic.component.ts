import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/topic/topic.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Topic } from 'src/app/models/topic';
import { Localcookie } from 'src/app/utils/localcookie';
import { Question } from 'src/app/models/Question'
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topic: Topic;
  question: Question;
  myForm: FormGroup;
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private service: TopicService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      submitReply: this.formBuilder.group({
        replies: ''
      })
    });
    this.allTopics();
    this.filteredTopics();

  }


  allTopics(){
    this.service.getTopics().subscribe(
      res => {
        this.topic = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  filteredTopics(){
    this.service.filterTopics().subscribe(
      res => {
        this.question= res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(questionid) {
    // this.service.loginUser(this.myForm.value.logindetails);
    console.log(questionid);
    console.log(this.myForm.value.submitReply);
    this.service.submitReply(this.myForm.value.submitReply,questionid).subscribe(
      res => {
        if (res.status === true) {
          this.open('Submitted Successfully');
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

