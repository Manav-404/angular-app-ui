import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private restUrl = "http://localhost:8080/api/friends"
  constructor(private http : HttpClient) { }

  public sendRequest(friendId , userId) : Observable<any>{
    return this.http.post(this.restUrl+'/send/'+friendId+userId , "").pipe(
      map((body)=>{
        return body;
      })
    )
  }
  public acceptRequest(friendId , userId) : Observable<any>{
    return this.http.post(this.restUrl+'/accept/'+friendId+userId , "").pipe(
      map((body)=>{
        return body;
      })
    )
  }

  public rejectRequest(friendId , userId) : Observable<any>{
    return this.http.post(this.restUrl+'/reject/'+friendId+userId , "").pipe(
      map((body)=>{
        return body;
      })
    )
  }


  public getFriends( userId) : Observable<any>{
    return this.http.get(this.restUrl+'/list/'+userId).pipe(
      map((body)=>{
        return body;
      })
    )
}

public pendingRequest(userId) : Observable<any>{
  return this.http.get(this.restUrl+'/pending/'+userId).pipe(
    map((body)=>{
      return body;
    })
  )
}


}
