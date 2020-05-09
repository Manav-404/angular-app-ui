import { Component, OnInit, NgZone } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/model/Profile';
import { Post } from 'src/app/model/Post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private userId;
  private profile  :Profile;
  private city;
  private name;
  private profileImage;
  private wallPosts;

  constructor(private service :ProfileService , private postService  :PostService , private router : ActivatedRoute
     , private route:Router , private zone : NgZone ,  private toaster : ToastrService ) { }

  ngOnInit() {
    this.userId  = this.router.snapshot.params.id;
    this.service.getProfile(this.userId).subscribe((data)=>{
      this.zone.run(()=>{
        this.profile = data.data;
        this.name = this.profile.fname+" "+this.profile.lname;
        this.profileImage = this.profile.imagePath;
        this.city = this.profile.city;
      });
    });

    this.postService.wallPosts(this.userId).subscribe((data)=>{
      this.zone.run(()=>{
      this.wallPosts  = data.data;
      console.log(data.data);
      })
    })
  }

}
