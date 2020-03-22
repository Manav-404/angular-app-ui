import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  loader = this.loadingBar;
  constructor(private loadingBar : LoadingBarService) { }

  ngOnInit() {
    this.loader.start();
  }

}
