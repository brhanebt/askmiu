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
  private filterTopicsUrl = 'http://localhost:8080/api/v1/posts/filter';
  private replyUrl = 'http://localhost:8080/api/v1/posts/reply/';


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




  filterTopics():Observable<any > {
    return this.httpclient
      .post(this.filterTopicsUrl, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).token
        })
      })
      ;
  }
}
