import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Appconstant } from 'src/app/utils/appconstant';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private url = 'http://localhost:8080/api/v1/topic/findall';


  // tslint:disable-next-line: max-line-length
  constructor(private httpclient: HttpClient,
              private cookieservice: CookieService, private appconstant: Appconstant) {}

  getTopics(): Observable<any> {
   return this.httpclient
      .get(this.url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).token
        })
      })
      ;
  }
}
