import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Localcookie } from 'src/app/utils/localcookie';
import { Token } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private url = 'http://localhost:8080/api/v1/posts';
  private topicUrl = 'http://localhost:8080/api/v1/topic';
  private authToken;

  constructor(private httpclient: HttpClient, private localcookie: Localcookie) {}

  userQuestion(body): Observable<any> {
    this.authToken = this.localcookie.getLoginCookie();
    const question = {...body, postedby: this.authToken.userId, date: new Date()};
    console.log(question);
    return this.httpclient
      .post(this.url + '/addquestion', question, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': this.authToken.token
        })
      });
      // .subscribe(
        // res => {
          // console.log(res);
        // },
        // err => {
          // console.log(err);
        // }
      // );
  }


  userFeed(): Observable<any> {
    this.authToken = this.localcookie.getLoginCookie();
    return this.httpclient
      .get(this.url + '/feed/' + this.authToken.userId, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': this.authToken.token
        })
      });
  }

  getTopics(): Observable<any> {
    this.authToken = this.localcookie.getLoginCookie();
    return this.httpclient
      .get(this.topicUrl + '/findall', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': this.authToken.token
        })
      });
  }


}
