import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpclient: HttpClient) { }
  private url = 'http://localhost:8080/api/v1/user/register';



  signup(body):  Observable<any> {
    return this.httpclient
    .post(this.url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type'
      })
    })
  }
}
