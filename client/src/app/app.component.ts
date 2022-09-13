import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'The Dating app';
  constructor(private accountService:AccountService){
    setTheme('bs4');
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user:User=JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }

}
