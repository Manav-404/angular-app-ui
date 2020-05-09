import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/app/model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private userForm : FormGroup;
  private id : number;
  private user : User;
  private userData  :any;

  private loader = this.loadingBar;
  constructor(private loadingBar : LoadingBarService , private service : AuthService
     , private fb : FormBuilder , private zone:NgZone , private route : Router , private profileService : ProfileService ) { 
    this.userForm = this.fb.group({
      'email':[''],
      'password':['']
    });
    this.loadingBar.set(50);
  }
  



  ngOnInit() {
    
    this.loader.stop();
   
  }


  private signup(){
    this.loader.start();
    this.user = new User();
    this.user.email = this.userForm.get('email').value;
    this.user.password = this.userForm.get('password').value;
    this.service.signup(this.user).subscribe((data)=>{
      this.zone.run(()=>{
        this.userData = data.data;
        this.loadingBar.stop();
        localStorage.setItem('token' , this.userData.signInToken);
        this.id = this.userData.id;
       this.route.navigate(['/profile/setup' , {'id':this.id}]);

      })
    } , (error)=>{
      console.log(error);
      this.loadingBar.stop();
    })

  }

  private login(){
    this.loader.start();
    this.user = new User ; 
    this.user.email = this.userForm.get('email').value;
    this.user.password = this.userForm.get('password').value;
    this.service.login(this.user).subscribe((data)=>{
      this.zone.run(()=>{
        this.userData = data.data;
        this.loadingBar.stop();
        localStorage.setItem('token' , this.userData.signInToken);
        this.id = this.userData.id;
        this.profileService.getProfile(this.id).subscribe((data)=>{
          if(data){
            this.route.navigate(['/news-feed' , {'id':this.id}]);
          }
        } , (error)=>{
          console.log(error);
          this.route.navigate(['/profile/setup' , {'id':this.id}]);

        })
      })
    } , (error)=>{
      console.log(error);
      this.loadingBar.stop();
    })
  }

}
