import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private url = 'http://localhost:8080/api/v1/topic/findall';


  constructor(private httpclient: HttpClient) {}

  getTopics():Observable<any> {
    return this.httpclient
      .get(this.url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type'
          // 'Authorization':'auth-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Z…1NjN9.T4LIzq5bOUgohPqesOIAiBlqmmMDQawdZ0o_jysUK5g'
        })
      })
      ;
  }
}
