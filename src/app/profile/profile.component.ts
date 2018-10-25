import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private profileservice: ProfileService,
    private userservice: UserService,
    private router:Router) { }

  ngOnInit() {
    this.profileservice.getUserInfo()
    .subscribe((result_userinfo)=>{
      this.user=result_userinfo.user;
      // console.log(this.user,"from ts file");
    },
    (err)=>{
      if(err.status==401){
        this.userservice.logout();
        this.router.navigate(['login'])
      }
      console.log(err);
    })
  }

}
