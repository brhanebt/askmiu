import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline/timeline.service';
import { Localcookie } from 'src/app/utils/localcookie';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic/topic.service';
import { Topic } from 'src/app/models/topic';
import { Question } from 'src/app/models/Question';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  timelineData: Question[];

  topic: Topic;
  myForm: FormGroup;
  question: Question;
  private role;
  isAdmin = false;
  constructor(private timelineService: TimelineService,private localcookie: Localcookie,private router: Router
    , private service: TopicService,private formBuilder: FormBuilder ) {
this.timelineService.userTimeline().subscribe(res => {this.timelineData = res; console.log(res)});

}

   ngOnInit() {
    this.myForm = this.formBuilder.group({
      submitReply: this.formBuilder.group({
        replies: ''
      })
    });
     this.getRole();
     this.allTopics();

   }


   onLike() {
     console.log('in like');
   }
  //  onSubmitReply() {
  //    console.log('in submit reply');
  //  }
  //  onTopicKeyUp(e) {
  //    console.log(e.srcElement.value);
  //  }
  //  topicSelected(e) {
  //   this.selectedTopics.push({id: e.srcElement.value, title: e.srcElement.options[e.srcElement.selectedIndex].text});
  //  }
  //  removeSelectedTopic(topic) {
  //   this.selectedTopics = this.selectedTopics.filter(obj => obj !== topic);
  //  }

  allTopics(){
    this.service.getTopics().subscribe(
      res => {
        this.topic= res;
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

  getRole(){
    this.role = this.localcookie.getLoginCookie();
    if(this.role.role!=null && this.role.role==="admin"){
      this.isAdmin = true;
    }
  }
  onReply(question) {
    // this.service.loginUser(this.myForm.value.logindetails);
    // console.log(questionid);
    console.log(this.myForm.value.submitReply);
    this.timelineService.submitReply(this.myForm.value.submitReply,question._id).subscribe(
      res => {
        console.log(res);
        this.timelineData[this.timelineData.indexOf(question)].replies.unshift(this.myForm.value.submitReply.replies);
        this.myForm.reset();
      },
      err =>{
        console.log(err);
      }
    );
  }
}
