import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicService } from 'src/app/services/topic/topic.service';
import { Topic } from 'src/app/models/topic';
import { Question } from 'src/app/models/Question'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topic: Topic;
  question: Question;

  constructor(private service: TopicService) { }

  ngOnInit() {
    this.allTopics();
    // this.filteredTopics();
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

}
