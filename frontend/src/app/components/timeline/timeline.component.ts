import { Component, OnInit } from '@angular/core';
import { TimelineService } from 'src/app/services/timeline/timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  timelineData: [{}] = [{}];
   constructor(private service: TimelineService) {
    this.service.userTimeline().subscribe(res => {this.timelineData = res; console.log(res)});
    console.log(this.timelineData);

   }

   ngOnInit() {

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
}
