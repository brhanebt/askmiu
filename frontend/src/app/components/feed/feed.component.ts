import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FeedService } from 'src/app/services/feed/feed.service';
import { element } from 'protractor';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
   myForm: FormGroup;
   public feeddata;
   myReplyForm = new FormGroup({
    reply: new FormControl('')
 });

 alltopics: [{}]=[{}];
 selectedTopics: {id: string, title: string}[] = [];

   constructor(private formBuilder: FormBuilder, private service: FeedService) {
    this.service.getTopics().subscribe(res => {this.alltopics = res; console.log(res); });
    this.service.userFeed().subscribe(res => {this.feeddata = res; });

    // console.log(this.feeddata);

   }

   ngOnInit() {
    this.myForm = this.formBuilder.group({

      feeddetails : this.formBuilder.group({

        title: [''],
        body : ['']

      })

     });
   }

   onSubmit() {
     const post = {...this.myForm.value.feeddetails, topics: []};
     const topics: string[] = [];
    //  console.log(this.myForm.value.feeddetails);
    //  console.log(this.selectedTopics);

     this.selectedTopics.forEach(element => {
        topics.push(element.id);
      });
     post.topics = topics;
    //  console.log(post);
     this.service.userQuestion(post).subscribe(res => {this.alltopics.push(res);});
   }

   onLike(post) {
     console.log(post);
     this.service.likeUser(post._id);
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
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { FeedService } from 'src/app/services/feed/feed.service';

// @Component({
//   selector: 'app-feed',
//   templateUrl: './feed.component.html',
//   styleUrls: ['./feed.component.css']
// })
// export class FeedComponent implements OnInit {
//    myForm : FormGroup;

//    constructor(private formBuilder : FormBuilder, private service: FeedService) { }

//    ngOnInit() {

//     this.myForm = this.formBuilder.group({

//       Feeddetails :this.formBuilder.group({

//          body : ['body']

//       })

//      });
//    }

//    onSubmit() {
//       console.log(this.myForm.value.Feeddetails);
//        this.service.userQuestion(this.myForm.value.Feeddetails);
//    }}
