import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() usersFromHomeComponent:any;
  @Output() cancelRegister=new EventEmitter();
  model:any={};
  registerForm:FormGroup;
  maxDate:Date;
  validationErrors:string[]=[]
  constructor(private accountService:AccountService,private toast:ToastrService,private fb:FormBuilder,private router :Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  initializeForm()
  {
    this.registerForm=this.fb.group({
      gender:['Male',Validators.required],
      username:['',Validators.required],
      knownAs:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      dateOfBirth: ['', Validators.required],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required,this.matchValues('password')]]
    })
  this.registerForm.controls.password.valueChanges.subscribe(()=>{
    this.registerForm.controls.confirmPassword.updateValueAndValidity();
  })
}

  matchValues(matchTo:string):ValidatorFn
  {
    return (control:AbstractControl)=>{
      return control?.value===control?.parent?.controls[matchTo].value?null:{isMatching:true};
    }
  }
  register()
  {
    this.accountService.register(this.registerForm.value).subscribe({
      next:(response)=>{
        this.router.navigateByUrl("/member");
        this.toast.success("Registered Successfully");
        this.cancel();
      },
      error:(error)=>{
        this.validationErrors=error;
  }
})
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }

}
