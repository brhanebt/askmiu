import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedService } from 'src/app/services/feed/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
   myForm : FormGroup;

   constructor(private formBuilder : FormBuilder, private service: FeedService) { }

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
   }}