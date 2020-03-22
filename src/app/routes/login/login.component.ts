import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loader = this.loadingBar;
  constructor(private loadingBar : LoadingBarService) { }

  ngOnInit() {
    this.loader.start();
  }

}
