import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private restUrl = "http://localhost:8080/api/comment"
  constructor(private http : HttpClient) { }

  public getComment(postId){
    return this.http.get(this.restUrl+'/get/'+postId).pipe(
      map((body)=>{
        return body;
      })
    );
  }

  public postComment(comment){
    return this.http.post(this.restUrl+'/postcomment' , comment).pipe(
     map((body)=>{
       return body;
     })
    )
  }
}


