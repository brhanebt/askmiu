import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private allTopicsUrl = 'http://localhost:8080/api/v1/topic/findall';
  private filterTopicsUrl = 'http://localhost:8080/api/v1/posts/filter';
  private replyUrl = 'http://localhost:8080/api/v1/posts/reply/';


  constructor(private httpclient: HttpClient) {}

  getTopics():Observable<any> {
    return this.httpclient
      .get(this.allTopicsUrl, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM0OGU3N2IxNzE5MDk4MDg2NjJhYTEiLCJpYXQiOjE1ODA2Nzk3MTB9.dU4r8yVUR1Goq0cby5LaEVL1Gfz_DAMEMsjZbTgBN1U'
        })
      })
      ;
  }

  filterTopics():Observable<any> {
    return this.httpclient
      .post(this.filterTopicsUrl, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM0OGU3N2IxNzE5MDk4MDg2NjJhYTEiLCJpYXQiOjE1ODA2Nzk3MTB9.dU4r8yVUR1Goq0cby5LaEVL1Gfz_DAMEMsjZbTgBN1U'
        })
      })
      ;
  }
  submitReply(body,questionid):Observable<any> {
    return this.httpclient
      .post(this.replyUrl+questionid, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM0OGU3N2IxNzE5MDk4MDg2NjJhYTEiLCJpYXQiOjE1ODA2Nzk3MTB9.dU4r8yVUR1Goq0cby5LaEVL1Gfz_DAMEMsjZbTgBN1U'
        })
      })
      ;
  }
}
