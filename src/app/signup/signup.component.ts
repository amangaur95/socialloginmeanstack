import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { SignupService } from '../services/signup.service';
import { ForgotpasswordService } from '../services/forgotpassword.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { SocialloginService } from '../services/sociallogin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  angForm: FormGroup;
  exists_message: any;
  display: boolean = false;
  provider_name: any;
  email: any;

  constructor(private userservice: UserService,
  private fb: FormBuilder,
  private router:Router,
  private toasterService:ToasterService,
  private signupservice:SignupService,
  private forgotpasswordservice:ForgotpasswordService,
  private socialAuthService: AuthService,
  private socialloginservice:SocialloginService) { 
    this.createForm();
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // this.user=userData;
        this.socialLogin(userData);
        console.log(socialPlatform+" sign in data : " , userData);
      }
    );
  }

  socialLogin(user){
    this.socialloginservice.socialLogin(user)
    .subscribe((login_status)=>{
      console.log(login_status);
      if(login_status.code==200){
         localStorage.setItem('sociallogintoken',login_status.token);
         this.router.navigateByUrl('/socialprofile');
      }
    },
    (err)=>{
      console.log(err);
    })
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      username: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ]
   });
  }

  addUser(){
    this.signupservice.addUser(this.angForm.value)
    .subscribe((result)=>{
      if(result.code==200){
        this.router.navigateByUrl('/login');
        this.toasterService.successToaster(result.msg.str1, result.msg.str2)
      }
      else{
        if(result.exists_message){
          this.exists_message=result;
          this.provider_name=this.exists_message.provider_name;
          this.email=this.exists_message.email;
          this.display = true;
          console.log(this.exists_message,"aaaaaaaaaaa");
        }
        else{
          this.toasterService.errorToaster(result.msg.msg1,result.msg.msg2)
        }
      }
    })
  }

  setPassword(){
    console.log(this.email,"sddddddd");
    this.forgotpasswordservice.setPassword(this.email)
    .subscribe((password_status)=>{
      if(password_status.code==200){
        this.display = false;
        this.toasterService.successToaster(password_status.successmessage.msg1,password_status.successmessage.msg2);
      }
      else{
        this.toasterService.errorToaster(password_status.failuremessage.msg1,password_status.failuremessage.msg2);
      }
    },
    (err)=>{
      console.log(err);
    })
  }

  ngOnInit() {
  }

}
