import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private url = 'http://localhost:8080/api/v1/user/addquestion';

  constructor(private httpclient: HttpClient) {}

  userQuestion(body) {
    // const model = { email: body.email, password: body.password };
    // console.log(model);
    this.httpclient
      .post(this.url, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type'
        })
      })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }





}