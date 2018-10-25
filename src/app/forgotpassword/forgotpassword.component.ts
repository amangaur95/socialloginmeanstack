import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotpasswordService } from '../services/forgotpassword.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  angForm:FormGroup;
  constructor(private fb:FormBuilder,
    private forgotpasswordservice:ForgotpasswordService,
    private toasterservice:ToasterService) {
    this.createForm();
   }

  createForm(){
    this.angForm=this.fb.group({
      email:['', Validators.required]
    })
  }

  submit(){
    this.forgotpasswordservice.forgotPassword(this.angForm.value)
    .subscribe((result_forgotpasswordstatus)=>{
      if(result_forgotpasswordstatus.code==200){
        this.toasterservice.successToaster(result_forgotpasswordstatus.successmessage.msg1,result_forgotpasswordstatus.successmessage.msg2);
      }
      else{
        this.toasterservice.errorToaster(result_forgotpasswordstatus.failuremessage.msg1,result_forgotpasswordstatus.failuremessage.msg2);
      }
    },
    (err)=>{
      console.log(err);
    })
  }
  ngOnInit() {
  }

}
