import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailverifyService {
  uri="http://localhost:3000/verify"
  constructor(private http:HttpClient) { }

  verifyEmail(id) : Observable<any>{
    return this.http.get(`${this.uri}/verify/${id}`);
  }
}
