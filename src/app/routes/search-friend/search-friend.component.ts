import { Component, OnInit, NgZone, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.scss']
})
export class SearchFriendComponent implements OnInit {

  private showFriends : boolean;
  private profile;
  private profileLength;
  private name;
  private friendsData:any;
  private 


  constructor(private service  :FriendsService , private zone : NgZone , private route : ActivatedRoute , 
    private router : Router , private profileService : ProfileService , private toaster : ToastrService){}


  ngOnInit() {
    this.showFriends = false;
  }

  search($event){
    this.profileService.search($event.target.value).subscribe((data)=>{
      this.zone.run(()=>{
        this.profile = data.data;
        this.showFriends = true;
        this.profileLength = this.profile.length;
        this.name = this.profile.fname+" "+this.profile.lname;

      });
    },(error)=>{
      this.toaster.error(error.message , "Something went wrong" , {
        progressBar:true,
        positionClass:'toast-bottom-right',
        progressAnimation:"increasing",
        closeButton:true
      })
    });
  }


  private sendRequest(prof){
    this.service.sendRequest(prof.user_id).subscribe((data)=>{
      this.zone.run(()=>{ 
        this.friendsData = data.data;
        for (let i =0 ; i<this.profile.length;i++){
          if(this.profile[i].id == this.friendsData.id){
            this.profile.splice(i,1);
          }
        }
        this.profileLength = this.profile.length;

      })
    },(error)=>{
      this.toaster.error(error.message , "Something went wrong" , {
        progressBar:true,
        positionClass:'toast-bottom-right',
        progressAnimation:"increasing",
        closeButton:true
      });
    });
  }
}
