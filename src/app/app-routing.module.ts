import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './services/authguard.service';
import { SocialprofileComponent } from './socialprofile/socialprofile.component';

const routes : Routes=[
  { path:'', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'register', component:SignupComponent },
  { path:'emailverify/:id', component:EmailverifyComponent },
  { path:'forgotpassword', component:ForgotpasswordComponent },
  { path:'passwordreset/:id', component:ResetpasswordComponent },
  { path:'profile', component:ProfileComponent, canActivate:[AuthGuardService] },
  { path:'socialprofile', component:SocialprofileComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
