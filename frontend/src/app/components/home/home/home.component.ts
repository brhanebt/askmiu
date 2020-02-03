import { Component, OnInit, ViewChild } from '@angular/core';
import { Localcookie } from 'src/app/utils/localcookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private localcookie: Localcookie,private router: Router ) {}
  ngOnInit() {
  }

  async logout(){
    await this.localcookie.clearLoginCookie();
    this.router.navigate(['/login']);
  }

}
