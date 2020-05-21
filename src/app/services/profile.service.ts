import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Profile } from '../model/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private restUrl = '/api/'
  constructor(private http : HttpClient) { }


  public createProfile(formdata):Observable<any> {
    return this.http.post(this.restUrl+'profile' , formdata).pipe(
      map(body=>{
        return body;
      })
    )
  }

  public editProfile(profile , id) : Observable<any>{
   return  this.http.put(this.restUrl+'editProfile/'+id , profile).pipe(
      map((body)=>{
        return body;
      })
    )
  }

  public uploadPhoto(file:File , id): Observable<any>{
    const formdata: FormData = new FormData();
    formdata.append('file' , file);
    return this.http.post(this.restUrl+'uploadPhoto/'+id , formdata).pipe(
      map((body)=>{
        return body;
      })
    )
  }

  public getProfile(id): Observable<any>{
    return this.http.get(this.restUrl+'profile/'+id).pipe(
      map((body)=>{
        return body; 
      })
    )
  }

  public search(text): Observable<any>{
    return this.http.get(this.restUrl+'search/'+text).pipe(
      map((body)=>{
        return body; 
      })
    )
  }
}
