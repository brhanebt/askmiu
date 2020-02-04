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
import { element } from 'protractor';
import { FollowtopicService } from 'src/app/services/followtopic/followtopic.service';

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

alltopics: Topic[] = [];
selectedTopics: {id: string, title: string}[] = [];
followedTopics: string[];

constructor(private localcookie: Localcookie, private router: Router, private homeService: HomeService,
            private service: TopicService, private followtopicService: FollowtopicService, private formBuilder: FormBuilder) {
              this.authtoken = this.localcookie.getLoginCookie();
              this.homeService.getTopics().subscribe(res => {this.alltopics = res; console.log(res); });
              this.service.getFollowedTopics(this.authtoken.userId).subscribe(res => {this.followedTopics = res; });
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
    if (this.role.role != null && this.role.role === 'admin') {
      this.isAdmin = true;
    }
  }
  onFollow(topic) {
    if (this.followedTopics.includes(topic._id)) {
       this.followtopicService.unFollowTopic(topic._id).subscribe(res => {
        console.log(topic);
        console.log('unfollow');
        this.followedTopics = this.followedTopics.filter(t => t !== topic._id);
        console.log(this.followedTopics);
       });
    } else {
      console.log('follow');
       this.followtopicService.followTopic(topic._id).subscribe(res => {
        console.log(topic._id);
        this.followedTopics.push(topic._id);
        console.log(this.followedTopics);
       }); // unFollowTopic

    }
  //   this.followtopicService.followTopic(topic._id).subscribe(res => {
  //   this.authtoken = this.localcookie.getLoginCookie();
  //   let selectedindex: number;
  //   this.alltopics.forEach((ele, index) => {
  //       if (ele._id == topic._id) {
  //         console.log(index);
  //         selectedindex = index;
  //       }
  //   });
  //   let ftopics = this.alltopics[selectedindex].followers;
  //   if (ftopics.includes(this.authtoken.userId)) {
  //     ftopics = ftopics.filter(ele => ele != this.authtoken.userId);
  //     this.alltopics[selectedindex].followers = ftopics;
  //  } else {
  //   ftopics = ftopics.concat(this.authtoken.userId);
  //   this.alltopics[selectedindex].followers = ftopics;
  //  }
  // });
  }

}
