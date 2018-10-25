import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailverifyService } from '../services/emailverify.service';

@Component({
  selector: 'app-emailverify',
  templateUrl: './emailverify.component.html',
  styleUrls: ['./emailverify.component.css']
})
export class EmailverifyComponent implements OnInit {
  id: any;
  result_verifystatus: any;

  constructor(private activatedroute:ActivatedRoute,
    private emailverifyservice:EmailverifyService) {
    this.activatedroute.params.subscribe(params=>{
      this.id=params['id'];
    })
  }

  ngOnInit() {
    this.emailverifyservice.verifyEmail(this.id)
    .subscribe((result_verifystatus)=>{
      this.result_verifystatus=result_verifystatus;
      console.log(result_verifystatus,"from emailverifyservice ")
    },
    (err)=>{
      console.log(err);
    })
  }

}
