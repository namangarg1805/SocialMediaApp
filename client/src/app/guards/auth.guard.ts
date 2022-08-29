import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlSerializer, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService,private toast:ToastrService){}
    canActivate():Observable<boolean>{
      return this.accountService.currentUser$.pipe(
        map(user=>{
          if(user) return true;
          this.toast.error("User Not Allowed");
          return false;
        })
      )
  }

}
