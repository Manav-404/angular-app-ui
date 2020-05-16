import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { Observable, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/model/Profile';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/model/Post';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit  ,OnDestroy {

  private userId : any;
  private posts : any =[];
  private profile  :any;
  private comments;
  private commentList;
  private postIdList;
  private polling;
  private postsLength;
  private name;
  private postForm :FormGroup;
  private caption;
  private createPostFile : File;
  private postData ;
  private profileImage;
  private postImage; 

  loader = this.loadingBar;
  constructor(private loadingBar : LoadingBarService , private service:PostService , 
    private profileService  :ProfileService , private commentService : CommentService 
    , private router : ActivatedRoute , private route :  Router, private zone : NgZone , private toaster : ToastrService , private fb : FormBuilder) {

      this.postForm = this.fb.group({
        'text':[''],
        'file':['']
      });
     }
  

  ngOnInit() {
    this.postsLength=0;
    this.userId = this.router.snapshot.params.id;
    this.polling =interval(100000)
    .pipe(startWith(0), switchMap(()=>this.service.friendsPost(this.userId)))
    .subscribe((data)=>{
      this.zone.run(()=>{
        this.loader.start();
        this.posts = data.data;
        this.postsLength = this.posts.length;
      })
    });

    this.profileService.getProfile(this.userId).subscribe((data)=>{
      this.zone.run(()=>{
        this.profile = data.data;
        this.name = this.profile.fname+" "+this.profile.lname;
        this.profileImage = this.profile.imagePath;
        this.toaster.success("Good to go !" , "Successful" , {
          progressBar:true,
          positionClass:'toast-bottom-right',
          progressAnimation:"increasing",
          closeButton:true
        })
      })
    })
  }

  
  private selected($event){
    this.createPostFile = $event.target.files[0];
  }


  private post(){
    this.caption = this.postForm.get('text').value;
    this.service.createPost(this.caption).subscribe((data)=>{
      this.zone.run(()=>{
        this.postData = data.data;
        this.service.postPic(this.createPostFile , this.postData.id).subscribe((data)=>{
          this.zone.run(()=>{
            this.postImage = data.data;
            this.toaster.success("Sharing moments is always awesome !" , "Posted Successfully" , {
              progressBar:true,
              positionClass:'toast-bottom-right',
              progressAnimation:"increasing",
              closeButton:true
          })

          this.refresh();
        } , (error)=>{
          this.toaster.error(error.message , "Something went wrong" , {
            progressBar:true,
            positionClass:'toast-bottom-right',
            progressAnimation:"increasing",
            closeButton:true
          })
        })

        })
      } , (error)=>{
        this.toaster.error(error.message , "Something went wrong" , {
          progressBar:true,
          positionClass:'toast-bottom-right',
          progressAnimation:"increasing",
          closeButton:true
        })
      });
    });
  }

  refresh(){
    this.postData = "";
    this.postForm.get('text').reset();
    this.postForm.get('file').reset();
  }

  toProfile(){
    this.route.navigate(['/profile/main',{'id':this.userId}]);
  }

  notification(){
    this.route.navigate(['/notifications',{'id':this.userId}]);
  }
 
  ngOnDestroy(): void {
    this.polling.unsubscribe();
  }
}
