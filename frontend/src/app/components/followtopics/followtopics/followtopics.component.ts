import { Component, OnInit, ViewChild } from '@angular/core';
import { Localcookie } from 'src/app/utils/localcookie';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic/topic.service';
import { Topic } from 'src/app/models/topic';
import { Question } from 'src/app/models/Question';
import { TimelineService } from 'src/app/services/timeline/timeline.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';
import { userInfo } from 'os';
import { FeedService } from 'src/app/services/feed/feed.service';

@Component({
  selector: 'app-followtopics',
  templateUrl: './followtopics.component.html',
  styleUrls: ['./followtopics.component.css']
})
export class FollowtopicsComponent implements OnInit {


  topic: Topic;
  question: Question;
  private authtoken;
  //

  myForm: FormGroup;
  public feeddata;
  myReplyForm = new FormGroup({
   reply: new FormControl('')
});

 private role;
  isAdmin = false;

alltopics: [{}] = [{}];
selectedTopics: {id: string, title: string}[] = [];

constructor(private timelineService: TimelineService, private localcookie: Localcookie, private router: Router
  , private service: TopicService, private formBuilder: FormBuilder, private homeService: HomeService) {

    this.homeService.getTopics().subscribe(res => {this.alltopics = res; console.log(res); });
}
  ngOnInit() {
    this. getRole();
    this.allTopics();

  }

  async logout() {
    await this.localcookie.clearLoginCookie();
    this.router.navigate(['/login']);
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

  getRole() {
    this.role = this.localcookie.getLoginCookie();
    if (this.role.role != null && this.role.role ==='admin') {
      this.isAdmin = true;
    }
  }

}
