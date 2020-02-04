import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/topic/topic.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Topic } from 'src/app/models/topic';
import { Localcookie } from 'src/app/utils/localcookie';
import { Question } from 'src/app/models/Question';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

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
  private role;
  isAdmin = false;

  constructor(private service: TopicService, private formBuilder: FormBuilder,
              private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private localcookie: Localcookie,
              private router: Router) { }

  ngOnInit() {
   this.getRole();
   this.myForm = this.formBuilder.group({
      submitReply: this.formBuilder.group({
        replies: ['']
      })
    });
   this.allTopics();
   this.filteredTopics();

  }


  allTopics() {
    this.service.getTopics().subscribe(
      res => {
        this.topic = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  filteredTopics() {
    this.activatedRoute.queryParams.subscribe(async params => {
      const topicId = await params.topics;
      this.service.filterTopics(topicId).subscribe(
        res => {
          this.question = res;
        },
        err => {
          console.log(err);
        }
      );
    });

  }

  onSubmit(post) {
    // this.service.loginUser(this.myForm.value.logindetails);
    // console.log(questionid);
    // console.log(this.myForm.value.submitReply);
    this.service.submitReply(this.myForm.value.submitReply, post._id).subscribe(
      res => {
        this.question[this.question.indexOf(post)].replies.unshift(this.myForm.value.submitReply.replies);
        this.myForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  // open(message) {
  //   const config = new MatSnackBarConfig();
  //   config.verticalPosition = this.verticalPosition;
  //   config.horizontalPosition = this.horizontalPosition;
  //   config.duration = this.setAutoHide ? this.autoHide : 0;
  //   this.snackBar.open(
  //     message,
  //     null,
  //     config
  //   );
  // }


  async logout() {
    await this.localcookie.clearLoginCookie();
    this.router.navigate(['/login']);
  }

  getRole() {
    this.role = this.localcookie.getLoginCookie();
    if (this.role.role != null && this.role.role ==='admin') {
      this.isAdmin = true;
    }
  }
}

