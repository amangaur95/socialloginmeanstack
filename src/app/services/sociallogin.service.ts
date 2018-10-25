import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {

  uri = "http://localhost:3000/sociallogin";
  
  constructor(private http:HttpClient) { }

  socialLogin(user): Observable<any>{
    return this.http.post(`${this.uri}/sociallogin`,user);
  }
}
