import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  uri="http://localhost:3000/signup";

  constructor(private http:HttpClient) { }

  addUser(user_details): Observable<any> {
    return this.http.post(`${this.uri}/signup`, user_details); 
  }

}
