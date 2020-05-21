import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{map} from 'rxjs/operators'
import { User } from '../model/User';
import { HttpClient  ,HttpRequest} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor( private http : HttpClient) { };

  private restUrl = "/api/auth/";


  signup(user):Observable<any>{
    const header = {'Content-Type':'application/json'}
    return this.http.post(this.restUrl+"signup" , user ,{headers:header}).pipe( map(
      body=>{
        return body||{};
      }
    ));
  }

  login(user):Observable<any>{
   const header = {'Content-Type':'application/json'}
    return this.http.post(this.restUrl+'authenticate' , user , {headers:header}).pipe(
      map( body=>{
        return body||{};
      })
    )
  }
  
}
