import { Component, OnInit, ViewChild } from '@angular/core';
import { Localcookie } from 'src/app/utils/localcookie';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic/topic.service';
import { Topic } from 'src/app/models/topic';
import { Question } from 'src/app/models/Question';
import { TimelineService } from 'src/app/services/timeline/timeline.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FeedService } from 'src/app/services/feed/feed.service';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.css']
})
export class AddtopicComponent implements OnInit {
  topic=[];
  question: Question;


  myForm: FormGroup;
  public feeddata;
  myReplyForm = new FormGroup({
    reply: new FormControl('')
  });

  private role;
  isAdmin = false;

  alltopics: [{}] = [{}];
  selectedTopics: { id: string; title: string }[] = [];


  constructor(
    private timelineService: TimelineService,
    private localcookie: Localcookie,
    private router: Router,
    private service: TopicService,
    private formBuilder: FormBuilder,
    private feedService: FeedService
  ) {
    this.feedService.getTopics().subscribe(res => {
      this.alltopics = res;
      console.log(res);
    });
    this.feedService.userFeed().subscribe(res => {
      this.feeddata = res;
    });
  }


  ngOnInit() {
    this. getRole();

    this.myForm = this.formBuilder.group({

      addtopics : this.formBuilder.group({

        title: ['',Validators.required],
        category : ['',Validators.required]

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

  onSubmit() {

    // console.log(this.myForm.value.addtopics);
    const data={title:this.myForm.value.addtopics.title,category:this.myForm.value.addtopics.category};
      // console.log(data);
    this.service.postTopic(data).subscribe(
      data=>{

        this.topic.push(data.newTopic);
        this.myForm.reset();
        // this.router.navigateByUrl('/addtopic');

        // this.allTopics.p
        // this.topic = data;
      },
      err=>{
        console.log(err);
      }
    )
  }
  getRole(){
    this.role = this.localcookie.getLoginCookie();
    if(this.role.role!=null && this.role.role==='admin'){
      this.isAdmin = true;
    }
  }
}
