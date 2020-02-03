import { Component, OnInit, ViewChild } from '@angular/core';
import { Localcookie } from 'src/app/utils/localcookie';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic/topic.service';
import { Topic } from 'src/app/models/topic';
import { Question } from 'src/app/models/Question'
import { TimelineService } from 'src/app/services/timeline/timeline.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FeedService } from 'src/app/services/feed/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topic: Topic;
  question: Question;

  //

  myForm: FormGroup;
  public feeddata;
  myReplyForm = new FormGroup({
   reply: new FormControl('')
});

alltopics: [{}]=[{}];
selectedTopics: {id: string, title: string}[] = [];


  constructor(private timelineService: TimelineService,private localcookie: Localcookie,private router: Router
              , private service: TopicService,private formBuilder: FormBuilder, private feedService: FeedService ) {

                this.feedService.getTopics().subscribe(res => {this.alltopics = res; console.log(res); });
                this.feedService.userFeed().subscribe(res => {this.feeddata = res; });
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({

      feeddetails : this.formBuilder.group({

        title: [''],
        body : ['']

      })

     });
    this.allTopics();
    // this.filteredTopics();
  }

  async logout(){
    await this.localcookie.clearLoginCookie();
    this.router.navigate(['/login']);
  }


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

  // filteredTopics(){
  //   this.service.filterTopics().subscribe(
  //     res => {
  //       this.question= res;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  // ----------------------------
  onSubmit() {
    const post = {...this.myForm.value.feeddetails, topics: []};
    const topics: string[] = [];
    console.log(this.myForm.value.feeddetails);
    console.log(this.selectedTopics);

    this.selectedTopics.forEach(element => {
       topics.push(element.id);
     });
    post.topics = topics;
   //  console.log(post);
    this.feedService.userQuestion(post).subscribe(res => {this.alltopics.push(res);});
  }

  onLike() {
    console.log('in like');
  }
  onSubmitReply() {
    console.log('in submit reply');
  }
 //  onTopicKeyUp(e) {
 //    console.log(e.srcElement.value);
 //  }
  topicSelected(e) {
   this.selectedTopics.push({id: e.srcElement.value, title: e.srcElement.options[e.srcElement.selectedIndex].text});
  }
  removeSelectedTopic(topic) {
   this.selectedTopics = this.selectedTopics.filter(obj => obj !== topic);
  }
}
