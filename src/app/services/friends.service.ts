import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private restUrl = "/api/friends"
  constructor(private http : HttpClient) { }

  public sendRequest(friendId) : Observable<any>{
    return this.http.get(this.restUrl+"/send/"+friendId).pipe(
      map((body)=>{
        return body;
      })
    )
  }
  public acceptRequest(friendId) : Observable<any>{
    return this.http.get(this.restUrl+'/accept/'+friendId).pipe(
      map((body)=>{
        return body;
      })
    )
  }

  public rejectRequest(friendId) : Observable<any>{
    return this.http.get(this.restUrl+'/reject/'+friendId).pipe(
      map((body)=>{
        return body;
      })
    )
  }


  public getFriends( userId) : Observable<any>{
    return this.http.get(this.restUrl+'/list').pipe(
      map((body)=>{
        return body;
      })
    )
}

public pendingRequest(userId) : Observable<any>{
  return this.http.get(this.restUrl+'/pending').pipe(
    map((body)=>{
      return body;
    })
  )
}


}
