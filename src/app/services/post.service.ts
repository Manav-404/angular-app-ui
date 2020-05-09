import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private restUrl = "http://localhost:8080/api/post";
  constructor(private http : HttpClient) { }


  public createPost(post) : Observable<any>{
    const header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.restUrl+'/create' , post ,{headers:header} ).pipe(
      map((body)=>{
        return body;
      })
    )
  }

  public postPic(file:File , postId) : Observable<any>{
    const formData : FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.restUrl+'/pic/'+postId, formData).pipe(
      map((body)=>{
        return body;
      })
    )
  }

  public friendsPost(userId) : Observable<any>{
    return this.http.get(this.restUrl+'/friends/'+userId).pipe(
      map((body)=>{
        return body;
      })
    )
  }

  public wallPosts(userId) : Observable<any>{
    return this.http.get(this.restUrl + '/wall/'+userId).pipe(
      map((body)=>{
        return body;
      })
    )
  }

  
}
