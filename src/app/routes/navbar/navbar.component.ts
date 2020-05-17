import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'facebook-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() id : any;
  constructor(private router : Router) { }

  ngOnInit() {
  }

  toHome(){
    this.router.navigate(['/news-feed',{'id':this.id}]);
  }

  toProfile(){
    this.router.navigate(["/profile/main" , {"id":this.id}]);
  }

  notification(){
    this.router.navigate(["/notifications" , {"id":this.id}]);
  }

  logout(){
   localStorage.removeItem("token");
   this.router.navigate(["/"]);

  }

}
