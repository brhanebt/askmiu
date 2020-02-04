import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Localcookie } from '../utils/localcookie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = 'http://localhost:8080/api/v1/posts';
  private topicUrl = 'http://localhost:8080/api/v1/topic';
  private likeUrl = 'http://localhost:8080/api/v1/posts/like';
  private authToken;

  constructor(private httpclient: HttpClient, private localcookie: Localcookie) {}

  userQuestion(body): Observable<any> {
    this.authToken = this.localcookie.getLoginCookie();
    const question = {...body, postedby: this.authToken.userId, date: new Date()};
    return this.httpclient
      .post(this.url + '/addquestion', question, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': this.authToken.token
        })
      });
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

  likeUser(questionId) : Observable<any>{
    this.authToken = this.localcookie.getLoginCookie();
    // console.log(questionId);
    console.log({'userid':this.authToken.userId});//, {'userid':this.authToken.userId},
   return this.httpclient
      .post(this.url+'/like/'+questionId, {'userid':this.authToken.userId},{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': this.authToken.token
          
        })
      });//.subscribe(res=>{response=res;console.log(res)});

  }
}
