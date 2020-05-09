import { Component, OnInit, NgZone } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/model/Profile';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  private show : boolean;
  private profile:Profile;
  private cityList :any= [];
  private profileForm : FormGroup;
  private profileData  :any;
  private selectedCity : any;
  private loader = this.loadingBar;
  private showToast : boolean;
  private toastMessage : any;
  private selectedFile :File;
  private userId:any;
  private imageUrl;

  constructor(private service  :ProfileService , private route : Router , private fb : FormBuilder , 
    private loadingBar :LoadingBarService , private zone  :NgZone , private router : ActivatedRoute) { 


    this.profileForm = this.fb.group({
      'fname':[''],
      'lname':[''],
      'city':['']
    })

    this.loadingBar.set(50);
  }

  ngOnInit() {
    this.show=false;
    this.showToast=false;
    this.loader.stop();
    this.cityList = ['Mumbai' , 'Pune' , 'Delhi' , 'Bangalore' , 'Kolkata'];
    this.userId = this.router.snapshot.params;
  }


  private chosen($event){
    this.selectedCity  = $event.target.value ;
    console.log(this.selectedCity)
  }

  private profileSubmit(){
    this.loader.start();
    this.profile = new Profile();
    this.profile.fname = this.profileForm.get('fname').value;
    this.profile.lname = this.profileForm.get('lname').value;
    this.profile.city = this.selectedCity;
    this.service.createProfile(this.profile).subscribe((data)=>{
      this.zone.run(()=>{
        this.profileData = data.data;
        this.loader.stop();
        this.showToast=true;
        this.toastMessage = "Alright! You are good to go"
        this.route.navigate(['/news-feed' , {'id':this.profileData.user_id}])
      });
    },(error)=>{
      this.showToast=true;
      this.toastMessage = error;
    });
  
    
  }


  private selected($event){
    this.selectedFile = $event.target.files[0];
  }

  private upload(){
    this.service.uploadPhoto(this.selectedFile , this.userId.id).subscribe((data)=>{
      this.zone.run(()=>{
        this.imageUrl = data.data;
        this.show = true;

      })
    },(error)=>{
      this.showToast=true;
      this.toastMessage = error;
    })
  }


  

}
