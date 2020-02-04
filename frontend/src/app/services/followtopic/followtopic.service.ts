import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Localcookie } from 'src/app/utils/localcookie';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Appconstant } from 'src/app/utils/appconstant';

@Injectable({
  providedIn: 'root'
})
export class FollowtopicService {

  private followUrl = 'http://localhost:8080/api/v1/topics';
  private authToken;

  constructor(private httpclient: HttpClient, private localcookie: Localcookie,
              private cookieservice: CookieService,
              private appconstant: Appconstant) {}
  followTopic(topicid): Observable<any> {
    this.authToken = this.localcookie.getLoginCookie();
    // console.log(questionId);router.patch('/follow/:userid/:topicid'
    console.log(this.authToken.token); // , {'userid':this.authToken.userId},
    console.log(this.followUrl + '/' + this.authToken.userId + '/' + topicid);
    return this.httpclient
      .patch(this.followUrl + '/follow/' + this.authToken.userId + '/' + topicid, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          // 'auth-token': JSON.parse(
          //   this.cookieservice.get(this.appconstant.logincookie)
          // ).token
        })
      });
    }
    unFollowTopic(topicid): Observable<any> {
      this.authToken = this.localcookie.getLoginCookie();
      // console.log(questionId);router.patch('/follow/:userid/:topicid'
      console.log(this.authToken.token); // , {'userid':this.authToken.userId},
      return this.httpclient
        .patch(this.followUrl + '/unfollow/' + this.authToken.userId + '/' + topicid, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            // 'auth-token': JSON.parse(
            //   this.cookieservice.get(this.appconstant.logincookie)
            // ).token
          })
        });
      }
}
