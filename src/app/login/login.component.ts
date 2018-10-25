import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { SocialloginService } from '../services/sociallogin.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id:number;
  email:any;
  returnUrl: string;

public error:string;
  angForm: FormGroup;
  user: any;

  constructor(private userservice: UserService,
    private fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private activateRoute:ActivatedRoute,
    private loginservice:LoginService,
    private socialAuthService: AuthService,
    private socialloginservice:SocialloginService
    ) { 
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
      email: ['', Validators.required ],
      password: ['', Validators.required ]
   });
  }

  public submit(){
    this.loginservice.login(this.angForm.value)
    .pipe(first())
    .subscribe((result_loginstatus)=>{
      if(result_loginstatus==true){
        this.router.navigateByUrl('profile');
      }
    },
    (err)=>{
      console.log(err);
    })
  }

showSuccess() {
  this.toastr.success('You Successfully LoggedIn', 'Toastr fun!');
}

  ngOnInit() {
    this.userservice.logout();
    // this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'] || '/';
  }

}