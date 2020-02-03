import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Localcookie } from 'src/app/utils/localcookie';
import { Token } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private url = 'http://localhost:8080/api/v1/posts';
  private authToken;

  constructor(private httpclient: HttpClient, private localcookie: Localcookie) {}

  userQuestion(body) {
    this.authToken=this.localcookie.getLoginCookie();
    // .subscribe(token=>{
    //   this.authToken=token;
      console.log(this.authToken.token);
      console.log(body);
    // })
    // const model = { email: body.email, password: body.password };
    // console.log(this.authToken);
    const question = {...body,postedby:this.authToken.userId,date:new Date()};
    console.log(question);
    this.httpclient
      .post(this.url+'/addquestion', question, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': this.authToken.token
        })
      })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }


  userFeed(): Observable<any> {
    this.authToken=this.localcookie.getLoginCookie();
    // .subscribe(token=>{
    //   this.authToken=token;
      console.log(this.authToken.token);
    // })
    // const model = { email: body.email, password: body.password };
    // console.log(this.authToken);
    return this.httpclient
      .get(this.url+'/feed/'+this.authToken.userId, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'auth-token': this.authToken.token
        })
      });
      // .subscribe(
      //   res => {
      //     console.log(this.authToken.userId);
      //     console.log(res);
      //     return res;
      //   },
      //   err => {
      //     console.log(err)
      //     return err;
      //   }
      // );
  }


}
