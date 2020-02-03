import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FeedService } from 'src/app/services/feed/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
   myForm : FormGroup;
   public feeddata;
   myReplyForm = new FormGroup({
    reply: new FormControl('') 
 });

   constructor(private formBuilder : FormBuilder, private service: FeedService) { 

    this.service.userFeed().subscribe(res=>{this.feeddata=res});
    
    console.log(this.feeddata);

   }

   ngOnInit() {
    this.myForm = this.formBuilder.group({

      feeddetails :this.formBuilder.group({

        title: [''],
        body : ['']
       

      })

     });
   }

   onSubmit() {
      console.log(this.myForm.value.feeddetails);
     this.service.userQuestion(this.myForm.value.feeddetails);
   }
  
   onLike(){
     console.log('in like');
   }
   onSubmitReply(){
     console.log('in submit reply');
   }

  }
