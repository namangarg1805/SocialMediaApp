import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  current:User;
  constructor(private memberService:MembersService,private account:AccountService) { }

  ngOnInit(): void {
    this.loadMembers();
    this.account.currentUser$.pipe(take(1)).subscribe(user=>this.current=user);
  }

  loadMembers()
  {
    this.memberService.getMembers().subscribe(member=>{
      this.members=member;
    })
  }

}
