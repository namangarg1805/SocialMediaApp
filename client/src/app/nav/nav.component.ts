import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model:any={}
username:any
  constructor(public accountService:AccountService,private router:Router,private toast:ToastrService) { }

  ngOnInit(): void {

  }
  login()
  {
    this.accountService.login(this.model).subscribe({
      next:response=>{
        console.log(response);
        this.router.navigateByUrl("/members")
        this.toast.success("logged in successfully");
      },
      error:(error)=>{
        console.log(error);
        this.toast.error(error.error);
    }
  })
  }
  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl("/")

  }

}
