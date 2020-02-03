import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appconstant } from 'src/app/utils/appconstant';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  private url = 'http://localhost:8080/api/v1/user/';
  private update = this.url+ 'updateprofile/';

  constructor(
    private httpclient: HttpClient,
    private cookieservice: CookieService,
    private appconstant: Appconstant
  ) {}

  getUserProfile(): Observable<any> {
    return this.httpclient.get(this.url + JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).userId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'auth-token': JSON.parse(
          this.cookieservice.get(this.appconstant.logincookie)
        ).token
      })
    });
  }

  updateUserProfile(updatedname): Observable<any>{
    const body = {name:updatedname};
    return this.httpclient.put(this.update+JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).userId,body,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'auth-token': JSON.parse(
          this.cookieservice.get(this.appconstant.logincookie)
        ).token
      })
    });
  }

}
