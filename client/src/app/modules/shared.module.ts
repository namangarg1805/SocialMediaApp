import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"}),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot()

  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
