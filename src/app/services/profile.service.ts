import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  uri="http://localhost:3000/profile";

  constructor(private http:HttpClient) { }

  getUserInfo(): Observable<any>{
    return this.http.get(`${this.uri}/getprofile`);
  }
}
