import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline/timeline.service';
import { Localcookie } from 'src/app/utils/localcookie';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic/topic.service';
import { Topic } from 'src/app/models/topic';
import { Question } from 'src/app/models/Question';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  timelineData: [{}] = [{}];

  topic: Topic;
  question: Question;

  constructor(private timelineService: TimelineService,private localcookie: Localcookie,private router: Router
    , private service: TopicService ) {
this.timelineService.userTimeline().subscribe(res => {this.timelineData = res; console.log(res)});

}

   ngOnInit() {
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

}
