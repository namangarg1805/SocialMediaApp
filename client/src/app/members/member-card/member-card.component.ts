import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() member:Member;
admin:boolean;
  constructor(private account:AccountService,private memberService:MembersService) { }

  ngOnInit(): void {
    let currentUser:User;
    this.account.currentUser$.pipe(take(1)).subscribe(user=>currentUser=user);
    if(currentUser.username=="namanadmin")
    {
      this.admin=true;
    }
    else{
      this.admin=false;
    }
 }
      deleteUser(username:string)
      {
        this.memberService.deleteMember(username).subscribe({
          next:response=>console.log(response),
        });
      }

}
