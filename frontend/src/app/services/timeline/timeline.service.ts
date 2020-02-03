import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Localcookie } from 'src/app/utils/localcookie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private url = 'http://localhost:8080/api/v1/posts';
  private authToken;

  constructor(private httpclient: HttpClient, private localcookie: Localcookie) {}


  userTimeline(): Observable<any> {
    this.authToken = this.localcookie.getLoginCookie();
    return this.httpclient
      .get(this.url + '/timeline/' + this.authToken.userId, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': this.authToken.token
        })
      });
  }

  // getTopics(): Observable<any> {
  //   this.authToken = this.localcookie.getLoginCookie();
  //   return this.httpclient
  //     .get(this.topicUrl + '/findall', {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         'Access-Control-Allow-Headers': 'Content-Type',
  //         'auth-token': this.authToken.token
  //       })
  //     });
  // }
}
