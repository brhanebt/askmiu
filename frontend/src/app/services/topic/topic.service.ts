import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Appconstant } from 'src/app/utils/appconstant';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private allTopicsUrl = 'http://localhost:8080/api/v1/topic/findall';
  private filterTopicsUrl = 'http://localhost:8080/api/v1/posts/filter?topics=';
  private replyUrl = 'http://localhost:8080/api/v1/posts/reply/';
  private addTopicUrl ='http://localhost:8080/api/v1/topic/add';

  // tslint:disable-next-line: max-line-length
  constructor(private httpclient: HttpClient,
              private cookieservice: CookieService, private appconstant: Appconstant) {}

  getTopics(): Observable<any> {
   return this.httpclient
      .get(this.allTopicsUrl, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).token
  })
})
}




  filterTopics(topicId):Observable<any > {
  //  console.log(JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).token);
    return this.httpclient
      .post(this.filterTopicsUrl + topicId, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).token
        })
      })
      ;
  }
  submitReply(body,questionid): Observable<any> {
    return this.httpclient
      .post(this.replyUrl+questionid, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
           Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).token
        })
      });
  }

  postTopic(body): Observable<any>{
    return this.httpclient.post(this.addTopicUrl,body,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Accept: 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'auth-token': JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).token
      })
    })
  }
}
