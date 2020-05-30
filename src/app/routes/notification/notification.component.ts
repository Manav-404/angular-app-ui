import { Component, OnInit, NgZone } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/model/Profile';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  private profile  :Array<Profile>;
  private id;
  private notificationLength;
  private accepted;
  private friends; 
  constructor(private service  :FriendsService  , private zone : NgZone , private route : ActivatedRoute , 
    private router : Router , private profileService : ProfileService , private toaster : ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.service.pendingRequest(this.id).subscribe((data)=>{
      this.zone.run(()=>{
        this.profile=data.data;
        this.notificationLength = this.profile.length;
        
      })
    },(error)=>{
      this.toaster.error(error.message , "Something went wrong" , {
        progressBar:true,
        positionClass:'toast-bottom-right',
        progressAnimation:"increasing",
        closeButton:true
      })
    })
  }


  private acceptRequest(prof){
    this.service.acceptRequest(prof.user_id).subscribe((data)=>{
      this.zone.run(()=>{
        this.accepted = data.data;
        this.service.getFriends(this.id).subscribe((data)=>{
          this.zone.run(()=>{
            this.friends = data.data;
            for(let i =0 ; i<this.profile.length;i++){
              for(let j=0 ; j<this.friends.length ;j++){
                if(this.profile[i].id==this.friends[j].id){
                  this.profile.splice(i,1);
                  this.notificationLength = this.profile.length;
                }
              }
            }
          });
        },(error)=>{
          this.toaster.error(error.message , "Something went wrong" , {
            progressBar:true,
            positionClass:'toast-bottom-right',
            progressAnimation:"increasing",
            closeButton:true
          })
        })

      })
    },(error)=>{
      this.toaster.error(error.message , "Something went wrong" , {
        progressBar:true,
        positionClass:'toast-bottom-right',
        progressAnimation:"increasing",
        closeButton:true
      })
    })
  }


  private reject(prof){
    this.service.rejectRequest(prof.user_id).subscribe((data)=>{
      this.zone.run(()=>{
        if(data.status==true){
          const index = this.profile.findIndex(elem=> elem.id==prof.id);
          this.profile.splice(index , 1);
          this.notificationLength = this.profile.length;
        }        
      })
    },(error)=>{
      this.toaster.error(error.message , "Something went wrong" , {
        progressBar:true,
        positionClass:'toast-bottom-right',
        progressAnimation:"increasing",
        closeButton:true
      })
    })
  }
}
