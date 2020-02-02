import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/topic/topic.service';
import { Topic } from 'src/app/models/topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topic: Topic;

  constructor(private service: TopicService) { }

  ngOnInit() {
    this.service.getTopics().subscribe(
      res => {
        this.topic= res;
      },
      err => {
        console.log(err);
      }
    );
  }

}
