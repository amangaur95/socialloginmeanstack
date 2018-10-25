import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  
  uri="http://localhost:3000/resetpassword";

  constructor(private http:HttpClient) { }

  resetPassword(details,id) :Observable<any>{
    const obj={
      details:details,
      id:id
    }
    return this.http.post(`${this.uri}/resetpassword`,obj);
  }
}
