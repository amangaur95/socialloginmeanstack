import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  uri="http://localhost:3000/login"

  constructor(private http:HttpClient,
    private toasterservice:ToasterService) { }

  login(user_info): Observable<boolean> {
    return this.http.post<{token,user,msg,code}>(`${this.uri}/signin`, user_info)
      .pipe(
        map(result => {
          if(result.code==200){
            localStorage.setItem('token', result.token); 
            // localStorage.setItem('user_id',result.user._id);
            this.toasterservice.successToaster(result.msg.str1, result.msg.str2);
            return true;
          }
          else{
            this.toasterservice.errorToaster(result.msg.str1, result.msg.str2);
            return false;
          }
        })
      );
  }
}
